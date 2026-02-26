---
title: Installing Custom NetBox Plugins (v1.13)
description: >-
  Extend NetBox Enterprise with custom plugins using wheelhouse archives for
  standalone and multi-node/HA deployments
netbox_version: 1.13.1
tags:
  - administration
  - cloud
  - enterprise
  - netbox
  - operations
source: localdocs
lastUpdatedAt: 1769027798000
canonical: /docs/v1.13/enterprise/enterprise-features/nbe-ec-custom-plugins/
---
# Installing Custom NetBox Plugins

:::info S3 Storage Support in 1.13.0+
This documentation covers all NetBox Enterprise versions. **Method 2 (S3 Upload)** requires **NetBox Enterprise 1.13.0 or later**. For NetBox Enterprise 1.12.x and earlier, use Method 1 (kubectl cp) only.
:::

This guide explains how to install custom NetBox plugins in NetBox Enterprise environments. While NetBox Enterprise comes with certified and community plugins built-in, you can extend functionality by adding custom plugins through wheelhouse archives.

## Overview

NetBox Enterprise supports two methods for installing custom plugins, depending on your deployment architecture. Choose the method that matches your infrastructure:

| Feature | Method 1: kubectl cp | Method 2: S3 Upload |
|---------|---------------------|---------------------|
| **Best For** | Single-node, standalone deployments | Multi-node, HA, or production deployments |
| **Storage Type** | Embedded file storage | External S3-compatible storage |
| **Distribution** | Manual copy to each pod | Automatic to all pods |
| **Persistence** | Requires re-copy after pod restarts | Survives restarts and redeployments |
| **Updates** | Manual re-upload to each pod | Upload once, restart pods |
| **Complexity** | Simple kubectl commands | S3 CLI configuration required |
| **Version Required** | All NetBox Enterprise versions | NetBox Enterprise 1.13.0+ only |

Both methods use wheelhouse archives—tarballs containing Python wheel packages and their dependencies—to ensure consistent plugin installation across NetBox Enterprise restarts.

**Key Concepts:**

- **Wheelhouse Archive**: A tarball containing Python wheel (`.whl`) files and a `requirements.txt` manifest
- **Constraints File**: Version specifications from your NetBox Enterprise installation to ensure dependency compatibility
- **Plugin Configuration**: Python and environment variable settings in the Admin Console to enable and configure plugins

**Installation Process:**

1. Create a wheelhouse containing your plugins and dependencies
2. Upload the wheelhouse using kubectl (Method 1) or S3 (Method 2)
3. Configure plugins in the NetBox Enterprise Admin Console
4. Restart NetBox pods to activate plugins

:::note
On each startup, the wheelhouse's contents will be re-applied to a fresh NetBox Python environment.
:::

## Prerequisites

Before installing custom plugins, ensure you have:

**Required for All Methods:**
- Access to the NetBox Enterprise shell: `sudo ./netbox-enterprise shell`
- Python 3.12 development environment (matching NetBox Enterprise)
- `pip` package manager (`pip>=21.0`)
- Network access to PyPI (or your private package repository)

**Additional for Method 1 (kubectl cp):**
- `kubectl` CLI configured with access to your NetBox Enterprise cluster
- Permissions to list pods and copy files to the NetBox namespace

**Additional for Method 2 (S3 Upload):**
- S3-compatible storage configured in NetBox Enterprise (`AWS_STORAGE_BUCKET_NAME` set)
- S3 CLI tool: `aws` CLI or `s3cmd` installed and configured
- S3 credentials with write access to the media bucket

**Development Environment (for building custom modules):**
- Ubuntu 24 LTS with Python 3.12 on `x86_64` architecture
- Build tools: `gcc`, `python3-dev`, `build-essential` (if plugins require compilation)

## Creating the Wheelhouse Archive

### Step 1: Create a working directory

First, create a temporary directory for your plugin downloads to go:

```{.bash}
mkdir /tmp/wheelhouse
```

### Step 2: Download the `constraints.txt` file for your release

You can use `kubectl cp` to download a constraints file that contains a complete list of the pre-installed Python modules in your NetBox Enterprise version.

To do so, download it with this command:

```{.bash}
sudo ./netbox-enterprise shell

NBE_SOURCE_POD="$( \
  kubectl get pods -A \
  -o go-template='{{ range .items }}{{ .metadata.name }}{{ "\n" }}{{ end }}' \
  -l com.netboxlabs.netbox-enterprise/custom-plugins-upload=true \
  --field-selector status.phase=Running \
  | head -n 1 \
)"
NETBOX_NAMESPACE="$(kubectl get deployments \
  -A -l 'app.kubernetes.io/component=netbox' \
  -ojsonpath='{.items[0].metadata.namespace}')"

kubectl cp \
  --namespace "${NETBOX_NAMESPACE}" \
  "${NBE_SOURCE_POD}:/opt/netbox/constraints.txt" \
  /tmp/wheelhouse/constraints.txt
```

