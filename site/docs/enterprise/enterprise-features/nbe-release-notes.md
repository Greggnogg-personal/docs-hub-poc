---
tags:
  - api
  - assurance
  - authentication
  - discovery
  - docker
  - enterprise
  - helm
  - netbox
title: 'NetBox Enterprise: NetBox Enterprise Release Notes'
source: localdocs
lastUpdatedAt: 1769025091000
canonical: /docs/enterprise/enterprise-features/nbe-release-notes/
---
# NetBox Enterprise Release Notes

## NetBox Enterprise 1.13.x

### 1.14.0

This release includes several new features, bug fixes, and dependency updates, primarily an update to NetBox 4.4.

Notable changes in this release include:

- Upgraded NetBox to 4.4.10 and updated several bundled plugins and dependencies.
- Upgraded Diode to 1.12.0 and Diode Pro to 1.12.0 with query optimizations and other updates.
- Updated configuration options (e.g., max_cots for custom objects, maintenance/suspend modes).
- Numerous bug fixes for build, cluster readiness, plugin management, and test automation.
- Dependency updates across Rust, Python, and Docker images for security and compatibility.

#### Versions

This release uses the following upstream software:

- NetBox 4.4.10
- Redis 7.4.3 (if built-in Redis is enabled)
- PostgreSQL 16.11 (if built-in database is enabled)
- Diode 1.12.0
- Diode Pro 1.12.0

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| netbox-acls | netbox_acls | 1.9.1 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.17.0 | ☑︎ |
| netbox-documents | netbox_documents | 0.7.4 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.8.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.7 | ☐ |
| netbox-inventory | netbox_inventory | 2.4.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.6 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.4.4 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.19 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.4 | ☑︎ |
| netbox-secrets | netbox_secrets | 2.4.1 | ☑︎ |
| netbox-topology-views | netbox_topology_views | 4.4.0 | ☑︎ |
| netbox-validity | validity | 3.4.0 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 1.7.0 | ☑︎ |
| netboxlabs-netbox-assurance-plugin | netbox_assurance | 1.3.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.8.1 | ☑︎ |
| netboxlabs-netbox-changes | netbox_changes | 0.4.2 | ☑︎ |
| netboxlabs-netbox-custom-objects | netbox_custom_objects | 0.4.4 | ☑︎ |
| slurpit_netbox | slurpit_netbox | 1.2.7 | ☑︎ |

#### Features

- **actions:** CI/CD workflow improvements including create-or-update channel, configurable case-sensitivity, appliance build triggers on main/promotion, arm64 build optimization, temp replicated customer with auto-cleanup, channel ID resolution, cache hashing updates, automation test dispatching on release, reusable tool downloading, and helm subchart caching
- **appliance:** reduce apt-get update surface with --no-install-recommends, support direct sequence number download
- **auth:** feature gate auth configuration with additional config values from netbox docs (NBE-533)
- **cluster:** (neko) allow external configmap ref and basic `customPythonConfig` param in CRD for custom python
- **config:** add max_cots setting for custom objects
- **database:** update init sql to 4.4.8 schema
- **diode:** update to Diode chart 1.13.0 with reconciler 1.12.x
- **docker:** improve layer caching, fix pip wheel cache, add json comments support in packageignore, require JFROG_USER
- **netbox:** update plugins: branching to 0.8.1, changes to 0.4.2, validity to 3.4.0
- **release:** update appliance build to create a 1.13.0 stable image
- **crd:** add license tier to status (NBE-532), CRD status field and event recording, ready status + debounce on api, velero missing warning, auth CRD examples (NBE-533)
- **crd:** add suspend option to NetBoxCluster and various components for debugging resource application (NBE-409)
- **crd:** namespace only mode and prune orphaned components (NBE-408)
- **operator:** netbox-config crate and auth module, wire up to k8s crate for user auth script (NBE-533)
- **operator:** implement resource mutation pipeline for Kubernetes resources
- **operator:** add Replicated SDK readiness checks and timeout configuration
- **testing:** added test for adding a site with DRY refactoring, k9s pod monitoring for deployments
- **tooling:** rust-toolchain toml file and flake enhancements

#### Bug Fixes

- **actions:** CI/CD fixes including accept routes default, undici dependency update, channel handling without assigned customers, release promotion as separate action, channel name resolution with replicated action, slack notification webhook type
- **appliance:** fix missing size update to builds, cut out filesystem zeroing for build performance
- **auth:** group mapping in SAML auth, add azuread options to OIDC, use secret projection & helper methods instead of SecretString (NBE-533)
- **build:** ensure appliance builds trigger properly when updated
- **chart:** set 0.0.1-main tag for nbe-operator
- **ci:** run clippy with and without feature flags, fix chart lint and push to replicated workflow
- **cluster:** prevent RBAC secret errors on multi-node restore (NBE-548), include diode proxy in readiness UI display
- **config:** prevent azure login URI mismatches (NBE-546), update ova instance settings
- **database:** back off to older schema
- **deps:** prevent `scrapli` errors when Validity plugin is enabled (NBE-543), align kube crypto backend with reqwest using aws-lc-rs
- **deps:** update netboxlabs-netbox-branching to 0.8.0, netboxlabs-netbox-custom-objects to 0.4.4
- **diode:** correct diode config to use clientCertPath, fix missing redis tls client mount in dbwait container
- **docker:** don't redownload internal plugins if they exist, add py deps that need a compiler to sec requirements, streamline Dockerfile, ensure proper newlines
- **offline:** fix nginx image caching, bump version to 1.29.4
- **release:** handle Unstable channel name correctly, remove NBE-376 branch condition from release job
- **tests:** include ca-certs for operator k8s mock client unit tests, fix test initialization missing suspend field
- **operator:** ready/unready status per component, prevent race condition on upgrade pauses, remove unused K8sError variants, fix locator and channel/license validation for local runs
- **linting:** super-linter adjustments, shift auth enums to structs for schemars ease, update jq calls to properly throw errors, fix clippy strict mode issues
- **ci:** stop duplicated messages, update yaml for create customer, graceful allure upload failure handling, schedule main runs to avoid timeouts
- **slack:** amend notifications for non-test failures, update Slack GitHub action to v2.1.1
- **misc:** fix reuse ip behavior with env example docs, gitignore path corrections, remove obsolete NetBox versions from packageignore.json, update docker_image to main-latest

#### Build Updates

- **actions:** improve workflow of downloading github release tarballs (e78adb2)
- **deps:** update rust crates: reqwest to 0.13.1, serde_json to 1.0.149, clap to 4.5.54, schemars to 1.2.0, redis to 1.0.2, axum to 0.8.8, k8s-openapi to 0.26.1
- **deps:** update rust tokio and serde package groups
- **deps:** bump rsa in the cargo group
- **deps:** update GitHub Actions: tailscale/github-action to v4, super-linter to v8.3.2, docker/setup-buildx-action to v3.12.0, tj-actions/changed-files to v47.0.1, actions/checkout to v6.0.1, peter-evans/create-pull-request to v8
- **deps:** update Docker tags: rancher/kubectl to v1.35.0, rust to v1.92
- **deps:** update helm release reloader to v2.2.7
- **deps:** update Node.js dependencies: @types/node to ^24.10.7, node to v24.12.0, @vercel/ncc to ^0.38.4
- **deps:** update Python dependencies: certifi to v2026, pillow to >=12.1.0, allure-pytest to >=2.15.3, playwright to >=1.57.0, pytest to >=9.0.2, python to v3.14.2
- **deps:** update github artifact actions
- **deps-dev:** bump k3d version in smoke tests (238bb99)
- **release:** promote 1.13.1 to stable (c777472)
- **release:** trigger a new 1.13.1 appliance build (1ca5db0)
- **release:** bump version to 1.13.1 (eedb446)
- **rust:** update tokio dependencies together (5c9c4bf)

### 1.13.1

A small bug fix release to address an nginx image issue.

#### Bug Fixes

- **cluster:** include diode proxy in readiness UI display (cead1a4)
- **offline:** fix nginx image caching, bump version to 1.29.4 (97b9d99)

#### Build Updates

- **release:** bump version to 1.13.1 (eedb446)

#### Versions

This release uses the following upstream software:

- NetBox 4.3.7
- Redis 7.4.3 (if built-in Redis is enabled)
- PostgreSQL 16.11 (if built-in database is enabled)
- Diode 1.11.0
- Diode Pro 1.11.0

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| netbox-acls | netbox_acls | 1.9.1 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.16.1 | ☑︎ |
| netbox-documents | netbox_documents | 0.7.4 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.7.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.7 | ☐ |
| netbox-inventory | netbox_inventory | 2.4.0 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.6 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.3.5 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.18 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.4 | ☑︎ |
| netbox-secrets | netbox_secrets | 2.3.4 | ☑︎ |
| netbox-topology-views | netbox_topology_views | 4.3.0 | ☑︎ |
| netbox-validity | validity | 3.3.2 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 1.6.0 | ☑︎ |
| netboxlabs-netbox-assurance-plugin | netbox_assurance | 1.3.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.6.2 | ☑︎ |
| netboxlabs-netbox-changes | netbox_changes | 0.3.0 | ☑︎ |
| slurpit_netbox | slurpit_netbox | 1.1.44 | ☑︎ |

