# GitHub Actions Setup & Local Testing

This repository is configured to use GitHub Actions. The workflow automatically processes documentation bundles when they are submitted via pull requests.

## Workflow Overview

**Workflow File:** [.github/workflows/process-incoming.yml](.github/workflows/process-incoming.yml)

**Trigger:** Pull requests (opened or synchronized)

**Purpose:** Automatically unpacks documentation bundles submitted in PRs into the `/incoming/<repo>/<version>/` directory structure.

## Testing Locally with `act`

You can test the GitHub Actions workflow locally using [act](https://github.com/nektos/act), which runs GitHub Actions in Docker containers on your local machine.

### Prerequisites

1. **Install Docker**
   - Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop)
   - Ensure Docker is running before using `act`

2. **Install act**
   ```powershell
   # Using Chocolatey
   choco install act
   
   # Or download from https://github.com/nektos/act/releases
   ```

### Running Workflows Locally

**List available workflows:**
```powershell
act --list
```

**Run the unpack workflow (simulate a pull request):**
```powershell
act pull_request
```

**Run with verbose output:**
```powershell
act pull_request -v
```

**Run with specific event data:**

Create a file `event.json` with mock PR data:
```json
{
  "pull_request": {
    "head": {
      "repo": {
        "name": "my-repo"
      },
      "sha": "abc123def456"
    }
  }
}
```

Then run:
```powershell
act -e event.json
```

### Common Issues

**Issue:** "Docker socket not found"
- **Solution:** Ensure Docker Desktop is running

**Issue:** Workflow fails with "command not found: node"
- **Solution:** `act` may be using a minimal container. Specify the container image:
  ```powershell
  act --container-architecture linux/amd64
  ```

**Issue:** Git diff command fails locally
- **Solution:** When testing locally, the git context may differ. You can modify the workflow to use a test bundle path or skip the git diff step for local testing.

## Workflow Details

### Current Workflow Steps

1. **Checkout** - Pulls the latest code from the repository
2. **Find docs bundle** - Searches for `docs-bundle.zip` in the PR changes
3. **Setup Node.js** - Installs Node.js 18
4. **Install dependencies** - Installs the `unzipper` package
5. **Unpack bundle** - Executes the unpacking script with environment variables

### Environment Variables

- `BUNDLE_PATH` - Path to the docs bundle zip file
- `REPO_NAME` - Source repository name
- `VERSION` - Version/commit SHA

## Next Steps

1. Test the workflow locally using `act`
2. Push changes to a branch and create a PR to test in GitHub
3. Monitor the Actions tab in GitHub to see workflow execution
4. Adjust the workflow as needed based on test results
