# Documentation Hub E2E Solution - Technical Documentation

**Version:** 1.0  
**Date:** February 6, 2026  
**Audience:** Developers, DevOps Engineers, Technical Architects

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Problem Statement](#problem-statement)
3. [Current Solution Analysis](#current-solution-analysis)
4. [Proposed Solution Architecture](#proposed-solution-architecture)
5. [Technical Implementation](#technical-implementation)
6. [Migration Path](#migration-path)
7. [Technical Decisions & Rationale](#technical-decisions--rationale)
8. [Testing Strategy](#testing-strategy)
9. [Deployment & Operations](#deployment--operations)
10. [Appendix](#appendix)

---

## Executive Summary

This document outlines a modernized, **push-based documentation ingestion pipeline** for NetBox Labs products. The proposed solution replaces the current pull-based submodule approach with an event-driven, PR-based workflow that reduces manual overhead, improves automation, and provides better isolation between source repositories and the documentation hub.

**Key Improvements:**
- **Automation First**: Source repos push documentation automatically on commit
- **Decoupled Architecture**: Source repos don't need to be git submodules
- **Version Control**: Each ingestion creates an auditable PR with full history
- **Testable**: Full local testing with `act` (GitHub Actions runner)
- **Scalable**: Easily add new source repositories without modifying hub infrastructure

---

## Problem Statement

### Current Challenges

The existing `netboxlabs-website-dochub` solution has several architectural limitations:

1. **Tight Coupling via Git Submodules**
   - Each documentation source (NetBox, Cloud, Enterprise, etc.) is a git submodule
   - Requires manual `git submodule update` or scheduled workflows to pull changes
   - Submodule pointer updates create additional commits and PR overhead
   - Breaks if submodule refs become stale or repositories are restructured

2. **Pull-Based Synchronization**
   - Hub must poll or schedule checks for updates in external repos
   - `update-submodules.yml` runs on schedule (hourly during business hours)
   - Creates race conditions when multiple repos update simultaneously
   - Resource-intensive: checks all submodules even when no changes exist

3. **Complex State Management**
   - Workflow must track submodule states before and after yarn build
   - "detects changes but can't commit them" issue (noted in workflow comments)
   - Requires sophisticated git operations to preserve build artifacts
   - Error-prone during yarn cache operations

4. **Limited Source Repo Flexibility**
   - Source repos must exist as accessible git repositories
   - Cannot easily integrate non-git documentation sources
   - Difficult to version documentation separately from product code

5. **Manual Intervention Required**
   - Automated PRs require manual review and merge (`AUTOMATED_PR_REVIEWERS`)
   - Failed submodule updates block entire synchronization job
   - Cleanup workflows needed to handle stale automated PRs

---

## Current Solution Analysis

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│  netboxlabs-website-dochub (Central Hub)                    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Git Submodules (external-repos/)                    │   │
│  │  â"œâ"€â"€ netbox-community/netbox                         │   │
│  │  â"œâ"€â"€ netboxlabs/netbox-cloud                        │   │
│  │  â"œâ"€â"€ netboxlabs/netbox-enterprise                    │   │
│  │  └── netboxlabs/other-products                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                          â†"                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Scheduled Workflow (update-submodules.yml)          │   │
│  │  â€¢ Runs hourly during business hours                 │   │
│  │  â€¢ Pulls latest from each submodule                   │   │
│  │  â€¢ Runs yarn build to generate unified docs          │   │
│  │  â€¢ Creates PR if changes detected                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                          â†"                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Docusaurus Build System                             │   │
│  │  â€¢ Reads from external-repos/ and localdocs/         │   │
│  │  â€¢ Generates unified navigation (sidebars)           │   │
│  │  â€¢ Deploys to netboxlabs.com/docs                    │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Workflows in Current Solution

#### 1. `update-submodules.yml` (17KB, 400+ lines)
**Purpose**: Synchronize external repositories into the hub

**Triggers:**
- Scheduled: Hourly during business hours (12 PM - 11 PM UTC, Mon-Fri)
- Scheduled: Every 6 hours off-hours/weekends
- Manual: `workflow_dispatch`

**Process:**
1. Checkout repo with recursive submodules
2. Update each submodule to latest commit
3. Run `yarn install` and `yarn build`
4. Detect changes in submodule pointers
5. Create automated PR if changes exist
6. Assign reviewers (`AUTOMATED_PR_REVIEWERS`)

**Challenges:**
- Complex state management around yarn build artifacts
- Must commit submodule updates BEFORE build, not after
- Requires sophisticated git operations to avoid lost changes
- All-or-nothing: one failed submodule blocks entire sync

#### 2. `auto-merge-docs.yml` (8.5KB)
**Purpose**: Automatically merge low-risk automated PRs

**Complexity Indicators:**
- Sophisticated approval logic
- Integration with Linear for ticket tracking
- Quality checks (Vale linting, build verification)
- Conflict detection and abort logic

#### 3. `cleanup-automated-prs.yml` (8.3KB)
**Purpose**: Clean up stale automated PRs

**Why Needed:**
- Automated PRs can accumulate if not merged
- Must close outdated PRs when newer ones arrive
- Prevents PR list pollution

### Technical Debt & Maintenance Burden

| Component | Complexity | Maintenance Cost | Fragility |
|-----------|------------|------------------|-----------|
| Submodule management | High | High | High |
| Scheduled workflows | Medium | Medium | Medium |
| PR automation | High | High | Medium |
| Build artifact preservation | High | High | High |
| Cleanup workflows | Medium | Low | Low |

**Total Lines of YAML Configuration**: ~70,000+ lines across all workflows and configs

---

## Proposed Solution Architecture

### Design Principles

1. **Push, Don't Pull**: Source repos push documentation when ready
2. **Loose Coupling**: No git submodules; source repos are independent
3. **Event-Driven**: GitHub Actions trigger on actual changes, not schedules
4. **Auditable**: Every ingestion creates a PR with full metadata
5. **Testable**: Full local testing before pushing to production
6. **Simple**: Minimal moving parts, easier to reason about

### High-Level Architecture

```
┌────────────────────────────────────────────────────────────────┐
│  Source Repositories (Independent)                              │
│                                                                  │
│  ┌──────────────────────┐  ┌──────────────────────┐           │
│  │  skeleton-netbox-    │  │  netbox-cloud        │  ...      │
│  │  submodule           │  │                      │           │
│  │                      │  │                      │           │
│  │  docs/               │  │  docs/               │           │
│  │  docs.config.json    │  │  docs.config.json    │           │
│  │  .github/workflows/  │  │  .github/workflows/  │           │
│  │    publish-docs.yml  │  │    publish-docs.yml  │           │
│  └──────────┬───────────┘  └──────────┬───────────┘           │
│             │                          │                        │
│             â""â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"¬â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"€â"˜                        │
└─────────────────────────┼───────────────────────────────────────┘
                          │ (Push via GitHub API)
                          â†" (creates PR with bundle)
┌────────────────────────────────────────────────────────────────┐
│  docs-hub-poc (Central Hub)                                     │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  incoming/<repo-name>/<version>/                         │  │
│  │  â€¢ docs-bundle-<sha>.zip (committed to PR)               │  │
│  └─────────────────────────────────────────────────────────┘  │
│                          â†"                                      │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  GitHub Actions (process-incoming.yml)                   │  │
│  │  Trigger: PR opened/synchronized                         │  │
│  │  â€¢ Detect docs-bundle-*.zip in PR changes                │  │
│  │  â€¢ Unpack to incoming/<repo>/<version>/                  │  │
│  │  â€¢ Run validation/quality checks                         │  │
│  │  â€¢ Auto-merge if checks pass                             │  │
│  └─────────────────────────────────────────────────────────┘  │
│                          â†"                                      │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  Downstream Processing (Future)                          │  │
│  │  â€¢ Transform to Docusaurus format                        │  │
│  │  â€¢ Generate navigation/sidebars                          │  │
│  │  â€¢ Deploy to production                                  │  │
│  └─────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

### Component Breakdown

#### 1. Source Repository Setup (skeleton-netbox-submodule)

**Purpose**: Minimal boilerplate for any NetBox product to publish docs

**Structure:**
```
skeleton-netbox-submodule/
â"œâ"€â"€ docs/                      # Markdown documentation
â"‚   â"œâ"€â"€ index.md
â"‚   â"œâ"€â"€ guides/
â"‚   â""â"€â"€ api/
â"œâ"€â"€ docs.config.json          # Metadata (product, version, edition)
â"œâ"€â"€ .github/workflows/
â"‚   â""â"€â"€ publish-docs.yml      # Automated publishing workflow
â""â"€â"€ scripts/
    â""â"€â"€ verify_simulate.py    # Local testing utilities
```

**Key File: `docs.config.json`**
```json
{
  "product": "netbox",
  "edition": "community",
  "version": "4.2.0",
  "repo": "skeleton-netbox-submodule"
}
```

**Key Workflow: `publish-docs.yml`**

**Triggers:**
- `workflow_dispatch` (manual for now, can be automated to `push` later)

**Inputs:**
- `push`: Whether to create PR in docs-hub-poc (true/false)
- `local_simulate`: Test locally without pushing (true/false)
- `docs_hub_owner`: Target org (e.g., `netboxlabs` or `Greggnogg-personal` for testing)
- `docs_hub_repo`: Target repo (default: `docs-hub-poc`)

**Process:**
```yaml
1. Create docs bundle
   - zip -r bundle/docs-bundle.zip docs/
   
2. Validate inputs
   - Prevent both push and local_simulate being true
   
3. Create PR in docs-hub-poc (if push=true)
   - Use github-script action with DOCS_HUB_TOKEN
   - Create branch: docs/update-<sha>
   - Upload: incoming/docs-bundle-<short-sha>.zip
   - Create PR with metadata in body
```

**Why This Approach:**
- ✅ Each source repo controls its own publishing schedule
- ✅ No submodule management needed
- ✅ Easy to test locally before pushing
- ✅ Can be adapted to any source repository structure

#### 2. Documentation Hub (docs-hub-poc)

**Purpose**: Receive, validate, and process documentation bundles

**Structure:**
```
docs-hub-poc/
â"œâ"€â"€ incoming/                  # Staging area for bundles
â"‚   â"œâ"€â"€ skeleton-netbox-submodule/
â"‚   â"‚   â""â"€â"€ <version>/         # Unpacked documentation
â"‚   â""â"€â"€ docs-bundle-<sha>.zip # Bundle from PR (cleaned up after merge)
â"œâ"€â"€ scripts/
â"‚   â""â"€â"€ unpack-bundle.js       # Unpacking logic
â"œâ"€â"€ .github/workflows/
â"‚   â"œâ"€â"€ process-incoming.yml   # Main ingestion workflow
â"‚   â""â"€â"€ test.yml               # CI validation
â"œâ"€â"€ package.json               # Dependencies (unzipper)
â""â"€â"€ .actrc                     # Local testing config
```

**Key Workflow: `process-incoming.yml`**

**Triggers:**
- `pull_request` (types: opened, synchronize)

**Process:**
```yaml
1. Checkout docs hub repo
2. Find docs bundle in PR
   - git diff --name-only | grep 'docs-bundle.zip'
3. Setup Node.js 18
4. Install dependencies (npm install)
5. Unpack bundle
   - BUNDLE_PATH, REPO_NAME, VERSION from PR metadata
   - node scripts/unpack-bundle.js
   - Unpacks to: incoming/<repo>/<version>/
```

**Key Script: `unpack-bundle.js`**
```javascript
import fs from 'fs';
import path from 'path';
import unzipper from 'unzipper';

async function unpackBundle(bundlePath, repoName, version) {
  const targetDir = path.join('incoming', repoName, version);
  await fs.promises.mkdir(targetDir, { recursive: true });
  
  fs.createReadStream(bundlePath)
    .pipe(unzipper.Extract({ path: targetDir }))
    .on('close', () => {
      console.debug(`Bundle unpacked to ${targetDir}`);
    });
}
```

**Why This Approach:**
- ✅ Simple PR-based ingestion: easy to review and audit
- ✅ Version isolation: each version gets its own directory
- ✅ Node.js: lightweight, fast, well-supported for file operations
- ✅ Modular: unpack logic is separate and testable

---

## Technical Implementation

### Phase 1: Core Infrastructure (COMPLETE ✅)

**Goal:** Establish basic push-based ingestion pipeline

**Deliverables:**
- [x] Source repo template (skeleton-netbox-submodule)
- [x] Documentation hub (docs-hub-poc)
- [x] Bundle creation workflow
- [x] Bundle unpacking workflow
- [x] Local testing with `act`
- [x] Package.json with ES module support

**Key Files Created:**
1. `skeleton-netbox-submodule/.github/workflows/publish-docs.yml`
2. `docs-hub-poc/.github/workflows/process-incoming.yml`
3. `docs-hub-poc/.github/workflows/test.yml`
4. `docs-hub-poc/scripts/unpack-bundle.js`
5. `docs-hub-poc/package.json`
6. `docs-hub-poc/.actrc` (local testing config)

**Testing Results:**
- ✅ Bundle creation works (4359 bytes, includes all docs)
- ✅ PR creation logic verified (via `act` dry run)
- ✅ ES module configuration fixed
- ✅ Workflow triggers properly on PR events
- ⏳ Full E2E test pending: need actual PR with bundle from skeleton

### Phase 2: Automation & Triggers (IN PROGRESS)

**Goal:** Make the pipeline fully automatic

**Tasks:**
- [ ] Update `publish-docs.yml` to trigger on `push` to main/release branches
- [ ] Configure `DOCS_HUB_TOKEN` secret in source repos
- [ ] Add automatic version detection from git tags
- [ ] Implement cleanup of zip files after successful unpack

**Proposed Trigger Configuration:**
```yaml
# In skeleton-netbox-submodule/.github/workflows/publish-docs.yml
on:
  push:
    branches:
      - main
      - release/*
    paths:
      - 'docs/**'
  workflow_dispatch:  # Keep manual trigger for testing
```

**Auto-version Detection:**
```yaml
- name: Detect version
  id: version
  run: |
    if git describe --tags --exact-match 2>/dev/null; then
      VERSION=$(git describe --tags --exact-match)
    else
      VERSION="dev-$(git rev-parse --short HEAD)"
    fi
    echo "VERSION=$VERSION" >> $GITHUB_OUTPUT
```

### Phase 3: Quality & Validation (PLANNED)

**Goal:** Ensure documentation quality before ingestion

**Tasks:**
- [ ] Add Vale linting to source repos
- [ ] Validate docs.config.json schema
- [ ] Check for broken internal links
- [ ] Verify image assets exist
- [ ] Generate preview builds

**Proposed Workflow Addition:**
```yaml
- name: Validate documentation
  run: |
    # Schema validation
    npx ajv validate -s docs.config.schema.json -d docs.config.json
    
    # Lint documentation
    vale docs/
    
    # Check links
    markdown-link-check docs/**/*.md
```

### Phase 4: Integration & Migration (PLANNED)

**Goal:** Migrate real NetBox repos to new pipeline

**Tasks:**
- [ ] Integrate with netbox-community/netbox
- [ ] Integrate with netboxlabs/netbox-cloud
- [ ] Migrate existing workflows from submodule approach
- [ ] Parallel run: keep old pipeline while testing new
- [ ] Cutover: disable old workflows, enable new

**Migration Strategy:**
```
Week 1-2: Pilot with skeleton repo
Week 3-4: Add netbox-cloud (lower risk product)
Week 5-6: Add netbox-community (high traffic)
Week 7-8: Migrate remaining products
Week 9: Deprecate old submodule workflows
```

### Phase 5: Advanced Features (FUTURE)

**Potential Enhancements:**
- Versioned documentation (multiple versions live simultaneously)
- Rollback capability (revert to previous version)
- A/B testing for documentation changes
- Analytics integration (track which docs are accessed)
- AI-powered documentation suggestions
- Automatic changelog generation

---

## Migration Path

### Current State â†' Transition State â†' Future State

#### Current State (netboxlabs-website-dochub)
```
Source Repos (as submodules)
      â†"
Scheduled Pull (update-submodules.yml)
      â†"
Build & Create PR
      â†"
Manual Merge
      â†"
Deploy
```

**Characteristics:**
- Pull-based
- Scheduled (hourly)
- Submodule coupling
- Manual merge required

#### Transition State (Parallel Run)
```
Source Repos (dual mode)
      â†" (submodule)        â†" (push)
Current Pipeline       New Pipeline
      â†"                    â†"
Old Hub                docs-hub-poc
      â†"                    â†"
   Deploy (both paths validate)
```

**Characteristics:**
- Both pipelines active
- Compare results
- Validate new pipeline
- Low risk: can rollback

#### Future State (Push-Based)
```
Source Repos (independent)
      â†" (push on commit)
docs-hub-poc
      â†" (auto-validate)
docs-hub-production
      â†"
Deploy
```

**Characteristics:**
- Event-driven
- Real-time ingestion
- Auto-merge on quality pass
- No manual intervention

### Migration Checklist

**Pre-Migration:**
- [x] Build docs-hub-poc infrastructure
- [x] Test with skeleton repo
- [ ] Document migration process
- [ ] Train team on new workflow
- [ ] Establish rollback plan

**During Migration (Per Repo):**
- [ ] Add `publish-docs.yml` to source repo
- [ ] Configure `DOCS_HUB_TOKEN` secret
- [ ] Test with `workflow_dispatch` (manual)
- [ ] Validate bundle arrives in docs-hub-poc
- [ ] Verify unpacked content matches expectations
- [ ] Enable auto-trigger (`push`)
- [ ] Monitor for 1 week

**Post-Migration (Per Repo):**
- [ ] Confirm no regressions
- [ ] Remove from submodule list in old hub
- [ ] Update documentation
- [ ] Archive old PR automation rules

**Final Cutover:**
- [ ] All repos migrated
- [ ] Disable `update-submodules.yml`
- [ ] Archive `cleanup-automated-prs.yml`
- [ ] Redirect traffic to new hub
- [ ] Deprecate old hub repository

---

## Technical Decisions & Rationale

### Decision 1: Push vs. Pull Architecture

**Options Considered:**
1. **Keep Pull-Based (Submodules)** - Status quo
2. **Webhook-Based Push** - External service triggers on repo events
3. **GitHub Actions Push** - Source repos create PRs

**Decision:** GitHub Actions Push (Option 3)

**Rationale:**
- **Native Integration**: Uses GitHub's built-in features, no external dependencies
- **Auditable**: Every push creates a PR with full metadata and review history
- **Testable**: Can use `act` to test locally before pushing
- **Scalable**: Each source repo is independent; adding new repos is trivial
- **Secure**: Uses GitHub App tokens, standard RBAC

**Trade-offs:**
- Requires token management (`DOCS_HUB_TOKEN` per repo)
- Source repos need workflow configuration (but this is minimal and templated)

### Decision 2: Bundle Format (Zip vs. Git vs. Tar)

**Options Considered:**
1. **Direct file commits** - Commit each doc file individually
2. **Tar.gz bundle** - Standard Unix format
3. **Zip bundle** - Cross-platform format

**Decision:** Zip bundle (Option 3)

**Rationale:**
- **Cross-Platform**: Works on Windows, Linux, macOS without additional tools
- **GitHub Native**: GitHub displays zip contents in UI
- **Single Artifact**: Easier to track and clean up than multiple files
- **Compression**: Reduces PR size, faster transfers
- **Atomic**: Bundle is either fully present or not; no partial states

**Trade-offs:**
- Requires unzip step in hub (but this is simple with Node.js `unzipper`)
- Slightly larger than tar.gz (but negligible for doc sizes)

### Decision 3: Node.js vs. Python vs. Shell for Processing

**Options Considered:**
1. **Shell scripts** - Minimal dependencies, fast
2. **Python** - Rich ecosystem, readable
3. **Node.js** - Native GitHub Actions support, fast async I/O

**Decision:** Node.js (Option 3)

**Rationale:**
- **GitHub Actions Native**: Node.js 18+ pre-installed on all runners
- **Async I/O**: Fast file operations, non-blocking
- **Ecosystem**: `unzipper` package is well-maintained and simple
- **ES Modules**: Modern syntax, clean code
- **Debugging**: Easy to test locally with `node`

**Trade-offs:**
- Requires `package.json` and `npm install` step (but this is fast and cacheable)
- Less familiar to some ops teams than shell/Python

### Decision 4: PR-Based vs. Direct Commit

**Options Considered:**
1. **Direct commit** - Push directly to main branch
2. **PR-based** - Create PR for every ingestion

**Decision:** PR-based (Option 2)

**Rationale:**
- **Auditable**: Every ingestion has a clear history and can be reviewed
- **Reversible**: Easy to close PR or revert merge if issues found
- **Quality Gates**: Can add automated checks (CI, linting, validation)
- **Notification**: Team sees what's being ingested in real-time
- **Compliance**: Matches existing PR-based workflow culture

**Trade-offs:**
- Requires merge step (can be automated with auto-merge rules)
- Slightly slower than direct push (but quality over speed)

### Decision 5: Local Testing with `act`

**Options Considered:**
1. **Test in GitHub only** - Push and hope
2. **Docker Compose** - Custom test environment
3. **act (GitHub Actions runner)** - Local GitHub Actions

**Decision:** `act` (Option 3)

**Rationale:**
- **Parity**: Runs actual GitHub Actions locally, identical to production
- **Fast Iteration**: Test changes without pushing to GitHub
- **Cost**: Free, no GitHub Actions minutes consumed during dev
- **Debugging**: Can set breakpoints, inspect containers

**Implementation:**
- `.actrc` configures Ubuntu container image
- `test-pr-event.json` provides mock PR event data
- Commands: `act pull_request --list`, `act pull_request -j unpack`

**Trade-offs:**
- Requires Docker installed locally
- Not 100% identical to GitHub-hosted runners (but close enough)

---

## Testing Strategy

### Unit Tests

**Scope:** Individual functions and scripts

**Tools:**
- Jest (for Node.js scripts)
- Shellcheck (for bash scripts)

**Coverage Targets:**
- `unpack-bundle.js`: 100% (critical path)
- Workflow scripts: 80%

**Example Test:**
```javascript
describe('unpackBundle', () => {
  it('should unpack zip to correct directory', async () => {
    await unpackBundle('test.zip', 'test-repo', 'v1.0.0');
    expect(fs.existsSync('incoming/test-repo/v1.0.0')).toBe(true);
  });
  
  it('should handle missing bundle gracefully', async () => {
    await expect(
      unpackBundle('missing.zip', 'repo', 'v1')
    ).rejects.toThrow();
  });
});
```

### Integration Tests

**Scope:** Workflow interactions, end-to-end paths

**Tools:**
- `act` (local GitHub Actions)
- Manual PR creation

**Test Cases:**
1. **Happy Path**
   - Source repo pushes bundle
   - Hub detects and unpacks
   - Files land in correct directory
   
2. **Error Handling**
   - Corrupted zip file
   - Missing metadata
   - Network failures
   
3. **Concurrency**
   - Multiple repos push simultaneously
   - Hub processes in order

**Example Test Run:**
```bash
# Test source repo workflow
cd skeleton-netbox-submodule
act workflow_dispatch -e test-event.json -j publish-docs

# Verify bundle created
ls bundle/docs-bundle.zip

# Test hub workflow
cd ../docs-hub-poc
act pull_request -e test-pr-event.json -j unpack

# Verify unpacked
ls incoming/skeleton-netbox-submodule/<version>/
```

### System Tests

**Scope:** Full production-like environment

**Tools:**
- Staging GitHub repos
- Real GitHub Actions
- Vercel preview deployments

**Test Scenarios:**
1. **Real NetBox Repo Integration**
   - Fork netbox-community/netbox
   - Add publish-docs.yml
   - Push to test branch
   - Verify docs arrive in hub
   
2. **Load Testing**
   - 10 repos push simultaneously
   - Verify no race conditions
   - Check GitHub Actions quota usage
   
3. **Failure Recovery**
   - Kill workflow mid-execution
   - Retry should succeed
   - No orphaned branches

### Acceptance Criteria

**Phase 1 (MVP):**
- [x] Local testing with `act` works
- [x] Bundle creation and unpacking verified
- [ ] Real PR from skeleton repo processed successfully
- [ ] Documentation matches expected structure

**Phase 2 (Automation):**
- [ ] Auto-trigger on commit works
- [ ] Cleanup of old bundles works
- [ ] Quality checks pass before auto-merge

**Phase 3 (Production):**
- [ ] NetBox Community docs ingested correctly
- [ ] No regressions in published docs
- [ ] Old submodule workflow disabled
- [ ] Team trained on new process

---

## Deployment & Operations

### Infrastructure Requirements

**Minimal:**
- GitHub repositories (source and hub)
- GitHub Actions runners (provided by GitHub)
- GitHub App tokens for cross-repo operations

**Optional:**
- Self-hosted runners (for sensitive repos)
- CDN for bundle caching (if needed at scale)

**No Additional Services Needed:**
- No databases
- No external webhooks
- No serverless functions
- No container orchestration

### Monitoring & Observability

**Metrics to Track:**
1. **Ingestion Latency**
   - Time from source commit to hub PR creation
   - Target: < 2 minutes
   
2. **Success Rate**
   - % of pushes that result in successful unpack
   - Target: > 99%
   
3. **Bundle Size**
   - Track growth over time
   - Alert if >10MB (unusually large)
   
4. **GitHub Actions Quota**
   - Monitor minutes consumed
   - Optimize workflows if approaching limits

**Implementation:**
```yaml
# Add to workflows
- name: Report metrics
  if: always()
  run: |
    curl -X POST $METRICS_ENDPOINT \
      -d "workflow=process-incoming" \
      -d "status=${{ job.status }}" \
      -d "duration=${{ steps.unpack.duration }}"
```

### Operational Runbooks

**Runbook 1: Bundle Fails to Unpack**

**Symptoms:** PR created but unpack step fails

**Diagnosis:**
1. Check PR for bundle file: `incoming/docs-bundle-*.zip`
2. Verify bundle is valid zip: `unzip -t <bundle>`
3. Check workflow logs for error messages

**Resolution:**
- If corrupted: Close PR, ask source repo to re-push
- If missing metadata: Add validation to source workflow
- If Node.js error: Check dependencies in `package.json`

**Runbook 2: PR Not Created**

**Symptoms:** Source workflow succeeds but no PR in hub

**Diagnosis:**
1. Check source workflow logs for API errors
2. Verify `DOCS_HUB_TOKEN` is valid: `gh auth status --token $TOKEN`
3. Check permissions: token needs `repo` and `workflow` scopes

**Resolution:**
- Regenerate token if expired
- Update secret in source repo settings
- Re-run workflow manually

**Runbook 3: Multiple Versions Conflict**

**Symptoms:** Two PRs for same repo, different versions

**Diagnosis:**
1. Check timestamps: which is newer?
2. Verify version numbers in PR titles

**Resolution:**
- Merge both (they go to different directories)
- Or close older PR if superseded
- Add version conflict detection to hub workflow

### Disaster Recovery

**Scenario 1: Hub Repository Deleted**

**Impact:** HIGH - all ingestion stops

**Recovery:**
1. Restore from GitHub's trash (if <30 days)
2. Or recreate from backup
3. Re-enable workflows
4. Source repos will retry (PRs will queue)

**Prevention:**
- Enable branch protection on main
- Restrict admin access
- Regular backups

**Scenario 2: Source Repo Token Compromised**

**Impact:** MEDIUM - one source can't push

**Recovery:**
1. Revoke compromised token
2. Generate new token
3. Update secret in source repo
4. Re-trigger failed pushes

**Prevention:**
- Rotate tokens quarterly
- Use fine-grained tokens (not classic)
- Audit token usage regularly

**Scenario 3: Workflow Bug Causes Data Loss**

**Impact:** LOW - unpacked files incorrect

**Recovery:**
1. Revert hub main branch to last known good commit
2. Re-process PRs from history
3. Validate unpacked content

**Prevention:**
- Test workflow changes thoroughly with `act`
- Require PR reviews for workflow changes
- Maintain audit log of all ingestions

---

## Appendix

### A. Glossary

| Term | Definition |
|------|------------|
| **Bundle** | Zip file containing documentation and metadata |
| **Ingestion** | Process of receiving and unpacking documentation |
| **Source Repo** | Repository containing product code and docs (e.g., NetBox) |
| **Hub Repo** | Central repository that aggregates docs (docs-hub-poc) |
| **Submodule** | Git feature for embedding one repo inside another |
| **act** | Tool for running GitHub Actions locally |
| **Skeleton Repo** | Template repository for testing new pipelines |

### B. File Reference

**Key Configuration Files:**

| File | Purpose | Owner |
|------|---------|-------|
| `publish-docs.yml` | Publishes docs from source to hub | Source Repo |
| `process-incoming.yml` | Receives and unpacks docs | Hub Repo |
| `docs.config.json` | Metadata about documentation | Source Repo |
| `package.json` | Node.js dependencies | Hub Repo |
| `.actrc` | Local testing configuration | Hub Repo |

### C. API Reference

**GitHub REST API Endpoints Used:**

1. **Create Branch**
   ```
   POST /repos/{owner}/{repo}/git/refs
   ```

2. **Upload File**
   ```
   PUT /repos/{owner}/{repo}/contents/{path}
   ```

3. **Create Pull Request**
   ```
   POST /repos/{owner}/{repo}/pulls
   ```

4. **List Pull Requests**
   ```
   GET /repos/{owner}/{repo}/pulls
   ```

### D. Workflow Syntax Reference

**Minimal Source Repo Workflow:**
```yaml
name: Publish docs to hub
on: [workflow_dispatch]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Create bundle
        run: zip -r docs-bundle.zip docs/
      - name: Create PR
        uses: actions/github-script@v7
        with:
          github-token: ${{ secrets.DOCS_HUB_TOKEN }}
          script: |
            // PR creation logic
```

**Minimal Hub Workflow:**
```yaml
name: Process incoming docs
on: [pull_request]
jobs:
  unpack:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: node scripts/unpack-bundle.js
```

### E. Migration Timeline (Estimated)

| Phase | Duration | Key Activities |
|-------|----------|----------------|
| Phase 1 (Complete) | 2 weeks | Infrastructure setup, local testing |
| Phase 2 (Current) | 2 weeks | Automation, auto-trigger setup |
| Phase 3 (Next) | 3 weeks | Quality checks, validation |
| Phase 4 (Migration) | 6 weeks | Gradual repo migration |
| Phase 5 (Cleanup) | 2 weeks | Deprecate old workflows |
| **Total** | **15 weeks** | ~3.5 months |

### F. Resource Links

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [act (Local Runner)](https://github.com/nektos/act)
- [Node.js unzipper](https://www.npmjs.com/package/unzipper)
- [GitHub REST API](https://docs.github.com/en/rest)

---

**Document Version:** 1.0  
**Last Updated:** February 6, 2026  
**Maintained By:** DevOps & Documentation Team  
**Review Cycle:** Quarterly