### 1.13.0

This release introduces significant new features, bug fixes, and dependency updates. Key highlights include:

- **Backup Improvements:** Velero backup and restore functionality is improved.
- **Appliance Optimization:** Reduced appliance image size for airgap installs and improved resource usage.
- **High Availability & Scaling:** Enhanced multi-node and HA support, including node spread constraints, affinity settings, and per-node replica configuration.
- **External Storage & TLS:** Added support for external Redis with TLS, custom S3 storage, and improved certificate management across all pods.
- **Diode Updates:** Upgraded Diode components, added proxy configuration, and improved telemetry defaults.
- **Security & Permissions:** Refined role permissions, made media and scripts private, and improved secret handling.
- **Build & Dependency Updates:** Numerous updates to dependencies, build scripts, and plugin versions for improved stability and compatibility.

#### Features

- **appliance:** zero extra space in appliance image
- **cluster:** move ingress configuration from EC config to values; add ingress controller as a sub-chart; scale wait timeout linearly with node count; normalize wait timeouts for various initContainer checks; set spread constraints and affinities to spread across nodes; always disable embedded file storage if HA is licensed; cleanly handle node count when multinode is enabled; skip affinity labels when fs storage is disabled; add worker affinities to match nbe pods; include prometheus CRDs only in EC installs; wipe jobs that are failed or incomplete on upgrade; include env+diode checksums in migration checks; include environment checksum in netbox pods
- **config:** add extra node info to config screen; use node_count for replicas everywhere; overhaul of kots config to match current expectations; camelCase everything, working out a kots config for operator
- **database:** (built-in) PGO should only watch our namespace; make sure pgo initializes early when enabled; add Redis and PostgreSQL restore hooks with RBAC permissions and validation scripts
- **diode:** update reconciler pro to 1.11.0; add diode proxy configuration, deployment, and service; upgrade to 1.9.1 chart; diode defaults for telemetry and other config
- **netbox:** make nb replicas per-node; make media and scripts private to force querystring auth; custom plugin install now pulls from S3 if configured
- **redis:** improve handling of sentinel failover; handle checksums to encourage pod restarts on config change
- **storage:** add config for external s3 storage; ImageSpec trait & macro to clean up image overrides
- **tls:** make sure all pods use fully-generated cert store
- **velero:** add Velero backup resources to ClusterRole and example configuration; add backup module to Velero CRD; implement Velero backup and restore functionality; add support for Velero backup and restore resources in NetBox
- **crd:** crd export so it is on cluster during helm install

#### Bug Fixes

