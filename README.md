# Docs Hub POC

A push-based documentation ingestion hub for NetBox Labs products.

Source repositories push documentation bundles (zip files) via pull requests. This hub validates, unpacks, and stores them at `site/docs/{slug}/{version}/`. A sidebar is regenerated automatically on each ingest. No submodules. No manual content transforms.

---

## How It Works

```
Source repo  →  publish-docs.yml  →  PR to incoming/{slug}/  →  process-incoming.yml  →  site/docs/{slug}/{version}/
```

1. A source repo builds a documentation bundle (`.zip` + `manifest.json`) using the `docs-publisher` tooling
2. It opens a PR against this repo placing the bundle at `incoming/{slug}/{slug}-v{version}-{sha}.zip`
3. `process-incoming.yml` validates the manifest, unpacks the docs to `site/docs/{slug}/{version}/`, regenerates sidebars, and removes the bundle
4. Merging the PR publishes the docs

---

## Repository Structure

```
incoming/           ← Bundles arrive here via PR (zip files, removed after ingest)
scripts/
  ingest_bundle.py  ← Validates manifest + unpacks bundle
  unpack-bundle.js  ← Node.js alternative unpacker
site/
  docs/             ← Extracted documentation, one dir per product/version
    {slug}/
      {version}/    ← e.g. netbox/v4.4/, cloud/v1.13/
  ...               ← Docusaurus site config
.github/workflows/
  process-incoming.yml  ← Main ingest workflow (triggers on PR with *.zip)
  test.yml              ← CI tests
```

---

## Bundle Format

Each bundle is a `.zip` containing:

```
manifest.json       ← Required: product metadata, version, source SHA, file list
index.md            ← Recommended entry point (or set metadata.landing_page)
*.md                ← All documentation files
images/             ← Any images referenced by docs
```

**`manifest.json` required fields:**

```json
{
  "created_at": "2026-03-06T10:00:00Z",
  "product": {
    "name": "NetBox Cloud",
    "slug": "cloud",
    "team": "cloud-platform"
  },
  "version": {
    "version": "1.13",
    "display_label": "v1.13",
    "strategy": "semver",
    "channel": "stable"
  },
  "source": {
    "sha": "abc123...",
    "sha_short": "abc123"
  },
  "files": [...],
  "stats": { "total_files": 42, "markdown_files": 38 }
}
```

---

## Content Sources — Migration Plan

### Immediate (bundle from current dochub)

These content sources live in `netboxlabs-website-dochub/localdocs/` and can be bundled and ingested directly without any content migration.

| Slug | Current location | Owner |
|------|-----------------|-------|
| `cloud` | `localdocs/cloud/` | dochub |
| `enterprise` | `localdocs/enterprise/` | dochub |
| `community` | `localdocs/community/` | dochub |
| `integrations` | `localdocs/integrations/` | dochub |
| `developer` | `localdocs/developer/` | dochub |

**What's needed:** Add `publish-docs.yml` to `netboxlabs-website-dochub` that bundles each `localdocs/` subdirectory and raises a PR against this repo on change.

---

### Short-term (product teams adopt publish workflow)

These products have clear owning teams. Content currently lives in the dochub but belongs in each product repo. Each team adds `.docs-publisher.yaml` and `publish-docs.yml` to their own repo and content migrates across.

| Slug | Current location | Target repo |
|------|-----------------|-------------|
| `copilot` | `localdocs/copilot/` | Copilot product repo |
| `discovery` | `localdocs/discovery/` | Discovery / orb-agent repo |
| `assurance` | `localdocs/assurance/` | Assurance product repo |
| `mcp` | `localdocs/mcp/` | MCP repo |

---

### Medium-term (external repos — requires NetBoxLabs engineering)

These are external repositories not directly controlled by the dochub team. Onboarding requires a PR to each upstream repo to add the publisher workflow. Pending keys and repository secrets from NetBoxLabs.

| Slug | Source repo | Notes |
|------|------------|-------|
| `netbox` | `netboxlabs/netbox` | Core NetBox docs (259 files, mkdocs.yml source) |
| `diode` | orb-agent/diode repo | Includes Diode SDK docs |
| `orb-agent` | orb-agent repo | Orb Agent / Discovery backend |
| `sdks` | `netboxlabs/pynetbox` | PyNetBox Python client |
| `extensions` | `netboxlabs/netbox-branching` | Branching, Custom Objects (multi-repo bundle) |

---

## What Each Source Repo Needs

1. **`.docs-publisher.yaml`** — product config (slug, name, version strategy)
2. **`publish-docs.yml`** — GitHub Actions workflow: zip docs + open PR against this repo
3. Docs in a predictable directory (e.g. `docs/` or `localdocs/`)

The `docs-publisher` tooling (see `site/docs/docs-publisher/`) provides the standard implementation. Once a repo has these two files, publishing is automatic on every docs change.

---

## Adding a New Source Repository

1. Install `docs-publisher` in the source repo
2. Add `.docs-publisher.yaml`:
   ```yaml
   product:
     name: "My Product"
     slug: "my-product"
     team: "my-team"
   version:
     strategy: semver
     channel: stable
   docs_dir: docs/
   ```
3. Add `publish-docs.yml` workflow that fires on changes to `docs/**`
4. On first run, it will open a PR to `incoming/my-product/` here
5. After merge, docs are live at `site/docs/my-product/{version}/`

---

## Local Testing

See [GITHUB_ACTIONS_SETUP.md](GITHUB_ACTIONS_SETUP.md) for instructions on testing the ingest workflow locally using `act` without pushing to GitHub.

See [PR_TEST_RESULTS.md](PR_TEST_RESULTS.md) for documented test results from previous end-to-end testing.

---

## Current Status

- [x] Ingest pipeline working (`process-incoming.yml`)
- [x] Bundle validation working (`scripts/ingest_bundle.py`)
- [x] Sidebar regeneration on ingest
- [x] `docs-publisher` tooling v1.0.8 tested end-to-end
- [ ] `publish-docs.yml` added to `netboxlabs-website-dochub` for immediate sources
- [ ] Product teams onboarded (copilot, discovery, assurance, mcp)
- [ ] External repos onboarded (netbox, diode, pynetbox, branching) — pending keys and repository secrets