### Step 3: Create Wheels From Your Custom Modules (Optional)

If you are including any custom Python modules that aren't in PyPy, you will need to create wheel archives from them.
You can generate them with `pip wheel`, passing one or more paths or archives, like so:

```{.bash}
pip wheel \
  --prefer-binary \
  --wheel-dir "/tmp/wheelhouse" \
  --constraint /tmp/wheelhouse/constraints.txt \
  </path/to/your/python-module-dir|/path/to/your/python-module.tar.gz>
```

:::note
If your custom modules require compilation, you should build them on an `x86_64` platform running Ubuntu 24 LTS and Python 3.12 so they match NetBox Enterprise's containers.
:::

### Step 4a: Create a `requirements.txt`

Create a file called `requirements.txt` in your `/tmp/wheelhouse` directory, listing each of the plugins you'd like to include.

If you created custom wheels, make sure you add them to `requirements.txt` like any other dependency.

For details on the format of requirements files, please see the [pip documentation](https://pip.pypa.io/en/stable/reference/requirements-file-format/).
However, it is strongly recommended that you use `==` to include a specific known and tested version in your requirements file.

### Step 4b: Use `pip` to download the plugins and their dependencies

Next, use `pip` to populate the wheelhouse folder with any other dependencies, by running it with the `download` command, and the arguments necessary to pull the correct architecture and version to run inside the NetBox Enterprise container:

```{.bash}
pip download \
  --platform="manylinux_2_17_x86_64" \
  --only-binary=":all:" \
  --python-version="3.12" \
  --dest "/tmp/wheelhouse" \
  --find-links "/tmp/wheelhouse" \
  -c /tmp/wheelhouse/constraints.txt \
  -r /tmp/wheelhouse/requirements.txt
```

If all went well, you should see `*.whl` files in the `/tmp/wheelhouse/` folder for each of the packages you specified, as well as their dependencies.

### Step 5: Create the archive

Finally, create the archive:

```{.bash}
tar -C /tmp \
    -czf /tmp/wheelhouse.tar.gz \
    wheelhouse
```

This should create a tarball that contains the `wheelhouse/` directory and everything inside of it.

**Verify the Archive:**

```{.bash}
# Check the archive was created
ls -lh /tmp/wheelhouse.tar.gz

# Verify archive contents
tar -tzf /tmp/wheelhouse.tar.gz | head -20

# Expected output: wheelhouse/ directory containing .whl files and requirements.txt
```

The archive should contain:
- `wheelhouse/*.whl` - All wheel files for your plugins and dependencies
- `wheelhouse/requirements.txt` - Your requirements manifest

## Add your plugins to NetBox Enterprise

The method for uploading your wheelhouse depends on your deployment architecture:

- **Standalone Clusters with Embedded File Storage**: Use the kubectl cp method (Method 1)
- **Clusters with External S3 Storage** (e.g., Multi-node/HA): Use the S3 upload method (Method 2)

:::tip
If you have S3 storage enabled, Method 2 is strongly recommended even for single-node deployments, as it provides better resilience and easier updates.
:::

### Method 1: Standalone Clusters with Embedded File Storage

For single-node or standalone deployments using embedded file storage, use kubectl cp to copy the wheelhouse directly to the NetBox pod.

:::note
This method works whether or not you are in restore mode.
:::

```{.bash}
# Identify the NetBox pod name
POD_NAME=$(kubectl get pods -A -l app.kubernetes.io/component=netbox -o jsonpath='{.items[0].metadata.name}')

# Identify the namespace
NAMESPACE=$(kubectl get pods -A -l app.kubernetes.io/component=netbox -o jsonpath='{.items[0].metadata.namespace}')

# Copy wheelhouse to the pod
kubectl cp /tmp/wheelhouse.tar.gz \
  ${NAMESPACE}/${POD_NAME}:/opt/netbox/netbox/media/wheelhouse.tar.gz
```

**Limitations of Method 1:**

- **Multi-node deployments**: You would need to copy the wheelhouse to each pod individually
- **Pod restarts**: If pods are recreated, you'll need to re-copy the wheelhouse
- **Manual process**: Requires manual copying for each update

For multi-node or HA deployments, use Method 2 instead.

### Method 2: Clusters with External S3 Storage (Multi-node/HA)

For multi-node or HA deployments with external S3 storage enabled, upload the wheelhouse to your S3 bucket. All NetBox pods will automatically download and install plugins from S3 on startup.

**Prerequisites:**

- External S3 storage must be enabled in your NetBox Enterprise configuration
- S3 credentials must be configured in NetBox Enterprise (via environment variables)
- You'll need the `s3cmd` or `aws` CLI configured with access to your S3 bucket

:::note
NetBox Enterprise automatically downloads the wheelhouse from S3 on startup if `AWS_STORAGE_BUCKET_NAME` and `AWS_S3_ACCESS_KEY_ID` are configured. You only need to upload the file to the correct S3 location using the commands below.
:::

**Step 1: Upload the Wheelhouse to S3**

Choose the appropriate command for your S3 provider:

**For AWS S3:**

```{.bash}
aws s3 cp /tmp/wheelhouse.tar.gz \
  s3://YOUR_BUCKET_NAME/media/wheelhouse.tar.gz
```

**For DigitalOcean Spaces:**

```{.bash}
# Using s3cmd (recommended for DO Spaces)
s3cmd put /tmp/wheelhouse.tar.gz \
  s3://YOUR_BUCKET_NAME/media/wheelhouse.tar.gz \
  --host=nyc3.digitaloceanspaces.com \
  --host-bucket='%(bucket)s.nyc3.digitaloceanspaces.com'

# Or using AWS CLI with endpoint override
aws s3 cp /tmp/wheelhouse.tar.gz \
  s3://YOUR_BUCKET_NAME/media/wheelhouse.tar.gz \
  --endpoint-url=https://nyc3.digitaloceanspaces.com
```

**For MinIO or other S3-compatible storage:**

```{.bash}
aws s3 cp /tmp/wheelhouse.tar.gz \
  s3://YOUR_BUCKET_NAME/media/wheelhouse.tar.gz \
  --endpoint-url=https://your-minio-endpoint.com
```

:::important
The file must be uploaded to the `media/` prefix in your bucket. The path should be `s3://YOUR_BUCKET/media/wheelhouse.tar.gz`.
:::

**Step 2: Verify Upload**

Confirm the file was uploaded successfully:

```{.bash}
# For AWS S3
aws s3 ls s3://YOUR_BUCKET_NAME/media/wheelhouse.tar.gz

# For DigitalOcean Spaces or other S3-compatible storage
aws s3 ls s3://YOUR_BUCKET_NAME/media/wheelhouse.tar.gz \
  --endpoint-url=https://your-endpoint-url.com
```

**Benefits of Method 2:**

- **Multi-node ready**: Upload once, all nodes automatically download
- **Automatic updates**: Just upload a new wheelhouse and restart pods
- **Consistency**: All nodes/clusters pull from the same source
- **Persistent**: Survives pod restarts and redeployments
- **Scalable**: New pods automatically get plugins on startup

## Enable and Configure Your Plugins

In the Admin Console configuration, make sure _Show Advanced Settings_ is checked.
In the Python configuration overrides box, you can enter `PLUGINS = [...]` and `PLUGINS_CONFIG = {}` just as you would for any NetBox install.
For details, see the [NetBox plugin documentation](https://netboxlabs.com/docs/netbox/en/stable/configuration/plugins/).

## Restart the NetBox containers

The next time the NetBox pods restart, your changes should be automatically applied.

If you are in restore mode, switching out of restore mode will enable installation of your plugins.
If you are not, a "redeploy" in the admin console will trigger the same.

## Best Practices

### Version Pinning

Always use exact version specifications (`==`) in your `requirements.txt` file to ensure consistent deployments:

```
netbox-plugin-example==1.2.3
```

Avoid unpinned or range specifications (e.g., `>=1.0.0`) to prevent unexpected updates.

### Testing Before Production

1. **Test in Development**: Always test your wheelhouse in a development environment first
2. **Verify Plugin Load**: Check NetBox logs after deployment to confirm plugins loaded successfully
3. **Test Migrations**: Ensure plugin database migrations complete without errors
4. **Validate Functionality**: Test plugin features thoroughly before promoting to production

### Security Considerations

- **Source Verification**: Only install plugins from trusted sources
- **Dependency Review**: Review all dependencies for security vulnerabilities
- **Regular Updates**: Keep plugins updated with security patches
- **Minimal Permissions**: Configure plugin permissions following least-privilege principle

### Wheelhouse Management

- **Documentation**: Document which plugins are included and their versions
- **Version Control**: Consider storing `requirements.txt` in version control
- **Backup Strategy**: Keep previous wheelhouse versions for rollback capability
- **Size Optimization**: Remove unnecessary dependencies to reduce wheelhouse size

## Troubleshooting

### Wheelhouse Creation Issues

**Problem**: `pip download` fails with "No matching distribution found"

**Solutions**:
- Verify the plugin name and version exist on PyPI
- Check that the Python version (3.12) and platform (`manylinux_2_17_x86_64`) match your requirements
- For custom modules, ensure wheel files were created successfully
- Try running without `--only-binary=":all:"` if pure Python packages are missing

**Problem**: Constraints conflict errors during wheelhouse creation

**Solutions**:
- Ensure you downloaded the correct `constraints.txt` for your NetBox Enterprise version
- Check if plugin dependencies conflict with NetBox's dependencies
- Consider using `--no-deps` for problematic packages (advanced users only)

### Upload and Deployment Issues

**Problem**: kubectl cp fails with "no such file or directory"

**Solutions**:
- Verify the NetBox pod is running: `kubectl get pods -A -l app.kubernetes.io/component=netbox`
- Check that `/tmp/wheelhouse.tar.gz` exists locally
- Ensure you have the correct namespace and pod name
- Verify you're in the netbox-enterprise shell context

**Problem**: S3 upload succeeds but plugins don't install

**Solutions**:
- Verify the file path is exactly `s3://YOUR_BUCKET/media/wheelhouse.tar.gz`
- Check S3 credentials are configured correctly in NetBox Enterprise
- Ensure the bucket name and region match your configuration
- Review NetBox pod logs for download errors: `kubectl logs -n netbox-ns <pod-name>`

**Problem**: Plugins don't appear after restart

**Solutions**:
- Check NetBox logs for plugin loading errors: Look for tracebacks or import errors
- Verify `PLUGINS = [...]` configuration includes your plugin names
- Ensure the wheelhouse was uploaded to the correct location
- Confirm the tarball structure: Run `tar -tzf wheelhouse.tar.gz` to verify it contains `wheelhouse/` directory

### Plugin Runtime Issues

**Problem**: Plugin loaded but features don't work

**Solutions**:
- Run database migrations: Plugins often require database schema changes
- Check `PLUGINS_CONFIG` settings match plugin requirements
- Review plugin documentation for required configuration
- Verify plugin dependencies are compatible with your NetBox version

**Problem**: Performance degradation after plugin installation

**Solutions**:
- Review plugin documentation for performance considerations
- Check if plugin adds database queries to frequently-accessed pages
- Monitor plugin resource usage via NetBox admin metrics
- Consider disabling unnecessary plugin features via `PLUGINS_CONFIG`

## Additional Resources

- [NetBox Plugin Configuration](https://netboxlabs.com/docs/netbox/en/stable/configuration/plugins/)
- [NetBox Plugin Development Guide](https://netboxlabs.com/docs/netbox/en/stable/plugins/development/)
- [NetBox Community Plugins List](https://github.com/netbox-community/netbox/wiki/Plugins)
- [pip Requirements File Format](https://pip.pypa.io/en/stable/reference/requirements-file-format/)
- [Python Wheel Format](https://packaging.python.org/en/latest/specifications/binary-distribution-format/)
- [NetBox Enterprise Admin Console Guide](/docs/cloud/console-administration/console-overview)

## Migrations and Upgrades

When upgrading to a new NetBox Enterprise version which includes a different version of the included NetBox, you will likely need to generate a new wheelhouse file that matches its changed dependencies.

### Upgrade Process

1. **Enable Restore Mode**: Put NetBox Enterprise into "restore mode" in the Admin Console configuration, and deploy the config change.
2. **Deploy New Version**: Deploy the new NetBox Enterprise version.
3. **Rebuild Wheelhouse**:
   - Download the new `constraints.txt` file from the updated NetBox Enterprise pods
   - Rebuild your wheelhouse using the new constraints file
   - Test the new wheelhouse in a development environment
4. **Upload New Wheelhouse**: Upload the new wheelhouse using Method 1 or Method 2 above
5. **Exit Restore Mode**: Uncheck "restore mode" and deploy to enable the new plugins.

### Managing Plugin Compatibility

- **Check Plugin Compatibility**: Before upgrading, verify your plugins support the new NetBox version
- **Review Release Notes**: Check NetBox and plugin release notes for breaking changes
- **Test Migrations**: Always test plugin migrations in a non-production environment first
- **Rollback Plan**: Keep the previous wheelhouse available for quick rollback if needed