- **actions:** update semantic release code to handle release/* and bump versions
- **appliance:** guard against strict mode
- **backups:** don't attempt to backup the pending PVC if filesystem storage is disabled; move velero resources to the chart, only deploy if velero is found
- **cluster:** make sure certificate names don't clobber each other; handle upgrade over previous embedded ingress cleanly; handle airgap/pull-secrets properly for ingress-nginx; simplify HA/multi-node config choices; only mount user-data volume if persistence is enabled; update nbe affinity to pin if media is set, but otherwise spread out; no need to wait since reloader is disabled on upgrade; limit job cleanup to housekeeping and utils; move secret init to separate hook; simplify/reduce upgrade hooks for secrets; make sure init can create secrets during deploy; fix integer compare when lockfile does not exist; propagate global db enable to subchart; always create CA secrets if set; handle update when there are no certs; add environment configmap to checksum; make sure service account is created before pre-upgrade; add batch API group for cronjob; refactor roles into rw and ro to further reduce permissions; reduce permissions for roles to the namespace; remove redundant hydra secret defs to cease post-install redef warnings; separate cert and insecure option logic; pass on redis tls params to diode; complete changeover to insecure_skip_verify; use insecure_skip_tls_verify instead of ssl_self_signed; correct permissions and ensure pre-upgrade doesn't abort; set image pull secrets across all deployments; update embedded cluster configuration for DaemonSet and host networking; remove commented lines for clarity in embedded cluster configuration
- **database:** ensure post-install waits on right db secrets before running; use generated secret for netbox init; only helm hook n pre-upgrade for db init; set helm hooks on db secret init job because of immutability during upgrade; update image configuration for Redis and PostgreSQL restore hooks
- **deployment:** reorder imports for consistency
- **diode:** consolidate OAuth2 endpoint configurations in nginx; add OAuth2 token introspection endpoint to nginx configuration; refactor gRPC service locations and remove upstream definitions; get rid of extraneous optional match; use nginx image pull secrets config; update diode proxy deployment to match others; replicas should scale to the number of nodes; handle both diode protobuf types properly; update upstream server references in diode proxy configuration; show diode/hydra resource status in app console
- **netbox:** disable persistence when external S3 is being used; ensure SSL config environment matches everywhere; initialize user configs; set AWS_S3_VERIFY for self sign self hosted options; use custom healthcheck against /ht NBE-488; add netbox healthcheck plugin NBE-488; config mounts for maintenance mode pod, hidden rerender addition, bring back the helm hook NBE-486; hidden trigger_render so redeploy will rerender NBE-486; restore-mode becomes maintenance-mode, use nbe-core instead of util NBE-461; use 0.1.5 nbe plugin; use 0.1.4 nbe plugin; use nbe plugin 0.1.2 with SCRIPTS_ROOT change; keep 0.1.1 nbe plugin; set netbox-enterprise-plugin to 0.1.1; strip cache buster code out, set staticfiles to filesystem NBE-347; strip cache buster via middleware NBE-347; disable aws checksum validation for custom s3 endpoints NBE-347; add no-ssl-verify option for s3 NBE-347; region_name to configmap-extra storages NBE-347; s3 region configuration setting NBE-347; improved logic for s3 vs PV storage; invert "Use S3" checkmark to match other settings; s3 access fixes; ensure static files are readable on first install; append netbox_enterprise_plugin to plugins NBE-347; add netbox_enterprise_plugin to managed plugins NBE-347
- **redis:** handle cacert mounting properly; make sure redis operations have reasonable timeouts; pass TLS config to redis CLI startup checks; mount TLS cert only if it exists; initContainer checks want REDIS_HOST and REDIS_PORT set; refactor redis config and normalize on external secret; create secret for external redis in EC; redis-cli now uses redis ssl cert (and username for redis 6+)
- **storage:** update S3 secret configuration and disable S3 when embedded file storage is enabled; don't add user-data-volume pvc when s3 enabled; revert check for s3 when creating PV; restore s3 secrets and envs; ensure secrets aren't turned into envs if they don't exist; address nil pointer issue when s3 is not enabled; update persistence settings and S3 configuration for worker scaling in multi-node setups; enhance worker scaling and persistence settings for multi-node setups; standardize helm timeout and improve pod distribution logic for S3 storage; update helm timeout to be dynamic based on node count; increase helm timeout for multinode clusters
- **misc:** fixing linting errors in renovate.json; updated renovate json to tie pytest and playwright versions together to prevent workflow failures; linting errors resolved (hopefully); changes to fix linting error; updated workflow to get correct channel information; require jfrog user & token for docker build NBE-347; fixed branch sanitisation block so it will find channel name correctly; clean up unwrap and similar errors in operator crate; clean up unwrap and similar errors in k8s crate; makefile fixes for macos

#### Build Updates

- **appliance:** update appliance build for 1.12.4/stable (667479d)
- **deps:** update peter-evans/create-pull-request action to v7.0.11 (#588) (a24d03e)
- **deps:** update peter-evans/create-pull-request action to v7.0.10 (#585) (560d7a5)
- **deps:** update alpine docker tag to v3.23 (#578) (135b20c)
- **deps:** update dependency python to v3.14.1 (#574) (314a1d4)
- **deps:** update dependency allure-pytest to >=2.15.2 (#572) (e9caf10)
- **deps:** update actions/setup-node action to v6.1.0 (#569) (72d442d)
- **deps:** update rust crate log to 0.4.29 (#568) (3923ca8)
- **deps:** switch to python 3.12 to match nbe runtime (678099c)
- **deps:** update dependency python to v3.14.1 (ea344bc)
- **deps:** update dependency django to ~=5.2.9 (#565) (98cdbc5)
- **deps:** update actions/checkout action to v6.0.1 (8531445)
- **deps:** update dependency netboxlabs-diode-netbox-plugin to ~=1.6.0 (#563) (5f876dd)
- **deps:** update super-linter/super-linter action to v8.3.0 (#556) (11e3261)
- **deps:** update swatinem/rust-cache action to v2.8.2 (#543) (2b307c4)
- **deps:** update dependency pytest to v9 (#486) (ea7da93)
- **deps:** update dependency pillow to v12 (#485) (c52f847)
- **deps:** update actions/setup-python action (fbc1f7a)
- **deps:** update dependency node to v24 (1fd39de)
- **deps:** update nginx docker tag to v1.29 (#478) (4b1aa6a)
- **deps:** update actions/github-script action to v8 (42895fe)
- **deps:** update actions/checkout action to v6 (fd9f2c6)
- **deps:** update dependency node to v22.21.1 (e82cddf)
- **deps:** update pgo docker tag to v5.8.5 (d006c10)
- **deps:** update actions/github-script action to v7.1.0 (#473) (adf9ea2)
- **deps:** update rust crate tokio-postgres to 0.7.15 (51678f6)
- **deps:** update rust crate tokio to 1.48.0 (71a2433)
- **deps:** update rust crate serde_json to 1.0.145 (5087cfa)
- **deps:** update rust crate secrecy to 0.10.3 (2aee077)
- **deps:** update rust crate postgres-native-tls to 0.5.2 (9675e33)
- **deps:** update rust crate serde_yaml to 0.9.34 (5ffb0cf)
- **deps:** update actions/checkout action to v5.0.1 (69723ca)
- **deps:** update rust crate thiserror to 2.0.17 (1161023)
- **deps:** update rust crate reqwest to 0.12.24 (29b3a56)
- **deps:** update rust crate rand to 0.9.2 (e97ead2)
- **deps:** update rust crate passwords to 3.1.16 (4a20a1e)
- **deps:** update rust crate native-tls to 0.2.14 (4690c67)
- **deps:** update rust crate log to 0.4.28 (4a54729)
- **deps:** update rust crate http-body-util to 0.1.3 (#455) (edcfb24)
- **deps:** update rust crate http to 1.4.0 (#457) (dacc74b)
- **deps:** update rust crate hex to 0.4.3 (#453) (50efbf7)
- **deps:** update replicated docker tag to v1.11.2 (#450) (d1876a9)
- **deps:** update rust crate futures to 0.3.31 (#452) (fa611ca)
- **deps:** update aws-actions/configure-aws-credentials action to v5.1.1 (eefc71c)
- **deps:** update rust crate base64 to 0.22.1 (#451) (c87080d)
- **deps:** update dependency pytest-playwright to >=0.7.2 (651637e)
- **deps:** update slackapi/slack-github-action digest to 26d9f0a (#445) (7bbd4b4)
- **deps:** bump deps with cargo update (10e0c34)
- **deps:** update actions/checkout action to v5.0.1 (#446) (35f52e6)
- **deps:** let renovate take over actions updates from dependabot (2b93eac)
- **deps:** update django, assurance, and diode plugins (7a8958c)
- **deps:** bump peter-evans/create-pull-request from 7.0.8 to 7.0.9 (f10d682)
- **deps:** bump useblacksmith/setup-docker-builder from 1.1.0 to 1.2.0 (3027245)
- **deps:** bump dtolnay/rust-toolchain (4c62c44)
- **deps:** update dependency netboxlabs-diode-netbox-plugin to ~=1.5.1 (#423) (1cc07d1)
- **deps:** update rust create ipnetwork to dev release with schemars1 support (e873a64)
- **deps:** update rust crate k8s-openapi to 0.26.0 (dba3976)
- **deps:** update rust crate schemars to v1 (8a1379a)
- **deps:** update rust crate kube-derive to v2 (77730fd)
- **deps:** update rust crate clap to 4.5.53 (43e8a6e)
- **deps:** update rust crate typed-builder to 0.23.2 (#416) (9136155)
- **deps:** update rust crate clap to 4.5.52 (#409) (e2f7000)
- **deps:** update rust crate typed-builder to 0.23.1 (#403) (32618d8)
- **deps:** bump bridgecrewio/checkov-action (1ce0493)
- **deps:** update rust crate axum to 0.8.7 (#402) (51c1544)
- **deps:** update rust crate bytes to 1.11.0 (#400) (cfbc9f6)
- **deps:** update replicated docker tag to v1.11.1 (6d9b7de)
- **deps:** update rancher/kubectl docker tag to v1.34.2 (#399) (11d109f)
- **deps:** bump useblacksmith/setup-docker-builder (fe787a1)
- **deps:** update rust crate hyper to 1.8.1 (3622963)
- **deps:** update dependency protobuf to >=6.33.1 (d776c97)
- **deps:** update rust crate rsa to 0.9.9 (302e182)
- **deps:** bump bridgecrewio/checkov-action (eb1aad1)
- **deps:** update dependency playwright to >=1.56.0 (ff36330)
- **deps:** update rust crate hyper to 1.8.0 (86c50fc)
- **deps:** update dependency certifi to >=2025.11.12 (4e22e36)
- **deps:** update dependency xmlsec to >=1.3.17 (160ba65)
- **deps:** bump bridgecrewio/checkov-action (b9700f6)
- **deps:** bump dtolnay/rust-toolchain (f1a2f58)
- **deps:** update rust crate sha2 to 0.10.9 (#378) (cd3a590)
- **deps:** update rust crate rsa to 0.9.8 (#377) (948cac6)
- **deps:** update rust crate pem to 3.0.6 (#375) (69642d2)
- **deps:** update rust crate md-5 to 0.10.6 (#374) (60436f5)
- **deps:** update pgo docker tag to v5.8.4 (#272) (3bfbf2a)
- **deps:** bump docker/setup-qemu-action from 3.6.0 to 3.7.0 (cacd282)
- **deps:** bump helm/chart-testing-action from 2.7.0 to 2.8.0 (ad5712a)
- **deps:** update helm release reloader to v2.2.5 (7ecd402)
- **deps:** update replicated docker tag to v1.11.0 (d1e1f1f)
- **deps:** update dependency brotli to >=1.2.0 (279071f)
- **deps:** update rust crate chrono to 0.4.42 (569c1fd)
- **deps:** bump useblacksmith/setup-docker-builder (b830043)
- **deps:** bump bridgecrewio/checkov-action (90cd780)
- **deps:** bump docker/metadata-action from 5.8.0 to 5.10.0 (a0566c1)
- **deps:** bump docker/build-push-action from 6.10.0 to 6.18.0 (e74b9eb)
- **deps:** update helm release reloader to v2.2.4 (0a2359d)
- **deps:** bump docker/metadata-action from 5.5.1 to 5.8.0 (4c3807c)
- **deps:** bump bridgecrewio/checkov-action (daf45f5)
- **deps:** bump jfrog/setup-jfrog-cli from 4.8.0 to 4.8.1 (5964f59)
- **deps:** update rust docker tag to v1.91 (11abece)
- **deps:** update dependency netboxlabs-diode-netbox-plugin to ~=1.5.0 (b4563f7)
- **deps:** bump actions/upload-artifact from 4 to 5 (2fd5d52)
- **deps:** bump actions/download-artifact from 5.0.0 to 6.0.0 (e7e6189)
- **deps:** bump actions/checkout from 4 to 5 (d290874)
- **deps:** bump slackapi/slack-github-action from 1.27.0 to 2.1.1 (0a258b1)
- **deps:** update dependency paramiko to v4 (1e8ac63)
- **deps:** update dependency requests to >=2.32.5 (a810f72)
- **deps:** update dependency python-dotenv to >=1.2.1 (2f3b5cc)
- **deps:** update replicated docker tag to v1.10.0 (aa0250b)
- **deps:** update dependency pytest-playwright to >=0.7.1 (19d4201)
- **deps:** update dependency paramiko to >=3.5.1 (fef905f)
- **docker:** skip restricted and multiverse in ubuntu updates (1799975)
- **docker:** sync build.sh assurance plugin with manifest (8c17e0b)
- **release:** bump version to 1.12.5, diode chart to 1.10.0 (5d96905)
- **renovate:** implement 7-day cooldown for dep updates (8dd6e49)
- **renovate:** let renovate update github actions instead of dependabot (843fbc9)
- **renovate:** group kubernetes packages (2e7a633)
- **renovate:** add release/* to renovate watch branches (df1faff)

#### Versions

This release uses the following upstream software:

- NetBox 4.3.7
- Redis 7.4.3 (if built-in Redis is enabled)
- PostgreSQL 16.11 (if built-in database is enabled)
- Diode 1.11.0
- Diode Pro 1.11.0

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| netbox-acls | netbox_acls | 1.9.1 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.16.1 | ☑︎ |
| netbox-documents | netbox_documents | 0.7.4 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.7.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.7 | ☐ |
| netbox-inventory | netbox_inventory | 2.4.0 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.6 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.3.5 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.18 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.4 | ☑︎ |
| netbox-secrets | netbox_secrets | 2.3.4 | ☑︎ |
| netbox-topology-views | netbox_topology_views | 4.3.0 | ☑︎ |
| netbox-validity | validity | 3.3.2 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 1.6.0 | ☑︎ |
| netboxlabs-netbox-assurance-plugin | netbox_assurance | 1.3.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.6.2 | ☑︎ |
| netboxlabs-netbox-changes | netbox_changes | 0.3.0 | ☑︎ |
| slurpit_netbox | slurpit_netbox | 1.1.44 | ☑︎ |

## NetBox Enterprise 1.12.x

### 1.12.4

This is a small update over 1.12.3, containing a few security and plugin updates.

#### Versions

This release uses the following upstream software:

- NetBox 4.3.7
- Redis 7.4.3 (if built-in Redis is enabled)
- PostgreSQL 16.10 (if built-in database is enabled)
- Diode 1.8.1
- Diode Pro 1.8.1

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| netbox-acls | netbox_acls | 1.9.1 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.16.1 | ☑︎ |
| netbox-documents | netbox_documents | 0.7.4 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.7.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.7 | ☐ |
| netbox-inventory | netbox_inventory | 2.4.0 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.6 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.3.5 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.18 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.4 | ☑︎ |
| netbox-secrets | netbox_secrets | 2.3.4 | ☑︎ |
| netbox-topology-views | netbox_topology_views | 4.3.0 | ☑︎ |
| netbox-validity | validity | 3.3.2 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 1.5.0 | ☑︎ |
| netboxlabs-netbox-assurance-plugin | netbox_assurance | 1.2.1 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.6.2 | ☑︎ |
| netboxlabs-netbox-changes | netbox_changes | 0.3.0 | ☑︎ |
| slurpit_netbox | slurpit_netbox | 1.1.44 | ☑︎ |

### 1.12.3

This update contains a number of bug fixes and a few small features, most notably improvements to Disaster Recovery for embedded cluster installs.
It also upgrades Diode and Diode Pro to version 1.8.1, and includes several other plugin updates.

#### Features

- **backups:** include PGO CRDs so they're available on restore (d135a9e)
- **docs:** replace conventional-changelog with cocogitto (b00d64b)
- **netbox:** increase RSS feed timeout, make configurable (f049984)

#### Bug Fixes

- **backups:** tell velero to back up (some) cluster resources (696de3e)
- **backups:** tag the filter file as a velero resource (b355957)
- **backups:** resources needs to be in the same namespace as velero (b3ebf08)
- **backups:** add missing namespace to the backup file (9b6599b)
- **backups:** filter unnecessary ephemeral volumes (b4ae133)
- **cluster:** normalize proxied images + JFrog URLs (d13deb4)
- **cluster:** add embedded cluster registry to pull secrets (0cf60b0)
- **database:** make sure node count propagates to postgresql config (65baec9)
- **diode:** make sure all config fields are initialized (1a206eb)
- **docs:** remove author from commits as well (bfb5c08)
- **docs:** skip date in CHANGELOG header (1cf165e)

#### Build Updates

- **deps:** update replicated docker tag to v1.9.0 (454290a)
- **deps:** update netboxlabs-diode-netbox-plugin to ~=1.4.1 and netboxlabs-netbox-assurance-plugin to ~=1.2.1 (63cf501)
- **deps:** update helm release diode to v1.8.1 (dbce017)
- **deps:** update dependency netboxlabs-diode-netbox-plugin to ~=1.4.0 (49ac529)
- update diode_reconciler_pro_image to version 1.8.1 (041b990)

#### Versions

This release uses the following upstream software:

- NetBox 4.3.7
- Redis 7.4.3 (if built-in Redis is enabled)
- PostgreSQL 16.10 (if built-in database is enabled)
- Diode 1.8.1
- Diode Pro 1.8.1

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| netbox-acls | netbox_acls | 1.9.1 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.16.1 | ☑︎ |
| netbox-documents | netbox_documents | 0.7.4 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.7.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.7 | ☐ |
| netbox-inventory | netbox_inventory | 2.4.0 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.6 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.3.5 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.18 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.4 | ☑︎ |
| netbox-secrets | netbox_secrets | 2.3.4 | ☑︎ |
| netbox-topology-views | netbox_topology_views | 4.3.0 | ☑︎ |
| netbox-validity | validity | 3.2.0 | ☐ |
| netboxlabs-netbox-assurance-plugin | netbox_assurance | 1.2.1 | ☑︎ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 1.4.1 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.6.2 | ☑︎ |
| netboxlabs-netbox-changes | netbox_changes | 0.3.0 | ☑︎ |
| slurpit_netbox | slurpit_netbox | 1.1.44 | ☑︎ |

### 1.12.2

This update contains a number of bug fixes and improvements.
Most notably, it improves support for custom TLS certificates, fixes issues with custom script uploading, and fixes custom environment quoting issues.
It also contains some other small internal changes, as well as improvements to the build process.

#### Bug Fixes

- **backups:** explicitly tag user-data for backup (NBE-375)
- **cluster:** clean up isolated links for bundle generation
- **cluster:** clean up whitespace and unnecessary backup labels
- **cluster:** extra bounds-checking on redis wait
- **cluster:** postgresql is not actually ready until service is published
- **cluster:** update images to point to our jfrog repo
- **diode:** enable postgresql SSL when applicable (NBE-393)
- **docker:** switch to rancher kubectl binary
- **isolated:** do not enable redis metrics for now
- **isolated:** fix diode image overrides (NBE-354)
- **netbox:** normalize environment quoting/escaping (NBE-351)
- **netbox:** read-write scripts on core pod (ENGHLP-527)
- **netbox:** refactor volume mounts
- **test:** extend smoke test timeout

#### Features

- **backups:** configure newer-style disaster recovery resources
- **backups:** split backup yaml into backup/restore
- **backups:** tell velero to backup all volumes by default
- **cluster:** check for unmerged branches before upgrading
- **cluster:** make sure imagePullSecrets are explicitly set in values
- **database:** add sslmode=prefer to generated URIs
- **diode:** enable postgresql SSL when applicable (NBE-393)
- **docker:** add packages to match oryd/k8s-toolbox
- **docker:** fetch ghcr images from jfrog proxy
- **docker:** parameterize cache dir
- **docker:** refactor build scripts, separate python lxml/xmlsec build
- **netbox:** add option for applying extra certs to the netbox pods
- **netbox:** put custom certs into the system CA store (NBE-373)
- **netbox:** update init schema to 4.3.7

#### Versions

This release uses the following upstream software:

- NetBox 4.3.7
- Redis 7.4.3 (if built-in Redis is enabled)
- PostgreSQL 16.10 (if built-in database is enabled)
- Diode 1.5.0
- Diode Pro 1.6.0

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| netbox-acls | netbox_acls | 1.9.1 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.16.1 | ☑︎ |
| netbox-documents | netbox_documents | 0.7.4 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.7.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.7 | ☐ |
| netbox-inventory | netbox_inventory | 2.4.0 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.6 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.3.5 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.18 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.4 | ☑︎ |
| netbox-secrets | netbox_secrets | 2.3.4 | ☑︎ |
| netbox-topology-views | netbox_topology_views | 4.3.0 | ☑︎ |
| netbox-validity | validity | 3.2.0 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 1.4.0 | ☑︎ |
| netboxlabs-netbox-assurance-plugin | netbox_assurance | 1.2.1 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.6.2 | ☑︎ |
| netboxlabs-netbox-changes | netbox_changes | 0.3.0 | ☑︎ |
| slurpit_netbox | slurpit_netbox | 1.1.44 | ☑︎ |

### 1.12.1

This is a minor update over 1.12.0, containing several bug fixes and small improvements.
Most notable is a fix to tempdir handling in the branching plugin, a minor PostgreSQL upgrade, and an update to NetBox 4.3.7.

#### Bug Fixes

- *cluster:* add prometheus volume mount for worker and housekeeping
- *cluster:* conditionally include netbox-enterprise-worker in statusInformers based on restore_mode
- *cluster:* fetch kubectl latest stable rather than pulling from a docker image
- *cluster:* override redis sentinel and perms images correctly
- *cluster:* skip redis ping when environment not configured
- *database:* rework postgresql check to honor PG* env vars
- *docker:* always pull upstream images before building
- *netbox:* remove ipv6 checkbox and config entirely, ipv4 only inside cluster NBE-334
- *netbox:* set resourcesPreset via kots for netbox downstream containers NBE-337

#### Features

- *cluster:* additional resource-waiting for worker and housekeeping
- *cluster:* NBE-302: Upgrade Embedded Cluster
- *cluster:* update housekeeping job to retrigger and clean up old jobs
- *database:* add wait-for-* scripts suitable for init containers
- *netbox:* bump to 4.3.7

#### Versions

This release uses the following upstream software:

- NetBox 4.3.7
- Redis 7.4.3 (if built-in Redis is enabled)
- PostgreSQL 16.10 (if built-in database is enabled)
- Diode 1.5.0
- Diode Pro 1.6.0

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| netbox-acls | netbox_acls | 1.9.1 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.16.0 | ☑︎ |
| netbox-documents | netbox_documents | 0.7.3 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.7.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.7 | ☐ |
| netbox-inventory | netbox_inventory | 2.4.0 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.6 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.3.5 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.18 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.4 | ☑︎ |
| netbox-secrets | netbox_secrets | 2.3.0 | ☑︎ |
| netbox-topology-views | netbox_topology_views | 4.3.0 | ☑︎ |
| netbox-validity | validity | 3.2.0 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 1.3.1 | ☑︎ |
| netboxlabs-netbox-assurance-plugin | netbox_assurance | 1.2.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.6.2 | ☑︎ |
| netboxlabs-netbox-changes | netbox_changes | 0.3.0 | ☑︎ |
| slurpit_netbox | slurpit_netbox | 1.1.44 | ☑︎ |

### 1.12.0

This is a major update in the NetBox Enterprise series, bringing a number of user-facing features and improvements as well as many under-the-hood changes to improve stability and performance and to facilitate future development.

Notable updates include:

- Upgraded NetBox to version 4.3.
- Updated several plugins to their latest versions.
- Embedded Cluster users will get a number of core improvements including better support for running in various types of restrictive environments.
- Cleaned up internal networking-related code.  Manual settings for IPv4-only environments are no longer necessary.
- Many internal refactorings and cleanups targeting future feature development.
- Fixed an issue where the presence of a single quote character in the superuser password could cause NBE to fail.

#### Versions

This release uses the following upstream software:

- NetBox 4.3.2
- Redis 7.4.3 (if built-in Redis is enabled)
- PostgreSQL 16.9 (if built-in database is enabled)
- Diode 1.5.0
- Diode Pro 1.6.0

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| netbox-acls | netbox_acls | 1.9.1 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.16.0 | ☑︎ |
| netbox-documents | netbox_documents | 0.7.3 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.7.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.7 | ☐ |
| netbox-inventory | netbox_inventory | 2.4.0 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.6 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.3.5 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.18 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.4 | ☑︎ |
| netbox-secrets | netbox_secrets | 2.3.0 | ☑︎ |
| netbox-topology-views | netbox_topology_views | 4.3.0 | ☑︎ |
| netbox-validity | validity | 3.2.0 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 1.3.1 | ☑︎ |
| netboxlabs-netbox-assurance-plugin | netbox_assurance | 1.2.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.6.2 | ☑︎ |
| netboxlabs-netbox-changes | netbox_changes | 0.3.0 | ☑︎ |
| slurpit_netbox | slurpit_netbox | 1.1.44 | ☑︎ |

## NetBox Enterprise 1.10.x

### 1.10.7

This is a rerelease of 1.10.6 to update the Diode
plugin to 1.3.1 to avoid model tags which can conflict
with other plugins.

No other changes were made.

#### Versions

This release uses the following upstream software:

- NetBox 4.2.9
- Redis 7.4.3 (if built-in Redis is enabled)
- PostgreSQL 16.8 (if built-in database is enabled)
- Diode 1.5.0
- Diode Pro 1.6.0

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| netbox-acls | netbox_acls | 1.8.1 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.15.0 | ☑︎ |
| netbox-documents | netbox_documents | 0.7.2 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.6.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.6 | ☐ |
| netbox-inventory | netbox_inventory | 2.3.0 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.5 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.2.6 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.17 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.2.0 | ☑︎ |
| netbox-topology-views | netbox_topology_views | 4.2.1 | ☑︎ |
| netbox-validity | validity | 3.1.3 | ☐ |
| netboxlabs-diode-assurance-plugin | netbox_assurance_plugin | 1.2.0 | ☑︎ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 1.3.1 | ☑︎ |
| netboxlabs-netbox-changes | netbox_changes | 0.3.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.7 | ☑︎ |
| slurpit_netbox | slurpit_netbox | 1.1.13 | ☑︎ |

### 1.10.6

This release contains a few small fixes to handle
upgrades from much older releases, plus support for
toggling whether to auto-apply in Diode.

#### Bug Fixes

- *cluster:* check permissions before calling kubectl
- *cluster:* don't wait for secrets to mount
- *cluster:* fetch secrets without writing to tmp
- *cluster:* hooks on secrets can cause them to not deploy
- *cluster:* only validate built-in db
- *cluster:* parameterize psql cli arguments
- *cluster:* postgresql lib should source common lib
- *cluster:* remove generated hook name portion
- *cluster:* wait for postgresql before validating
- *cluster:* wait function should re-enable set -e on success
- *database:* fix configmap definition
- *database:* psql var interpolation does not happen in -c
- *database:* query a count when checking databases
- *database:* query a count when checking roles

#### Features

- *cluster:* check dbs on upgrade, create if needed
- *cluster:* export namespace env for scripts
- *cluster:* kots diode config section w/ auto apply option NBE-312
- *cluster:* make admin available for post-upgrade script
- *cluster:* wait for internal db cluster resource to be ready
- *database:* also wait for the postgres user to be ready

#### Versions

This release uses the following upstream software:

- NetBox 4.2.9
- Redis 7.4.3 (if built-in Redis is enabled)
- PostgreSQL 16.8 (if built-in database is enabled)
- Diode 1.5.0
- Diode Pro 1.6.0

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| netbox-acls | netbox_acls | 1.8.1 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.15.0 | ☑︎ |
| netbox-documents | netbox_documents | 0.7.2 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.6.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.6 | ☐ |
| netbox-inventory | netbox_inventory | 2.3.0 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.5 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.2.6 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.17 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.2.0 | ☑︎ |
| netbox-topology-views | netbox_topology_views | 4.2.1 | ☑︎ |
| netbox-validity | validity | 3.1.3 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 1.3.0 | ☑︎ |
| netboxlabs-diode-assurance-plugin | netbox_assurance_plugin | 1.2.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.7 | ☑︎ |
| netboxlabs-netbox-changes | netbox_changes | 0.3.0 | ☑︎ |
| slurpit_netbox | slurpit_netbox | 1.1.13 | ☑︎ |

### 1.10.5

This release primarily consists of some internal
build system improvements, plus support for the latest
version of Diode and Assurance.  This Assurance update
includes deduplication support for licensed installs.

#### Bug Fixes

- *cluster:* backport job cleanup from 1.12
- *cluster:* fix missing diode local image refs (NBE-288)
- *cluster:* get rid of duplicate mount names
- *cluster:* make sure diode pro image is included in additionalImages
- *cluster:* make sure ipv4/ipv6 config overrides default values.yaml
- *cluster:* make sure webhook patch does not run
- *cluster:* switch bitnami images to use updated registry
- *cluster:* update diode ingress values for 1.7.0 chart
- *database:* sanitize table count var for whitespace
- *diode:* explicitly enable hydra
- *ingress:* fix ingress replacement on upgrade
- *netbox:* extend migration lock to 5 minutes
- *netbox:* remove broken config_diff plugin from runtime image
- *netbox:* replace nb-docker entrypoint with our own
- *netbox:* wait a bit for reloader to settle

#### Features

- *cluster:* add extra metadata to reload checksum
- *cluster:* add reloader config to diode global annotations
- *cluster:* backport sequence helper from 1.11
- *cluster:* give reloader a short pause-period so they happen only once
- *diode:* bump diode chart to 1.6.2 (diode 1.5.0)
- *diode:* bump reconciler to 1.6.0
- *docker:* bump version for plugin updates
- *netbox:* enable branching+changes in isolated installs
- *netbox:* simplify custom plugin config, use new user-packages dir

#### Performance Improvements

- *netbox:* threading config improvements

#### Versions

This release uses the following upstream software:

- NetBox 4.2.9
- Redis 7.4.3 (if built-in Redis is enabled)
- PostgreSQL 16.8 (if built-in database is enabled)
- Diode 1.5.0
- Diode Pro 1.6.0

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| netbox-acls | netbox_acls | 1.8.1 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.15.0 | ☑︎ |
| netbox-documents | netbox_documents | 0.7.2 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.6.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.6 | ☐ |
| netbox-inventory | netbox_inventory | 2.3.0 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.5 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.2.6 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.17 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.2.0 | ☑︎ |
| netbox-topology-views | netbox_topology_views | 4.2.1 | ☑︎ |
| netbox-validity | validity | 3.1.3 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 1.3.0 | ☑︎ |
| netboxlabs-diode-assurance-plugin | netbox_assurance_plugin | 1.2.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.7 | ☑︎ |
| netboxlabs-netbox-changes | netbox_changes | 0.3.0 | ☑︎ |
| slurpit_netbox | slurpit_netbox | 1.1.13 | ☑︎ |


### 1.10.4

Bug fixes for isolated/proxy environments, plus a few
other small enhancements to make upgrades go more smoothly.

NOTE: This release also removes the `netbox-config-diff`
plugin from the base image, as it conflicts with other plugins
at runtime when enabled.

#### Bug Fixes

- *cluster:* fix missing diode local image refs (NBE-288)
- *cluster:* get rid of duplicate mount names
- *cluster:* make sure diode pro image is included in additionalImages
- *cluster:* make sure ipv4/ipv6 config overrides default values.yaml
- *cluster:* make sure webhook patch does not run
- *database:* sanitize table count var for whitespace
- *netbox:* extend migration lock to 5 minutes
- *netbox:* remove broken config_diff plugin from runtime image
- *netbox:* replace nb-docker entrypoint with our own

#### Features

- *cluster:* add extra metadata to reload checksum
- *cluster:* add reloader config to diode global annotations
- *cluster:* backport sequence helper from 1.11
- *cluster:* give reloader a short pause-period so they happen only once
- *netbox:* enable branching+changes in isolated installs
- *netbox:* simplify custom plugin config, use new user-packages dir

#### Versions

This release uses the following upstream software:

- NetBox 4.2.9
- Redis 7.4.3 (if built-in Redis is enabled)
- PostgreSQL 16.8 (if built-in database is enabled)
- Diode 1.2.0

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| netbox-acls | netbox_acls | 1.8.1 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.15.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.9.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.2 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.6.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.6 | ☐ |
| netbox-inventory | netbox_inventory | 2.3.0 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.5 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.2.6 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.17 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.2.0 | ☑︎ |
| netbox-topology-views | netbox_topology_views | 4.2.1 | ☑︎ |
| netbox-validity | validity | 3.1.3 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 1.2.1 | ☑︎ |
| netboxlabs-diode-assurance-plugin | netbox_assurance_plugin | 1.0.1 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.7 | ☑︎ |
| netboxlabs-netbox-changes | netbox_changes | 0.3.0 | ☑︎ |
| slurpit_netbox | slurpit_netbox | 1.1.13 | ☑︎ |

### 1.10.3

Contains a few small bug fixes and enhancements, including
reducing the memory footprint of individual NetBox pods and
configurable worker replicas, faster initialization on startup,
and a new news feed for NBE-specific announcements.

#### Bug Fixes

- *diode:* make hydra automigration run during init
- *diode:* make sure hydra automigrate always runs
- *netbox:* always (re)apply custom plugin code if wheelhouse exists
- *netbox:* escape password in db pre-init
- *netbox:* update feed URL for Enterprise News config
- *netbox:* we need 2 threads for background processing

#### Features

- *chart:* add scripts for running migration atomically
- *chart:* add utility scripts for logging and redis checks
- *chart:* use new migration scripts in initContainers
- *cluster:* bump to nbe-utils 7, add to VERSION file
- *cluster:* limit unavailable pods during rolling update
- *cluster:* set nbe-utils version during build
- *cluster:* set tag as part of build instead of in source
- *cluster:* support file resources in configmap
- *config:* make worker replicas configurable
- *config:* update install to list available features
- *docker:* bump version to include new utilities
- *netbox:* add RSS feed widget for Enterprise News in configmap
- *netbox:* bump default netbox resource memory a tad
- *netbox:* max 1 unit thread per pod
- *netbox:* move unit config to values yaml
- *netbox:* pre-initialize database
- *netbox:* remove commandbar

#### Versions

This release uses the following upstream software:

- NetBox 4.2.9
- Redis 7.4.3 (if built-in Redis is enabled)
- PostgreSQL 16.8 (if built-in database is enabled)
- Diode 1.2.0

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| netbox-acls | netbox_acls | 1.8.1 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.15.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.9.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.2 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.6.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.6 | ☐ |
| netbox-inventory | netbox_inventory | 2.3.0 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.5 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.2.6 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.17 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.2.0 | ☑︎ |
| netbox-topology-views | netbox_topology_views | 4.2.1 | ☑︎ |
| netbox-validity | validity | 3.1.3 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 1.2.1 | ☑︎ |
| netboxlabs-diode-assurance-plugin | netbox_assurance_plugin | 1.0.1 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.7 | ☑︎ |
| netboxlabs-netbox-changes | netbox_changes | 0.3.0 | ☑︎ |
| slurpit_netbox | slurpit_netbox | 1.1.13 | ☑︎ |

### 1.10.1/1.10.2

Minor releases to fix a number of issues with Diode
and Assurance integration.

#### Bug Fixes

- **db:** move postgresql permissions-setting to an init
- **diode:** backport runtime-secret script from 1.11
- **netbox:** make sure netbox refreshes when override hostname changes
- **redis:** remove redis modules no longer needed for diode

#### Features

- **config:** add hostname override to the KOTS config
- **config:** show Diode/Assurance license status in KOTS UI
- **diode:** add deployments and services for diode components in replicated-app.yaml

#### Versions

This release uses the following upstream software:

- NetBox 4.2.9
- Redis 7.4.2 (if built-in Redis is enabled)
- PostgreSQL 16.8 (if built-in database is enabled)
- Diode 1.2.0

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| netbox-acls | netbox_acls | 1.8.1 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.15.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.9.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.2 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.6.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.6 | ☐ |
| netbox-inventory | netbox_inventory | 2.3.0 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.5 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.2.6 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.17 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.2.0 | ☑︎ |
| netbox-topology-views | netbox_topology_views | 4.2.1 | ☑︎ |
| netbox-validity | validity | 3.1.3 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 1.1.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.6 | ☑︎ |
| slurpit_netbox | slurpit_netbox | 1.1.13 | ☑︎ |

### 1.10.0

This in the first release to include Diode and the
NetBox Assurance plugin.

#### Features

- *cluster:* import basic diode chart
- *cluster:* only pull images if necessary
- *diode:* add diode chart dependency and enable configuration
- *diode:* add diode reconciler and ingester configuration to netbox enterprise chart
- *diode:* add proxy to diode image pull
- *diode:* auto-configure diode plugin in netbox config
- *diode:* always update the host secret
- *diode:* bump assurance plugin to 1.0.1
- *diode:* change diode/hydra to use NBE PostgreSQL
- *diode:* configure plugin based on ingress hostname
- *diode:* don't auto-apply changesets if assurance is enabled
- *diode:* generate a secret containing the external host reliably
- *diode:* wait for backend to be running before configuring the diode plugin
- *docker:* switch chart to use production (1.20.0) nbe image

#### Versions

This release uses the following upstream software:

- NetBox 4.2.9
- Redis 7.4.2 (if built-in Redis is enabled)
- PostgreSQL 16.8 (if built-in database is enabled)
- Diode 1.2.0

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| netbox-acls | netbox_acls | 1.8.1 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.15.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.9.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.2 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.6.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.6 | ☐ |
| netbox-inventory | netbox_inventory | 2.3.0 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.5 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.2.6 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.17 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.2.0 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.2.1 | ☑︎ |
| netbox-validity | validity | 3.1.3 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 1.0.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.4 | ☑︎ |
| slurpit_netbox | slurpit_netbox | 1.1.13 | ☑︎ |

## NetBox Enterprise 1.9.x

### 1.9.3

Fix a bug that caused failure to download resources
in airgap and proxied environments. Also includes
an updated Branching plugin that fixes a number of
bugs.

#### Bug Fixes

- *cluster:* clean up proxy references for dependencies

#### Versions

This release uses the following upstream software:

- NetBox 4.2.9
- Redis 7.4.2 (if built-in Redis is enabled)
- PostgreSQL 16.8 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| netbox-acls | netbox_acls | 1.8.1 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.15.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.9.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.2 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.6.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.6 | ☐ |
| netbox-inventory | netbox_inventory | 2.3.0 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.5 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.2.6 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.17 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.2.0 | ☑︎ |
| netbox-topology-views | netbox_topology_views | 4.2.1 | ☑︎ |
| netbox-validity | validity | 3.1.3 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 1.1.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.6 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.1.13 | ☑︎ |

### 1.9.2

Updates NetBox to 4.2.9, plus includes an update to
the cluster software which improves the handling of
upgrades.

NOTE: This update will upgrade NetBox to 4.2.9.
If you have custom plugins installed, you will need
to upgrade to NetBox Enterprise 1.9.2 and then create
a new wheelhouse that contains plugins compatible
with 4.2.9.

Please review the [upstream NetBox release
notes](https://github.com/netbox-community/netbox/releases)
from your current version through 4.2.9 for a
complete list of breaking changes, enhancements,
and bug fixes.

#### Features

- **cluster:** bump to 2.4.0
- **netbox:** bump to NetBox 4.2.9

#### Versions

This release uses the following upstream software:
- NetBox 4.2.9
- Redis 7.4.2 (if built-in Redis is enabled)
- PostgreSQL 16.8 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| netbox-acls | netbox_acls | 1.8.1 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.15.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.9.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.1 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.6.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.6 | ☐ |
| netbox-inventory | netbox_inventory | 2.3.0 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.5 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.2.6 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.17 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.2.0 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.2.1 | ☑︎ |
| netbox-validity | validity | 3.1.3 | ☐ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.4 | ☑︎ |
| slurpit_netbox | slurpit_netbox | 1.1.13 | ☑︎ |

### 1.9.1

A minor release that contains build process updates
under the covers, plus the Python XML fixes introduced
in NetBox Enterprise 1.8.6.

#### Versions

This release uses the following upstream software:
- NetBox 4.2.6
- Redis 7.4.2 (if built-in Redis is enabled)
- PostgreSQL 16.8 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| netbox-acls | netbox_acls | 1.8.1 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.15.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.9.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.1 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.6.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.6 | ☐ |
| netbox-inventory | netbox_inventory | 2.3.0 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.5 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.2.6 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.17 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.2.0 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.2.1 | ☑︎ |
| netbox-validity | validity | 3.1.3 | ☐ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.4 | ☑︎ |
| slurpit_netbox | slurpit_netbox | 1.1.13 | ☑︎ |

### 1.9.0

Updates the embedded NetBox to 4.2.6. Also upgrades
a number of dependencies to their latest versions,
adds some extra system consistency validation checks,
and reduces the number of proxied domains necessary to
install NetBox Enterprise.

#### Bug Fixes

- **netbox:** update to docker image with pydantic fix (NBE-185)
- add exit statements for better error handling in configmap-executable.yaml
- adjust formatting in cronjob-backup-labeler.yaml for consistency
- remove branch reference for command bar disabling from CI workflow and update Docker image tag
- remove unnecessary conditional for nodeSelector in cronjob-backup-labeler.yaml
- replace hardcoded imagePullPolicy with configurable value in cronjob-backup-labeler.yaml
- restore TTL and backoff limit in backup labeler CronJob configuration
- update Docker image tag to indicate command bar disabling
- update imagePullPolicy to 'IfNotPresent' in cronjob-backup-labeler.yaml
- update system validation query to use jq and change backup labeler image to netboxlabs/nbe-utils:latest
- update system validation query image version to netboxlabs/nbe-utils:1

#### Features

- add CronJob for netbox sidecar task to do system validation
- add system validation check CronJob with service account and role binding
- add TTL and backoff limit to backup labeler CronJob configuration
- **cluster:** add settings for the improved proxy support
- **cluster:** update to 2.3.1
- **config:** create some macros for nbe-utils and replace busybox
- **deps:** update pgo to 5.7.4, replicated-sdk to 1.5.0
- increase replicas for postgres instance to improve availability
- **netbox:** bump to netbox 4.2.6 and ensure versions are correct
- rename replicas_node_count to node_count for consistency in postgres configuration
- update backup labeler configuration with TTL and backoff limit
- update backup labeler to routines labeler and improve system validation error handling
- update dependencies in Chart.lock for netbox-enterprise
- update netbox sidecar CronJob to run every 5 minutes and improve error handling
- update postgres replica configuration to use dynamic node count

#### Versions

This release uses the following upstream software:
- NetBox 4.2.6
- Redis 7.4.2 (if built-in Redis is enabled)
- PostgreSQL 16.8 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| netbox-acls | netbox_acls | 1.8.1 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.15.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.9.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.1 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.6.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.6 | ☐ |
| netbox-inventory | netbox_inventory | 2.3.0 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.5 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.2.6 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.17 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.2.0 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.2.1 | ☑︎ |
| netbox-validity | validity | 3.1.3 | ☐ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.4 | ☑︎ |

## NetBox Enterprise 1.8.x

### 1.8.6

Contains a fix for mismatched XML modules used by
some 3rd-party plugins.

#### Bug Fixes

- *docker:* ignore low-priority trivy warning about KOTS dep
- *docker:* make sure lxml and xmlsec match (NBE-193)

#### Versions

This release uses the following upstream software:
- NetBox 4.1.11
- Redis 7.4.2 (if built-in database is enabled)
- PostgreSQL 16.8 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.3 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

### 1.8.5

Contains a fix for upgrades freezing in some situations.

#### Bug Fixes

- *cluster:* remove unnecessary repository entry in ingress-nginx config

#### Versions

This release uses the following upstream software:
- NetBox 4.1.11
- Redis 7.4.2 (if built-in database is enabled)
- PostgreSQL 16.8 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.3 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

### 1.8.4

Provides a number of updates to custom plugin
installation, as well as other small enhancements
and bug fixes, included in the 1.7.x series, most
notably the security fix for the `ingress-nginx`
controller (CVE-2025-1974).

#### Bug Fixes

- *cluster:* properly show "ready" in restore mode
- *cluster:* remove the admission controller from status checks
- *cluster:* repair some shellcheck issues, remove vestigial config
- *netbox:* a few small cosmetic fixes to plugin install
- *netbox:* improve plugin installation issues for custom tarballs

#### Versions

This release uses the following upstream software:
- NetBox 4.1.11
- Redis 7.4.2 (if built-in database is enabled)
- PostgreSQL 16.8 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.3 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

### 1.8.3

Provides a number of updates to custom plugin
installation, as well as other small enhancements
and bug fixes, included in the 1.7.x series, most
notably the security fix for the `ingress-nginx`
controller (CVE-2025-1974).

#### Bug Fixes

- *cluster:* properly show "ready" in restore mode
- *netbox:* a few small cosmetic fixes to plugin install
- repair some shellcheck issues, remove vestigial config

#### Features

- *cluster:* make a label to tag pods supporting upload

#### Versions

This release uses the following upstream software:
- NetBox 4.1.11
- Redis 7.4.2 (if built-in database is enabled)
- PostgreSQL 16.6 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.3 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

### 1.8.1

Fixes user creation, password validation, and group/SSO
issues in NetBox.

#### Bug Fixes

- *netbox:* use proper import location of the OWASP validator
- *docker:* fix nbce-common install, remove deprecated nbc_auth
- *docker:* make sure nbc_auth_extensions are in the right place

#### Versions

This release uses the following upstream software:
- NetBox 4.1.11
- Redis 7.4.2 (if built-in database is enabled)
- PostgreSQL 16.6 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.3 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

### 1.8.0

Improves logging in the NetBox containers, and adds support
for uploading custom plugins.

#### Bug Fixes

- *cluster:* fixed a few pod label macros
- *config:* feedback - use bash for extra script safety
- *config:* remove vestigial validation mount

#### Features

- *config:* adding log fixing branch to the CI workflow to create a release in Replicated
- *config:* allow uploading plugins for `pip install`

#### Versions

This release uses the following upstream software:
- NetBox 4.1.11
- Redis 7.4.2 (if built-in database is enabled)
- PostgreSQL 16.6 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.3 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

## NetBox Enterprise 1.7.x

### 1.7.6

Contains a fix for incorrect permissions in the media folder
after restore from backup.

#### Bug Fixes

- *cluster:* remove the admission controller from status checks
- *netbox:* make sure volume permissions are correct

#### Versions

This release uses the following upstream software:
- NetBox 4.1.11
- Redis 7.4.2 (if built-in database is enabled)
- PostgreSQL 16.8 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.3 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

### 1.7.5

Contains a security fix for the `ingress-nginx` controller
(CVE-2025-1974).

#### Bug Fixes

- *cluster:* disable ingress-nginx admission controller

#### Versions

This release uses the following upstream software:
- NetBox 4.1.11
- Redis 7.4.2 (if built-in database is enabled)
- PostgreSQL 16.6 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.2 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

### 1.7.4

Fix missing authentication plugins for group and SSO configs.

#### Bug Fixes

- *docker:* make sure nbc_auth_extensions are in the right place

#### Versions

This release uses the following upstream software:
- NetBox 4.1.11
- Redis 7.4.2 (if built-in database is enabled)
- PostgreSQL 16.6 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.3 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

### 1.7.3

Re-release of 1.7.2 with additional password validator fixes,
plus reverting to a previous working redis chart.

#### Bug Fixes

- *netbox:* use proper import location of the OWASP validator

#### Versions

This release uses the following upstream software:
- NetBox 4.1.11
- Redis 7.4.2 (if built-in database is enabled)
- PostgreSQL 16.6 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.3 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

### 1.7.2

Fixes a bug where the custom password validator was
missing.

#### Bug Fixes

- *docker:* fix nbce-common install, remove deprecated nbc_auth

#### Versions

This release uses the following upstream software:
- NetBox 4.1.11
- Redis 7.4.2 (if built-in database is enabled)
- PostgreSQL 16.6 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.3 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

### 1.7.1

Fixes a bug in downloading the ingress Helm chart when
using a proxy for installation.

#### Bug Fixes

- *cluster:* use the proxy to download the ingress chart

#### Versions

This release uses the following upstream software:
- NetBox 4.1.11
- Redis 7.4.2 (if built-in database is enabled)
- PostgreSQL 16.6 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.2 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

### 1.7.0

Updates the embedded NetBox to 4.1.11. Also upgrades
the cluster software, which brings many bug fixes and
features, including better preflight checks, and
a direct link to the NetBox UI from the admin console.

#### Features

- *cluster:* update to 1.19.0
- *cluster:* add a link to the NetBox UI from the admin console
- *deps:* update to NetBox 4.1.11 + latest NetBox chart

#### Versions

This release uses the following upstream software:
- NetBox 4.1.11
- Redis 7.4.2
- PostgreSQL 16.6 (if built-in database is enabled)

#### Plugins

The following plugins are included in this release:

| Plugin | Config Name | Version | Certified |
| ------ | ----------- | ------- | --------- |
| nbrisk | nb_risk | 41.0.1 | ☐ |
| netbox-acls | netbox_acls | 1.7.0 | ☑︎ |
| netbox-bgp | netbox_bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | netbox_config_diff | 2.8.0 | ☐ |
| netbox-documents | netbox_documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | netbox_floorplan | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | netbox_interface_synchronization | 4.1.4 | ☐ |
| netbox-inventory | netbox_inventory | 2.2.1 | ☐ |
| netbox-lifecycle | netbox_lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | netbox_dns | 1.1.7 | ☑︎ |
| netbox-qrcode | netbox_qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | netbox_reorder_rack | 1.1.3 | ☐ |
| netbox-secrets | netbox_secrets | 2.1.2 | ☐ |
| netbox-topology-views | netbox_topology_views | 4.1.0 | ☑︎ |
| netbox-validity | validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | netbox_diode_plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | netbox_branching | 0.5.2 | ☑︎ |
| phonebox-plugin | phonebox_plugin | 0.0.10 | ☐ |
| slurpit_netbox | slurpit_netbox | 1.0.45 | ☑︎ |

## NetBox Enterprise 1.6.x

### 1.6.5

Fixes a small bug that would cause the admin console to
improperly display an error on upgrade. Also updates
a few dependencies.

#### Bug Fixes

- *cluster:* move ingress back to `ingress-nginx` namespace

#### Features

- *deps:* bump to latest docker image + current plugins
- *deps:* update bitnami-common and netbox oss charts
- *netbox:* update to latest 4.0.x-compatible plugins

#### Plugins

The following plugins are included in this release:

| Plugin | Version | Certified |
| ------ | ------- | --------- |
| nbrisk | 41.0.1 | ☐ |
| netbox-acls | 1.7.0 | ☑︎ |
| netbox-bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | 2.7.0 | ☐ |
| netbox-documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | 4.1.4 | ☐ |
| netbox-inventory | 2.1.0 | ☐ |
| netbox-lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | 1.1.6 | ☑︎ |
| netbox-qrcode | 0.0.15 | ☑︎ |
| netbox-secrets | 2.1.0 | ☐ |
| netbox-topology-views | 4.1.0 | ☑︎ |
| netbox-validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | 0.5.2 | ☑︎ |
| phonebox-plugin | 0.0.10 | ☐ |
| slurpit_netbox | 1.0.43 | ☑︎ |

### 1.6.4

Disable unnecessary Redis persistence and redundant PostgreSQL backups,
plus fix an issue with file upload limits and missing static content
from enabled plugins.

NetBox Enterprise 1.6.4 includes NetBox 4.1.7, and is anticipated to
be a release candidate for stable.

#### Plugins

The following plugins are included in this release:

| Plugin | Version | Certified |
| ------ | ------- | --------- |
| nbrisk | 41.0.1 | ☐ |
| netbox-acls | 1.7.0 | ☑︎ |
| netbox-bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | 2.7.0 | ☐ |
| netbox-documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | 0.5.0 | ☑︎ |
| netbox-interface-synchronization | 4.1.4 | ☐ |
| netbox-inventory | 2.1.0 | ☐ |
| netbox-lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | 1.1.6 | ☑︎ |
| netbox-qrcode | 0.0.15 | ☑︎ |
| netbox-secrets | 2.1.0 | ☐ |
| netbox-topology-views | 4.1.0 | ☑︎ |
| netbox-validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | 0.6.0 | ☑︎ |
| netboxlabs-netbox-branching | 0.5.2 | ☑︎ |
| phonebox-plugin | 0.0.10 | ☐ |
| slurpit_netbox | 1.0.43 | ☑︎ |

### 1.6.3

Just a few small bug fixes, mostly related to internal changes.
Also contains dependency updates.


### 1.6.2

Primarily internal and build-related changes.
No new features.

### 1.6.1

Fixes a number of bugs related to file uploads and proxy environments.

### 1.6.0

Adds the changes plugin by default, and upgrades NetBox to 4.1.7.
Fixes some small bugs in plugin initialization and proxied installs.

## NetBox Enterprise 1.5.x

### 1.5.0

The 1.5.x series was released internally for development
testing of upgrades to NetBox 4.1 and branching plugin inclusion.

## NetBox Enterprise 1.4.x

### 1.4.2

A re-release of 1.4.1 with a fix that makes sure plugin versions
that are only compatible with NetBox 4.1 are not included.

#### Plugins

The following plugins are included in this release:

| Plugin | Version | Certified |
| ------ | ------- | --------- |
| nbrisk | 40.0.1 | ☐ |
| netbox-acls | 1.6.1 | ☐ |
| netbox-bgp | 0.13.3 | ☑︎ |
| netbox-config-diff | 2.7.0 | ☐ |
| netbox-documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | 0.4.1 | ☑︎ |
| netbox-interface-synchronization | 4.1.4 | ☐ |
| netbox-inventory | 2.0.2 | ☐ |
| netbox-lifecycle | 1.0.4 | ☐ |
| netbox-plugin-dns | 1.1.5 | ☑︎ |
| netbox-qrcode | 0.0.14 | ☑︎ |
| netbox-reorder-rack | 1.1.3 | ☐ |
| netbox-secrets | 2.0.3 | ☐ |
| netbox-topology-views | 4.0.1 | ☑︎ |
| netbox-validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | 0.3.0 | ☐ |
| phonebox-plugin | 0.0.9 | ☐ |
| slurpit_netbox | 0.9.84 | ☑︎ |

### 1.4.1

A small release with some dependency updates and the latest set
of NetBox 4.0-compatible plugins.

#### Plugins

The following plugins are included in this release:

| Plugin | Version | Certified |
| ------ | ------- | --------- |
| nbrisk | 41.0.1 | ☐ |
| netbox-acls | 1.7.0 | ☑︎ |
| netbox-bgp | 0.14.0 | ☑︎ |
| netbox-config-diff | 2.7.0 | ☐ |
| netbox-documents | 0.7.0 | ☐ |
| netbox-floorplan-plugin | 0.4.1 | ☑︎ |
| netbox-interface-synchronization | 4.1.4 | ☐ |
| netbox-inventory | 2.1.0 | ☐ |
| netbox-lifecycle | 1.1.3 | ☐ |
| netbox-plugin-dns | 1.1.5 | ☑︎ |
| netbox-qrcode | 0.0.15 | ☑︎ |
| netbox-reorder-rack | 1.1.3 | ☐ |
| netbox-secrets | 2.1.0 | ☐ |
| netbox-topology-views | 4.1.0 | ☑︎ |
| netbox-validity | 3.0.5 | ☐ |
| netboxlabs-diode-netbox-plugin | 0.6.0 | ☑︎ |
| phonebox-plugin | 0.0.10 | ☐ |
| slurpit_netbox | 1.0.33 | ☑︎ |

### 1.4.0

Adds support for supplying custom environment variables (eg, for LDAP config).
It also contains a small auth change to allow curly braces and spaces in the new password validator.

A number of included plugins were updated to their latest compatible versions:
- `netbox_bgp` was updated to 0.13.3
- `netbox_floorplan_plugin` was updated to 0.4.1
- `netbox_plugin_dns` was updated to 1.1.3
- `netbox_topology_views` was updated to 4.0.1
- `slurpit_netbox` was updated to 0.9.84

## NetBox Enterprise 1.3.x

### 1.3.0

Compatible with any standard Kubernetes ingress controller now in KOTS installs, rather than only Nginx.
Also fixes a potential data loss issue with uploaded images, as well as enabling script and report uploads.

## NetBox Enterprise 1.2.x

### 1.2.0

Improves ingress configuration, adds support for inheriting the TLS configuration from the Admin Console configuration, and adds a "restore mode" for restoring manual backup data, plus many dependency updates and internal improvements.

## NetBox Enterprise 1.1.x

### 1.1.0

Simplifies the firewall configuration necessary for installation by making sure all initialization downloads go through our proxy domain.

## NetBox Enterprise 1.0.x

### 1.0.6

Adds support for NetBox resource usage adjustment and some improvements to startup time on a first install.

It also adds support for backup and restore, depending on your environment and license.

### 1.0.5

Adds support for scraping Prometheus metrics from NetBox, as well as the embedded PostgreSQL, Redis, and SeaweedFS if they are enabled.

Updated to support NetBox v4.0.9, and includes additional bug fixes and startup time improvements.

### 1.0.4

Adds OWASP password complexity validation to NetBox, and includes dependency updates.

### 1.0.3

Fixes issues with preflight checks, and includes minor dependency updates.

### 1.0.2

Provides a number of dependency updates and bug fixes, and includes initial support for backups of built-in Redis and PostgreSQL.

### 1.0.1

Provides bug fixes encountered during the initial rollout of the NetBox Enterprise application.

### 1.0.0

Provides final cleanup of the Beta stream in preparation for the wider release.

Provides a number of internal changes, and includes fixes for an issue where annotations could render improperly and cause problems with upgrades.
Updated to support NetBox v4.0.7.
