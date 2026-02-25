# Sample Integration: netboxlabs-website-dochub

This sample demonstrates how to integrate the Docs Publisher module within the `netboxlabs-website-dochub` repository using relative paths, integration steps, and usage examples.

Note that this repo currently doesn't have an installer package, this will be made available soon.

Currently it also uses forked repos from GitHub's public actions repositories. See the 'README' doc in the netbox-docs-publisher' repository for strategies to use / avoid this approach.

---

## Directory Structure Example

```
netboxlabs-website-dochub/
├── docs/
│   ├── index.md
│   ├── samples/
│   │   └── README.md  # ← This file
│   └── ...
├── .docs-publisher.yaml
├── .github/
│   └── workflows/
│       └── publish-docs.yml
└── ...
```

---

## Integration Steps

1. **Copy the Docs Publisher Config and Workflow**
   - Copy `.docs-publisher.yaml` to the root of your repo:
     ```bash
     cp ../netbox-docs-publisher/templates/.docs-publisher.yaml .
     ```
   - Copy the workflow template:
     ```bash
     mkdir -p .github/workflows
     cp ../netbox-docs-publisher/templates/workflows/publish-docs.yml .github/workflows/
     ```

2. **Edit Configuration**
   - Update `.docs-publisher.yaml` with your product name, slug, and version.
   - Adjust `paths.root` if your docs are not in the default `docs/` folder.

3. **Commit and Push**
   ```bash
   git add .docs-publisher.yaml .github/workflows/publish-docs.yml
   git commit -m "chore: add docs publisher integration"
   git push origin main
   ```

4. **Usage**
   - Make changes to files in `docs/`.
   - Push to `main` to trigger the workflow and publish docs.

---

## Usage Example

- To validate your config:
  ```bash
  python ../netbox-docs-publisher/scripts/docs_publisher.py validate
  ```
- To preview the bundle:
  ```bash
  python ../netbox-docs-publisher/scripts/docs_publisher.py bundle --dry-run
  ```
- To create a bundle:
  ```bash
  python ../netbox-docs-publisher/scripts/docs_publisher.py bundle -o bundle/my-bundle.zip
  ```

---

## Notes
- All paths are relative to the root of `netboxlabs-website-dochub`.
- Ensure you have Python and required dependencies installed (see `requirements.txt` in the publisher repo).
- For advanced integration, see the main [Integration Proposal](../DOCS_PUBLISHER_PROPOSAL.md).
