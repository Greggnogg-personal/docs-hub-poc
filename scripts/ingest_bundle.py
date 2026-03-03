#!/usr/bin/env python3
"""
Docs Hub Ingest — Unpack and validate incoming documentation bundles.

Usage:
    python scripts/ingest_bundle.py <bundle.zip> [--output-dir site/]
    python scripts/ingest_bundle.py incoming/docs-bundle.zip --validate-only

Environment:
    Set GITHUB_OUTPUT to write outputs for GitHub Actions.
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import zipfile
from datetime import datetime
from pathlib import Path
from typing import Any


def validate_manifest(manifest: dict[str, Any]) -> list[str]:
    """Validate manifest structure and return list of errors."""
    errors = []

    # Required top-level keys
    required_keys = ["created_at", "product", "version", "source", "files", "stats"]
    for key in required_keys:
        if key not in manifest:
            errors.append(f"Missing required key: {key}")

    # Validate product
    product = manifest.get("product", {})
    if not product.get("name"):
        errors.append("Missing product.name")
    if not product.get("slug"):
        errors.append("Missing product.slug")

    # Validate version
    version = manifest.get("version", {})
    if not version.get("version"):
        errors.append("Missing version.version")

    # Validate source
    source = manifest.get("source", {})
    if not source.get("sha"):
        errors.append("Missing source.sha")

    # Validate files list
    files = manifest.get("files", [])
    if not isinstance(files, list):
        errors.append("files must be an array")
    elif len(files) == 0:
        errors.append("files array is empty")
    else:
        for i, f in enumerate(files[:5]):  # Check first 5
            if not f.get("path"):
                errors.append(f"files[{i}] missing path")

    return errors


def unpack_bundle(
    bundle_path: Path,
    output_dir: Path,
    validate_only: bool = False,
) -> tuple[bool, dict[str, Any]]:
    """
    Unpack a docs bundle and validate its contents.

    Returns:
        (success, info_dict)
    """
    info: dict[str, Any] = {
        "bundle_path": str(bundle_path),
        "manifest": None,
        "errors": [],
        "files_extracted": 0,
    }

    # Check bundle exists
    if not bundle_path.exists():
        info["errors"].append(f"Bundle not found: {bundle_path}")
        return False, info


    try:
        with zipfile.ZipFile(bundle_path, "r") as zf:
            # Check for manifest
            if "manifest.json" not in zf.namelist():
                info["errors"].append("Bundle missing manifest.json")
                return False, info

            # Read and validate manifest
            manifest_data = zf.read("manifest.json").decode("utf-8")
            try:
                manifest = json.loads(manifest_data)
            except json.JSONDecodeError as e:
                info["errors"].append(f"Invalid manifest JSON: {e}")
                return False, info

            info["manifest"] = manifest

            # Validate manifest structure
            validation_errors = validate_manifest(manifest)
            if validation_errors:
                info["errors"].extend(validation_errors)
                return False, info

            # If validate-only, we're done
            if validate_only:
                print(f"[OK] Manifest valid: {manifest['product']['name']} v{manifest['version']['version']}")
                return True, info

            # Extract to output directory
            product_slug = manifest["product"]["slug"]
            version = manifest["version"]["version"]
            target_dir = output_dir / product_slug / version

            target_dir.mkdir(parents=True, exist_ok=True)

            # Extract all files
            for name in zf.namelist():
                zf.extract(name, target_dir)
                info["files_extracted"] += 1

            print(f"[OK] Extracted {info['files_extracted']} files to {target_dir}")


            # Do not remove manifest.json or bundle zip here; cleanup is handled by the workflow after all steps succeed.

    except zipfile.BadZipFile as e:
        info["errors"].append(f"Invalid zip file: {e}")
        return False, info
    except Exception as e:
        info["errors"].append(f"Unpack error: {e}")
        return False, info

    return True, info


def write_github_output(key: str, value: str) -> None:
    """Write output for GitHub Actions."""
    output_file = os.environ.get("GITHUB_OUTPUT")
    if output_file:
        with open(output_file, "a", encoding="utf-8") as f:
            f.write(f"{key}={value}\n")


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Unpack and validate incoming docs bundles"
    )
    parser.add_argument("bundle", help="Path to the bundle zip file")
    parser.add_argument(
        "--output-dir",
        "-o",
        default="site/docs",
        help="Output directory for extracted docs (default: site/docs/)",
    )
    parser.add_argument(
        "--validate-only",
        action="store_true",
        help="Only validate the bundle, don't extract",
    )

    args = parser.parse_args()

    bundle_path = Path(args.bundle)
    output_dir = Path(args.output_dir)

    print(f"Processing: {bundle_path}")

    success, info = unpack_bundle(
        bundle_path,
        output_dir,
        validate_only=args.validate_only,
    )

    if success:
        manifest = info["manifest"]
        product = manifest["product"]["name"]
        slug = manifest["product"]["slug"]
        version = manifest["version"]["version"]
        sha = manifest["source"]["sha_short"]
        file_count = manifest["stats"]["total_files"]

        print(f"  Product: {product} ({slug})")
        print(f"  Version: {version}")
        print(f"  Source:  {sha}")
        print(f"  Files:   {file_count}")

        # Write outputs for GitHub Actions
        write_github_output("product_name", product)
        write_github_output("product_slug", slug)
        write_github_output("version", version)
        write_github_output("sha", sha)
        write_github_output("success", "true")

        return 0
    else:
        print("[FAIL] Bundle validation failed:")
        for error in info["errors"]:
            print(f"  - {error}")

        write_github_output("success", "false")
        return 1


if __name__ == "__main__":
    sys.exit(main())
