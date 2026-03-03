# Docs Hub POC

This repository receives documentation bundles from source repos via PRs.
Bundles arrive via PR at `incoming/{slug}/{slug}-v{version}-{sha}.zip` and are extracted to `site/docs/{slug}/{version}/`. The bundle file is removed after successful ingest.

This is a minimal proof-of-concept for the new ingestion pipeline.
