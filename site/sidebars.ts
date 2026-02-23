import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Sidebar configuration following the Grafana-model IA.
 *
 * URL pattern: /docs/{product}/{version}/{section}/{page}
 *
 * Each sidebar ID is keyed as `{product}{Version}` and scoped to a specific
 * product + version directory combination via docusaurus.config.ts routing.
 */
const sidebars: SidebarsConfig = {
  // ── NetBox Community (latest) ─────────────────────────────────────────────
  netboxLatest: [
    {
      type: 'doc',
      id:   'netbox/latest/index',
      label: 'Overview',
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        { type: 'doc', id: 'netbox/latest/getting-started/installation', label: 'Installation' },
        { type: 'doc', id: 'netbox/latest/getting-started/docker',       label: 'Docker' },
        { type: 'doc', id: 'netbox/latest/getting-started/first-steps',  label: 'First Steps' },
      ],
    },
    {
      type: 'category',
      label: 'Configuration',
      items: [
        { type: 'doc', id: 'netbox/latest/configuration/overview', label: 'Overview' },
        { type: 'doc', id: 'netbox/latest/configuration/required-parameters', label: 'Required Parameters' },
      ],
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        { type: 'doc', id: 'netbox/latest/features/ipam',  label: 'IPAM' },
        { type: 'doc', id: 'netbox/latest/features/dcim',  label: 'DCIM' },
        { type: 'doc', id: 'netbox/latest/features/vpn',   label: 'VPN' },
      ],
    },
    {
      type: 'category',
      label: 'Administration',
      items: [
        { type: 'doc', id: 'netbox/latest/administration/authentication', label: 'Authentication' },
        { type: 'doc', id: 'netbox/latest/administration/permissions',    label: 'Permissions' },
      ],
    },
  ],

  // ── NetBox Cloud (latest) ─────────────────────────────────────────────────
  cloudLatest: [
    {
      type: 'doc',
      id:   'cloud/latest/index',
      label: 'Overview',
    },
    {
      type: 'category',
      label: 'Console Administration',
      collapsed: false,
      items: [
        { type: 'doc', id: 'cloud/latest/console-administration/overview', label: 'Overview' },
        { type: 'doc', id: 'cloud/latest/console-administration/access',   label: 'Access & Login' },
        { type: 'doc', id: 'cloud/latest/console-administration/users',    label: 'User Management' },
      ],
    },
    {
      type: 'category',
      label: 'Instance Management',
      items: [
        { type: 'doc', id: 'cloud/latest/instance-management/create',   label: 'Create an Instance' },
        { type: 'doc', id: 'cloud/latest/instance-management/upgrade',  label: 'Upgrade' },
        { type: 'doc', id: 'cloud/latest/instance-management/backups',  label: 'Backups' },
      ],
    },
  ],

  // ── NetBox Enterprise (latest) ────────────────────────────────────────────
  enterpriseLatest: [
    {
      type: 'doc',
      id:   'enterprise/latest/index',
      label: 'Overview',
    },
    {
      type: 'category',
      label: 'Enterprise Features',
      collapsed: false,
      items: [
        { type: 'doc', id: 'enterprise/latest/features/overview',  label: 'Feature Overview' },
        { type: 'doc', id: 'enterprise/latest/features/ha',        label: 'High Availability' },
        { type: 'doc', id: 'enterprise/latest/features/sso',       label: 'SSO & SAML' },
        { type: 'doc', id: 'enterprise/latest/features/audit-log', label: 'Audit Log' },
      ],
    },
    {
      type: 'category',
      label: 'Installation',
      items: [
        { type: 'doc', id: 'enterprise/latest/installation/requirements',  label: 'Requirements' },
        { type: 'doc', id: 'enterprise/latest/installation/kubernetes',    label: 'Kubernetes' },
      ],
    },
  ],

  // ── Discovery (latest) ────────────────────────────────────────────────────
  discoveryLatest: [
    {
      type: 'doc',
      id:   'discovery/latest/index',
      label: 'Overview',
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        { type: 'doc', id: 'discovery/latest/getting-started/quick-start', label: 'Quick Start' },
        { type: 'doc', id: 'discovery/latest/getting-started/agent',       label: 'Agent Setup' },
      ],
    },
  ],
};

export default sidebars;
