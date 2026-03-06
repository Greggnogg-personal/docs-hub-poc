import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  "assurance": [
    {
      "type": "doc",
      "id": "assurance/index"
    },
    {
      "type": "category",
      "collapsed": false,
      "label": "v1.13",
      "items": [
        {
          "type": "doc",
          "id": "assurance/v1.13/index"
        },
        {
          "type": "doc",
          "id": "assurance/v1.13/getting-started"
        },
        {
          "type": "doc",
          "id": "assurance/v1.13/using-the-ui"
        }
      ]
    },
    {
      "type": "category",
      "collapsed": true,
      "label": "v1.12",
      "items": [
        {
          "type": "doc",
          "id": "assurance/v1.12/index"
        },
        {
          "type": "doc",
          "id": "assurance/v1.12/getting-started"
        },
        {
          "type": "doc",
          "id": "assurance/v1.12/using-the-ui"
        }
      ]
    },
    {
      "type": "category",
      "collapsed": true,
      "label": "v1.0.0",
      "items": [
        {
          "type": "doc",
          "id": "assurance/v1.0.0/index"
        },
        {
          "type": "doc",
          "id": "assurance/v1.0.0/getting-started"
        },
        {
          "type": "doc",
          "id": "assurance/v1.0.0/using-the-ui"
        }
      ]
    }
  ],
  "cloud": [
    {
      "type": "doc",
      "id": "cloud/index"
    },
    {
      "type": "category",
      "collapsed": false,
      "label": "v1.13",
      "items": [
        {
          "type": "doc",
          "id": "cloud/v1.13/index"
        },
        {
          "type": "category",
          "label": "Cloud Connectivity",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "cloud/v1.13/cloud-connectivity/aws-direct-connect-multi-region"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/cloud-connectivity/aws-direct-connect"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/cloud-connectivity/aws-private-link"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/cloud-connectivity/cloud-connectivity-faq"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/cloud-connectivity/do-i-need-cloud-connectivity"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/cloud-connectivity/internet-delivery"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/cloud-connectivity/ipsec-vpn-tunnels"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/cloud-connectivity/multi-region-failover"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/cloud-connectivity/ports-and-connectivity-architecture"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/cloud-connectivity/which-connectivity-option"
            }
          ]
        },
        {
          "type": "category",
          "label": "Console Administration",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "cloud/v1.13/console-administration/azure-ad-sso-setup"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/console-administration/azure-group-mapping"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/console-administration/console-access"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/console-administration/console-administration"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/console-administration/console-overview"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/console-administration/free-plan-features"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/console-administration/free-plan-new-user"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/console-administration/managing-hostnames"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/console-administration/netbox-cloud-plugins"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/console-administration/okta-group-mapping"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/console-administration/okta-sso-setup"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/console-administration/prefix-lists"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/console-administration/public-ip-addressing"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/console-administration/saml-group-map"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/console-administration/saml-sso-setup"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/console-administration/upgrading-nbc"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/console-administration/working_with_database_backups"
            }
          ]
        },
        {
          "type": "category",
          "label": "Features",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "cloud/v1.13/features/index"
            },
            {
              "type": "doc",
              "id": "cloud/v1.13/features/event-streams"
            }
          ]
        },
        {
          "type": "category",
          "label": "Instance Management",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "cloud/v1.13/instance-management/migrating-to-netbox-cloud"
            }
          ]
        }
      ]
    },
    {
      "type": "category",
      "collapsed": true,
      "label": "v1.12",
      "items": [
        {
          "type": "doc",
          "id": "cloud/v1.12/index"
        },
        {
          "type": "category",
          "label": "Cloud Connectivity",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "cloud/v1.12/cloud-connectivity/aws-direct-connect-multi-region"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/cloud-connectivity/aws-direct-connect"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/cloud-connectivity/aws-private-link"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/cloud-connectivity/cloud-connectivity-faq"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/cloud-connectivity/do-i-need-cloud-connectivity"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/cloud-connectivity/internet-delivery"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/cloud-connectivity/ipsec-vpn-tunnels"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/cloud-connectivity/multi-region-failover"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/cloud-connectivity/ports-and-connectivity-architecture"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/cloud-connectivity/which-connectivity-option"
            }
          ]
        },
        {
          "type": "category",
          "label": "Console Administration",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "cloud/v1.12/console-administration/azure-ad-sso-setup"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/console-administration/azure-group-mapping"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/console-administration/console-access"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/console-administration/console-administration"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/console-administration/console-overview"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/console-administration/free-plan-features"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/console-administration/free-plan-new-user"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/console-administration/managing-hostnames"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/console-administration/netbox-cloud-plugins"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/console-administration/okta-group-mapping"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/console-administration/okta-sso-setup"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/console-administration/prefix-lists"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/console-administration/public-ip-addressing"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/console-administration/saml-group-map"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/console-administration/saml-sso-setup"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/console-administration/upgrading-nbc"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/console-administration/working_with_database_backups"
            }
          ]
        },
        {
          "type": "category",
          "label": "Features",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "cloud/v1.12/features/index"
            },
            {
              "type": "doc",
              "id": "cloud/v1.12/features/event-streams"
            }
          ]
        },
        {
          "type": "category",
          "label": "Instance Management",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "cloud/v1.12/instance-management/migrating-to-netbox-cloud"
            }
          ]
        }
      ]
    },
    {
      "type": "category",
      "collapsed": true,
      "label": "v1.10",
      "items": [
        {
          "type": "doc",
          "id": "cloud/v1.10/index"
        },
        {
          "type": "category",
          "label": "Cloud Connectivity",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "cloud/v1.10/cloud-connectivity/aws-direct-connect-multi-region"
            },
            {
              "type": "doc",
              "id": "cloud/v1.10/cloud-connectivity/aws-direct-connect"
            },
            {
              "type": "doc",
              "id": "cloud/v1.10/cloud-connectivity/aws-private-link"
            },
            {
              "type": "doc",
              "id": "cloud/v1.10/cloud-connectivity/cloud-connectivity-faq"
            },
            {
              "type": "doc",
              "id": "cloud/v1.10/cloud-connectivity/do-i-need-cloud-connectivity"
            },
            {
              "type": "doc",
              "id": "cloud/v1.10/cloud-connectivity/internet-delivery"
            },
            {
              "type": "doc",
              "id": "cloud/v1.10/cloud-connectivity/ipsec-vpn-tunnels"
            },
            {
              "type": "doc",
              "id": "cloud/v1.10/cloud-connectivity/multi-region-failover"
            },
            {
              "type": "doc",
              "id": "cloud/v1.10/cloud-connectivity/which-connectivity-option"
            }
          ]
        },
        {
          "type": "category",
          "label": "Console Administration",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "cloud/v1.10/console-administration/azure-ad-sso-setup"
            },
            {
              "type": "doc",
              "id": "cloud/v1.10/console-administration/azure-group-mapping"
            },
            {
              "type": "doc",
              "id": "cloud/v1.10/console-administration/console-access"
            },
            {
              "type": "doc",
              "id": "cloud/v1.10/console-administration/console-administration"
            },
            {
              "type": "doc",
              "id": "cloud/v1.10/console-administration/console-overview"
            },
            {
              "type": "doc",
              "id": "cloud/v1.10/console-administration/free-plan-features"
            },
            {
              "type": "doc",
              "id": "cloud/v1.10/console-administration/free-plan-new-user"
            },
            {
              "type": "doc",
              "id": "cloud/v1.10/console-administration/managing-hostnames"
            },
            {
              "type": "doc",
              "id": "cloud/v1.10/console-administration/netbox-cloud-plugins"
            },
            {
              "type": "doc",
              "id": "cloud/v1.10/console-administration/okta-group-mapping"
            },
            {
              "type": "doc",
              "id": "cloud/v1.10/console-administration/okta-sso-setup"
            },
            {
              "type": "doc",
              "id": "cloud/v1.10/console-administration/prefix-lists"
            },
            {
              "type": "doc",
              "id": "cloud/v1.10/console-administration/public-ip-addressing"
            },
            {
              "type": "doc",
              "id": "cloud/v1.10/console-administration/saml-group-map"
            },
            {
              "type": "doc",
              "id": "cloud/v1.10/console-administration/saml-sso-setup"
            },
            {
              "type": "doc",
              "id": "cloud/v1.10/console-administration/upgrading-nbc"
            },
            {
              "type": "doc",
              "id": "cloud/v1.10/console-administration/working_with_database_backups"
            }
          ]
        },
        {
          "type": "category",
          "label": "Features",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "cloud/v1.10/features/index"
            }
          ]
        },
        {
          "type": "category",
          "label": "Instance Management",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "cloud/v1.10/instance-management/migrating-to-netbox-cloud"
            }
          ]
        }
      ]
    },
    {
      "type": "category",
      "collapsed": true,
      "label": "v1.9",
      "items": [
        {
          "type": "doc",
          "id": "cloud/v1.9/index"
        },
        {
          "type": "doc",
          "id": "cloud/v1.9/azure-ad-sso-setup"
        },
        {
          "type": "doc",
          "id": "cloud/v1.9/azure-group-mapping"
        },
        {
          "type": "doc",
          "id": "cloud/v1.9/console-access"
        },
        {
          "type": "doc",
          "id": "cloud/v1.9/console-administration"
        },
        {
          "type": "doc",
          "id": "cloud/v1.9/console-overview"
        },
        {
          "type": "doc",
          "id": "cloud/v1.9/free-plan-features"
        },
        {
          "type": "doc",
          "id": "cloud/v1.9/free-plan-new-user"
        },
        {
          "type": "doc",
          "id": "cloud/v1.9/managing-hostnames"
        },
        {
          "type": "doc",
          "id": "cloud/v1.9/netbox-cloud-plugins"
        },
        {
          "type": "doc",
          "id": "cloud/v1.9/okta-group-mapping"
        },
        {
          "type": "doc",
          "id": "cloud/v1.9/okta-sso-setup"
        },
        {
          "type": "doc",
          "id": "cloud/v1.9/prefix-lists"
        },
        {
          "type": "doc",
          "id": "cloud/v1.9/public-ip-addressing"
        },
        {
          "type": "doc",
          "id": "cloud/v1.9/saml-group-map"
        },
        {
          "type": "doc",
          "id": "cloud/v1.9/saml-sso-setup"
        },
        {
          "type": "doc",
          "id": "cloud/v1.9/upgrading-nbc"
        },
        {
          "type": "doc",
          "id": "cloud/v1.9/working_with_database_backups"
        }
      ]
    },
    {
      "type": "category",
      "collapsed": true,
      "label": "v1.0.0",
      "items": [
        {
          "type": "doc",
          "id": "cloud/v1.0.0/index"
        },
        {
          "type": "category",
          "label": "Cloud Connectivity",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "cloud/v1.0.0/cloud-connectivity/index"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/cloud-connectivity/aws-direct-connect-multi-region"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/cloud-connectivity/aws-direct-connect"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/cloud-connectivity/aws-private-link"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/cloud-connectivity/cloud-connectivity-faq"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/cloud-connectivity/do-i-need-cloud-connectivity"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/cloud-connectivity/internet-delivery"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/cloud-connectivity/ipsec-vpn-tunnels"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/cloud-connectivity/multi-region-failover"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/cloud-connectivity/ports-and-connectivity-architecture"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/cloud-connectivity/which-connectivity-option"
            }
          ]
        },
        {
          "type": "category",
          "label": "Console Administration",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "cloud/v1.0.0/console-administration/index"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/console-administration/azure-ad-sso-setup"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/console-administration/azure-group-mapping"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/console-administration/console-access"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/console-administration/console-administration"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/console-administration/console-overview"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/console-administration/free-plan-features"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/console-administration/free-plan-new-user"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/console-administration/managing-hostnames"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/console-administration/netbox-cloud-plugins"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/console-administration/okta-group-mapping"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/console-administration/okta-sso-setup"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/console-administration/prefix-lists"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/console-administration/public-ip-addressing"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/console-administration/saml-group-map"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/console-administration/saml-sso-setup"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/console-administration/upgrading-nbc"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/console-administration/working_with_database_backups"
            }
          ]
        },
        {
          "type": "category",
          "label": "Features",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "cloud/v1.0.0/features/index"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/features/event-streams"
            }
          ]
        },
        {
          "type": "category",
          "label": "Instance Management",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "cloud/v1.0.0/instance-management/index"
            },
            {
              "type": "doc",
              "id": "cloud/v1.0.0/instance-management/migrating-to-netbox-cloud"
            }
          ]
        }
      ]
    }
  ],
  "community": [
    {
      "type": "doc",
      "id": "community/index"
    },
    {
      "type": "category",
      "collapsed": false,
      "label": "v1.0.0",
      "items": [
        {
          "type": "doc",
          "id": "community/v1.0.0/index"
        }
      ]
    }
  ],
  "copilot": [
    {
      "type": "doc",
      "id": "copilot/index"
    },
    {
      "type": "category",
      "collapsed": false,
      "label": "v1.0.0",
      "items": [
        {
          "type": "doc",
          "id": "copilot/v1.0.0/index"
        },
        {
          "type": "doc",
          "id": "copilot/v1.0.0/privacy-security"
        },
        {
          "type": "doc",
          "id": "copilot/v1.0.0/quickstart"
        },
        {
          "type": "doc",
          "id": "copilot/v1.0.0/usage-guide"
        }
      ]
    }
  ],
  "developer": [
    {
      "type": "doc",
      "id": "developer/index"
    },
    {
      "type": "category",
      "collapsed": false,
      "label": "v1.0.0",
      "items": [
        {
          "type": "doc",
          "id": "developer/v1.0.0/index"
        },
        {
          "type": "category",
          "label": "Plugins Extensions",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "developer/v1.0.0/plugins-extensions/index"
            },
            {
              "type": "category",
              "label": "Changes",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "developer/v1.0.0/plugins-extensions/changes/index"
                },
                {
                  "type": "doc",
                  "id": "developer/v1.0.0/plugins-extensions/changes/changelog"
                },
                {
                  "type": "doc",
                  "id": "developer/v1.0.0/plugins-extensions/changes/configuration"
                },
                {
                  "type": "category",
                  "label": "Models",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "developer/v1.0.0/plugins-extensions/changes/models/changerequest"
                    },
                    {
                      "type": "doc",
                      "id": "developer/v1.0.0/plugins-extensions/changes/models/comment"
                    },
                    {
                      "type": "doc",
                      "id": "developer/v1.0.0/plugins-extensions/changes/models/commentreply"
                    },
                    {
                      "type": "doc",
                      "id": "developer/v1.0.0/plugins-extensions/changes/models/policy"
                    },
                    {
                      "type": "doc",
                      "id": "developer/v1.0.0/plugins-extensions/changes/models/policyrule"
                    },
                    {
                      "type": "doc",
                      "id": "developer/v1.0.0/plugins-extensions/changes/models/review"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "diode": [
    {
      "type": "doc",
      "id": "diode/index"
    },
    {
      "type": "category",
      "collapsed": false,
      "label": "v1.0.0",
      "items": [
        {
          "type": "doc",
          "id": "diode/v1.0.0/index"
        },
        {
          "type": "doc",
          "id": "diode/v1.0.0/diode-proto"
        },
        {
          "type": "doc",
          "id": "diode/v1.0.0/getting-started"
        },
        {
          "type": "doc",
          "id": "diode/v1.0.0/license"
        },
        {
          "type": "doc",
          "id": "diode/v1.0.0/metrics"
        },
        {
          "type": "category",
          "label": "Observability",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "diode/v1.0.0/observability/index"
            },
            {
              "type": "doc",
              "id": "diode/v1.0.0/observability/metrics"
            }
          ]
        },
        {
          "type": "category",
          "label": "Protobuf",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "diode/v1.0.0/protobuf/index"
            },
            {
              "type": "doc",
              "id": "diode/v1.0.0/protobuf/diode-proto"
            }
          ]
        },
        {
          "type": "category",
          "label": "Sdk",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "diode/v1.0.0/sdk/index"
            },
            {
              "type": "category",
              "label": "Go",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "diode/v1.0.0/sdk/go/README"
                },
                {
                  "type": "doc",
                  "id": "diode/v1.0.0/sdk/go/SECURITY"
                }
              ]
            },
            {
              "type": "category",
              "label": "Python",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "diode/v1.0.0/sdk/python/README"
                },
                {
                  "type": "doc",
                  "id": "diode/v1.0.0/sdk/python/SECURITY"
                },
                {
                  "type": "category",
                  "label": "Docs",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "diode/v1.0.0/sdk/python/docs/entities"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "discovery": [
    {
      "type": "doc",
      "id": "discovery/index"
    },
    {
      "type": "category",
      "collapsed": false,
      "label": "v1.13",
      "items": [
        {
          "type": "doc",
          "id": "discovery/v1.13/index"
        },
        {
          "type": "doc",
          "id": "discovery/v1.13/getting-started"
        }
      ]
    },
    {
      "type": "category",
      "collapsed": true,
      "label": "v1.12",
      "items": [
        {
          "type": "doc",
          "id": "discovery/v1.12/index"
        },
        {
          "type": "doc",
          "id": "discovery/v1.12/getting-started"
        }
      ]
    },
    {
      "type": "category",
      "collapsed": true,
      "label": "v1.0.0",
      "items": [
        {
          "type": "doc",
          "id": "discovery/v1.0.0/index"
        },
        {
          "type": "doc",
          "id": "discovery/v1.0.0/getting-started"
        }
      ]
    }
  ],
  "docs-publisher": [
    {
      "type": "doc",
      "id": "docs-publisher/index"
    },
    {
      "type": "category",
      "collapsed": false,
      "label": "1.0.6",
      "items": [
        {
          "type": "doc",
          "id": "docs-publisher/1.0.6/index"
        }
      ]
    }
  ],
  "enterprise": [
    {
      "type": "doc",
      "id": "enterprise/index"
    },
    {
      "type": "category",
      "collapsed": false,
      "label": "v1.13",
      "items": [
        {
          "type": "doc",
          "id": "enterprise/v1.13/index"
        },
        {
          "type": "category",
          "label": "Enterprise Features",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "enterprise/v1.13/enterprise-features/nbe-azure-group-mapping"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.13/enterprise-features/nbe-azure-sso"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.13/enterprise-features/nbe-backups"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.13/enterprise-features/nbe-ec-built-in-plugins"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.13/enterprise-features/nbe-ec-custom-plugins"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.13/enterprise-features/nbe-ec-installation"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.13/enterprise-features/nbe-ec-linux-changes"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.13/enterprise-features/nbe-ec-requirements-rhel"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.13/enterprise-features/nbe-ec-requirements-ubuntu"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.13/enterprise-features/nbe-ec-requirements"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.13/enterprise-features/nbe-ldap"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.13/enterprise-features/nbe-migrating"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.13/enterprise-features/nbe-multi-node"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.13/enterprise-features/nbe-oidc-sso"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.13/enterprise-features/nbe-overview"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.13/enterprise-features/nbe-release-notes"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.13/enterprise-features/nbe-saml-group-map"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.13/enterprise-features/nbe-saml"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.13/enterprise-features/nbe-storage-installation"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.13/enterprise-features/nbe-storage-migration"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.13/enterprise-features/nbe-storage-options"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.13/enterprise-features/nbe-tls-ingress"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.13/enterprise-features/nbe-troubleshooting"
            }
          ]
        }
      ]
    },
    {
      "type": "category",
      "collapsed": true,
      "label": "v1.12",
      "items": [
        {
          "type": "doc",
          "id": "enterprise/v1.12/index"
        },
        {
          "type": "category",
          "label": "Enterprise Features",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "enterprise/v1.12/enterprise-features/nbe-azure-group-mapping"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.12/enterprise-features/nbe-azure-sso"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.12/enterprise-features/nbe-backups"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.12/enterprise-features/nbe-ec-built-in-plugins"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.12/enterprise-features/nbe-ec-custom-plugins"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.12/enterprise-features/nbe-ec-installation"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.12/enterprise-features/nbe-ec-linux-changes"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.12/enterprise-features/nbe-ec-requirements-rhel"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.12/enterprise-features/nbe-ec-requirements-ubuntu"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.12/enterprise-features/nbe-ec-requirements"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.12/enterprise-features/nbe-ldap"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.12/enterprise-features/nbe-migrating"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.12/enterprise-features/nbe-oidc-sso"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.12/enterprise-features/nbe-overview"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.12/enterprise-features/nbe-release-notes"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.12/enterprise-features/nbe-saml-group-map"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.12/enterprise-features/nbe-saml"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.12/enterprise-features/nbe-tls-ingress"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.12/enterprise-features/nbe-troubleshooting"
            }
          ]
        },
        {
          "type": "category",
          "label": "Features",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "enterprise/v1.12/features/index"
            }
          ]
        }
      ]
    },
    {
      "type": "category",
      "collapsed": true,
      "label": "v1.10",
      "items": [
        {
          "type": "doc",
          "id": "enterprise/v1.10/index"
        },
        {
          "type": "category",
          "label": "Enterprise Features",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "enterprise/v1.10/enterprise-features/nbe-azure-group-mapping"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.10/enterprise-features/nbe-azure-sso"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.10/enterprise-features/nbe-backups"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.10/enterprise-features/nbe-ec-built-in-plugins"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.10/enterprise-features/nbe-ec-custom-plugins"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.10/enterprise-features/nbe-ec-installation"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.10/enterprise-features/nbe-ec-linux-changes"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.10/enterprise-features/nbe-ec-requirements-rhel"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.10/enterprise-features/nbe-ec-requirements-ubuntu"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.10/enterprise-features/nbe-ec-requirements"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.10/enterprise-features/nbe-ldap"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.10/enterprise-features/nbe-migrating"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.10/enterprise-features/nbe-overview"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.10/enterprise-features/nbe-release-notes"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.10/enterprise-features/nbe-saml-group-map"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.10/enterprise-features/nbe-saml"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.10/enterprise-features/nbe-tls-ingress"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.10/enterprise-features/nbe-troubleshooting"
            }
          ]
        },
        {
          "type": "category",
          "label": "Features",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "enterprise/v1.10/features/index"
            }
          ]
        }
      ]
    },
    {
      "type": "category",
      "collapsed": true,
      "label": "v1.9",
      "items": [
        {
          "type": "doc",
          "id": "enterprise/v1.9/index"
        },
        {
          "type": "doc",
          "id": "enterprise/v1.9/nbe-azure-group-mapping"
        },
        {
          "type": "doc",
          "id": "enterprise/v1.9/nbe-azure-sso"
        },
        {
          "type": "doc",
          "id": "enterprise/v1.9/nbe-backups"
        },
        {
          "type": "doc",
          "id": "enterprise/v1.9/nbe-ec-built-in-plugins"
        },
        {
          "type": "doc",
          "id": "enterprise/v1.9/nbe-ec-custom-plugins"
        },
        {
          "type": "doc",
          "id": "enterprise/v1.9/nbe-ec-installation"
        },
        {
          "type": "doc",
          "id": "enterprise/v1.9/nbe-ec-linux-changes"
        },
        {
          "type": "doc",
          "id": "enterprise/v1.9/nbe-ec-requirements-rhel"
        },
        {
          "type": "doc",
          "id": "enterprise/v1.9/nbe-ec-requirements-ubuntu"
        },
        {
          "type": "doc",
          "id": "enterprise/v1.9/nbe-ec-requirements"
        },
        {
          "type": "doc",
          "id": "enterprise/v1.9/nbe-ldap"
        },
        {
          "type": "doc",
          "id": "enterprise/v1.9/nbe-migrating"
        },
        {
          "type": "doc",
          "id": "enterprise/v1.9/nbe-overview"
        },
        {
          "type": "doc",
          "id": "enterprise/v1.9/nbe-release-notes"
        },
        {
          "type": "doc",
          "id": "enterprise/v1.9/nbe-saml-group-map"
        },
        {
          "type": "doc",
          "id": "enterprise/v1.9/nbe-saml"
        },
        {
          "type": "doc",
          "id": "enterprise/v1.9/nbe-tls-ingress"
        },
        {
          "type": "doc",
          "id": "enterprise/v1.9/nbe-troubleshooting"
        }
      ]
    },
    {
      "type": "category",
      "collapsed": true,
      "label": "v1.0.0",
      "items": [
        {
          "type": "doc",
          "id": "enterprise/v1.0.0/index"
        },
        {
          "type": "category",
          "label": "Enterprise Features",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "enterprise/v1.0.0/enterprise-features/index"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.0.0/enterprise-features/nbe-azure-group-mapping"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.0.0/enterprise-features/nbe-azure-sso"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.0.0/enterprise-features/nbe-backups"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.0.0/enterprise-features/nbe-ec-built-in-plugins"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.0.0/enterprise-features/nbe-ec-custom-plugins"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.0.0/enterprise-features/nbe-ec-installation"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.0.0/enterprise-features/nbe-ec-linux-changes"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.0.0/enterprise-features/nbe-ec-requirements-rhel"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.0.0/enterprise-features/nbe-ec-requirements-ubuntu"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.0.0/enterprise-features/nbe-ec-requirements"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.0.0/enterprise-features/nbe-ldap"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.0.0/enterprise-features/nbe-migrating"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.0.0/enterprise-features/nbe-multi-node"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.0.0/enterprise-features/nbe-oidc-sso"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.0.0/enterprise-features/nbe-overview"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.0.0/enterprise-features/nbe-release-notes"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.0.0/enterprise-features/nbe-saml-group-map"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.0.0/enterprise-features/nbe-saml"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.0.0/enterprise-features/nbe-storage-installation"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.0.0/enterprise-features/nbe-storage-migration"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.0.0/enterprise-features/nbe-storage-options"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.0.0/enterprise-features/nbe-tls-ingress"
            },
            {
              "type": "doc",
              "id": "enterprise/v1.0.0/enterprise-features/nbe-troubleshooting"
            }
          ]
        }
      ]
    }
  ],
  "extensions": [
    {
      "type": "doc",
      "id": "extensions/index"
    },
    {
      "type": "category",
      "collapsed": false,
      "label": "v1.0.0",
      "items": [
        {
          "type": "doc",
          "id": "extensions/v1.0.0/index"
        },
        {
          "type": "category",
          "label": "Branching",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "extensions/v1.0.0/branching/index"
            },
            {
              "type": "doc",
              "id": "extensions/v1.0.0/branching/best-practices"
            },
            {
              "type": "doc",
              "id": "extensions/v1.0.0/branching/changelog"
            },
            {
              "type": "doc",
              "id": "extensions/v1.0.0/branching/configuration"
            },
            {
              "type": "doc",
              "id": "extensions/v1.0.0/branching/netbox-docker"
            },
            {
              "type": "doc",
              "id": "extensions/v1.0.0/branching/rest-api"
            },
            {
              "type": "category",
              "label": "Models",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/models/branch"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/models/branchevent"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/models/changediff"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/models/objectchange"
                }
              ]
            },
            {
              "type": "category",
              "label": "Using Branches",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/using-branches/creating-a-branch"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/using-branches/reverting-a-branch"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/using-branches/syncing-merging"
                }
              ]
            },
            {
              "type": "category",
              "label": "V0.6.2",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/v0.6.2/index"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/v0.6.2/best-practices"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/v0.6.2/changelog"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/v0.6.2/configuration"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/v0.6.2/rest-api"
                },
                {
                  "type": "category",
                  "label": "Models",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.6.2/models/branch"
                    },
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.6.2/models/branchevent"
                    },
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.6.2/models/changediff"
                    },
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.6.2/models/objectchange"
                    }
                  ]
                },
                {
                  "type": "category",
                  "label": "Using Branches",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.6.2/using-branches/creating-a-branch"
                    },
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.6.2/using-branches/reverting-a-branch"
                    },
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.6.2/using-branches/syncing-merging"
                    }
                  ]
                }
              ]
            },
            {
              "type": "category",
              "label": "V0.7.0",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/v0.7.0/index"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/v0.7.0/best-practices"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/v0.7.0/changelog"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/v0.7.0/configuration"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/v0.7.0/rest-api"
                },
                {
                  "type": "category",
                  "label": "Models",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.7.0/models/branch"
                    },
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.7.0/models/branchevent"
                    },
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.7.0/models/changediff"
                    },
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.7.0/models/objectchange"
                    }
                  ]
                },
                {
                  "type": "category",
                  "label": "Using Branches",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.7.0/using-branches/creating-a-branch"
                    },
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.7.0/using-branches/reverting-a-branch"
                    },
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.7.0/using-branches/syncing-merging"
                    }
                  ]
                }
              ]
            },
            {
              "type": "category",
              "label": "V0.7.1",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/v0.7.1/index"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/v0.7.1/best-practices"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/v0.7.1/changelog"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/v0.7.1/configuration"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/v0.7.1/rest-api"
                },
                {
                  "type": "category",
                  "label": "Models",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.7.1/models/branch"
                    },
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.7.1/models/branchevent"
                    },
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.7.1/models/changediff"
                    },
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.7.1/models/objectchange"
                    }
                  ]
                },
                {
                  "type": "category",
                  "label": "Using Branches",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.7.1/using-branches/creating-a-branch"
                    },
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.7.1/using-branches/reverting-a-branch"
                    },
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.7.1/using-branches/syncing-merging"
                    }
                  ]
                }
              ]
            },
            {
              "type": "category",
              "label": "V0.7.3",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/v0.7.3/index"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/v0.7.3/best-practices"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/v0.7.3/changelog"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/v0.7.3/configuration"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/branching/v0.7.3/rest-api"
                },
                {
                  "type": "category",
                  "label": "Models",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.7.3/models/branch"
                    },
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.7.3/models/branchevent"
                    },
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.7.3/models/changediff"
                    },
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.7.3/models/objectchange"
                    }
                  ]
                },
                {
                  "type": "category",
                  "label": "Using Branches",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.7.3/using-branches/creating-a-branch"
                    },
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.7.3/using-branches/reverting-a-branch"
                    },
                    {
                      "type": "doc",
                      "id": "extensions/v1.0.0/branching/v0.7.3/using-branches/syncing-merging"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "type": "category",
          "label": "Custom Objects",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "extensions/v1.0.0/custom-objects/index"
            },
            {
              "type": "doc",
              "id": "extensions/v1.0.0/custom-objects/api"
            },
            {
              "type": "doc",
              "id": "extensions/v1.0.0/custom-objects/branching"
            },
            {
              "type": "doc",
              "id": "extensions/v1.0.0/custom-objects/changelog"
            },
            {
              "type": "doc",
              "id": "extensions/v1.0.0/custom-objects/configuration"
            },
            {
              "type": "category",
              "label": "V0.3.0",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/custom-objects/v0.3.0/index"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/custom-objects/v0.3.0/api"
                }
              ]
            },
            {
              "type": "category",
              "label": "V0.3.1",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/custom-objects/v0.3.1/index"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/custom-objects/v0.3.1/api"
                }
              ]
            },
            {
              "type": "category",
              "label": "V0.4.0",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/custom-objects/v0.4.0/index"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/custom-objects/v0.4.0/api"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/custom-objects/v0.4.0/branching"
                },
                {
                  "type": "doc",
                  "id": "extensions/v1.0.0/custom-objects/v0.4.0/changelog"
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "integrations": [
    {
      "type": "doc",
      "id": "integrations/index"
    },
    {
      "type": "category",
      "collapsed": false,
      "label": "v1.0.0",
      "items": [
        {
          "type": "doc",
          "id": "integrations/v1.0.0/index"
        },
        {
          "type": "category",
          "label": "Platform Integrations",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "integrations/v1.0.0/platform-integrations/index"
            },
            {
              "type": "category",
              "label": "Cisco Catalyst Center",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "integrations/v1.0.0/platform-integrations/cisco-catalyst-center/index"
                },
                {
                  "type": "doc",
                  "id": "integrations/v1.0.0/platform-integrations/cisco-catalyst-center/cisco-catalyst-center-faq"
                },
                {
                  "type": "doc",
                  "id": "integrations/v1.0.0/platform-integrations/cisco-catalyst-center/cisco-catalyst-center-tech-info"
                },
                {
                  "type": "doc",
                  "id": "integrations/v1.0.0/platform-integrations/cisco-catalyst-center/getting-started"
                }
              ]
            },
            {
              "type": "category",
              "label": "Cisco Meraki",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "integrations/v1.0.0/platform-integrations/cisco-meraki/index"
                },
                {
                  "type": "doc",
                  "id": "integrations/v1.0.0/platform-integrations/cisco-meraki/cisco-meraki-faq"
                },
                {
                  "type": "doc",
                  "id": "integrations/v1.0.0/platform-integrations/cisco-meraki/cisco-meraki-tech-info"
                },
                {
                  "type": "doc",
                  "id": "integrations/v1.0.0/platform-integrations/cisco-meraki/getting-started"
                }
              ]
            },
            {
              "type": "category",
              "label": "Juniper Mist",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "integrations/v1.0.0/platform-integrations/juniper-mist/index"
                },
                {
                  "type": "doc",
                  "id": "integrations/v1.0.0/platform-integrations/juniper-mist/getting-started"
                },
                {
                  "type": "doc",
                  "id": "integrations/v1.0.0/platform-integrations/juniper-mist/juniper-mist-faq"
                },
                {
                  "type": "doc",
                  "id": "integrations/v1.0.0/platform-integrations/juniper-mist/juniper-mist-tech-info"
                }
              ]
            },
            {
              "type": "category",
              "label": "Vmware Vcenter",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "integrations/v1.0.0/platform-integrations/vmware-vcenter/index"
                },
                {
                  "type": "doc",
                  "id": "integrations/v1.0.0/platform-integrations/vmware-vcenter/getting-started"
                },
                {
                  "type": "doc",
                  "id": "integrations/v1.0.0/platform-integrations/vmware-vcenter/vmware-vcenter-faq"
                },
                {
                  "type": "doc",
                  "id": "integrations/v1.0.0/platform-integrations/vmware-vcenter/vmware-vcenter-tech-info"
                }
              ]
            }
          ]
        },
        {
          "type": "category",
          "label": "Tool Integrations",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "integrations/v1.0.0/tool-integrations/index"
            },
            {
              "type": "doc",
              "id": "integrations/v1.0.0/tool-integrations/netbox-ansible-collection"
            },
            {
              "type": "doc",
              "id": "integrations/v1.0.0/tool-integrations/pyats"
            },
            {
              "type": "category",
              "label": "Servicenow",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "integrations/v1.0.0/tool-integrations/servicenow/index"
                },
                {
                  "type": "doc",
                  "id": "integrations/v1.0.0/tool-integrations/servicenow/known-issues"
                },
                {
                  "type": "doc",
                  "id": "integrations/v1.0.0/tool-integrations/servicenow/release-notes"
                },
                {
                  "type": "doc",
                  "id": "integrations/v1.0.0/tool-integrations/servicenow/snow-faq"
                },
                {
                  "type": "doc",
                  "id": "integrations/v1.0.0/tool-integrations/servicenow/snow-installation"
                },
                {
                  "type": "doc",
                  "id": "integrations/v1.0.0/tool-integrations/servicenow/snow-technical-info"
                },
                {
                  "type": "doc",
                  "id": "integrations/v1.0.0/tool-integrations/servicenow/snow-upgrading"
                },
                {
                  "type": "doc",
                  "id": "integrations/v1.0.0/tool-integrations/servicenow/snow-user-guide"
                }
              ]
            },
            {
              "type": "category",
              "label": "V1.2.6",
              "collapsed": true,
              "items": [
                {
                  "type": "category",
                  "label": "Servicenow",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.2.6/servicenow/index"
                    },
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.2.6/servicenow/snow-faq"
                    },
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.2.6/servicenow/snow-installation"
                    },
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.2.6/servicenow/snow-technical-info"
                    },
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.2.6/servicenow/snow-upgrading"
                    },
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.2.6/servicenow/snow-user-guide"
                    }
                  ]
                }
              ]
            },
            {
              "type": "category",
              "label": "V1.3.3",
              "collapsed": true,
              "items": [
                {
                  "type": "category",
                  "label": "Servicenow",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.3.3/servicenow/index"
                    },
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.3.3/servicenow/release-notes"
                    },
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.3.3/servicenow/snow-faq"
                    },
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.3.3/servicenow/snow-installation"
                    },
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.3.3/servicenow/snow-technical-info"
                    },
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.3.3/servicenow/snow-upgrading"
                    },
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.3.3/servicenow/snow-user-guide"
                    }
                  ]
                }
              ]
            },
            {
              "type": "category",
              "label": "V1.3.4",
              "collapsed": true,
              "items": [
                {
                  "type": "category",
                  "label": "Servicenow",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.3.4/servicenow/index"
                    },
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.3.4/servicenow/release-notes"
                    },
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.3.4/servicenow/snow-faq"
                    },
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.3.4/servicenow/snow-installation"
                    },
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.3.4/servicenow/snow-technical-info"
                    },
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.3.4/servicenow/snow-upgrading"
                    },
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.3.4/servicenow/snow-user-guide"
                    }
                  ]
                }
              ]
            },
            {
              "type": "category",
              "label": "V1.4.012",
              "collapsed": true,
              "items": [
                {
                  "type": "category",
                  "label": "Servicenow",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.4.012/servicenow/index"
                    },
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.4.012/servicenow/known-issues"
                    },
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.4.012/servicenow/release-notes"
                    },
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.4.012/servicenow/snow-faq"
                    },
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.4.012/servicenow/snow-installation"
                    },
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.4.012/servicenow/snow-technical-info"
                    },
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.4.012/servicenow/snow-upgrading"
                    },
                    {
                      "type": "doc",
                      "id": "integrations/v1.0.0/tool-integrations/v1.4.012/servicenow/snow-user-guide"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "mcp": [
    {
      "type": "doc",
      "id": "mcp/index"
    },
    {
      "type": "category",
      "collapsed": false,
      "label": "v1.0.0",
      "items": [
        {
          "type": "doc",
          "id": "mcp/v1.0.0/index"
        },
        {
          "type": "doc",
          "id": "mcp/v1.0.0/examples"
        }
      ]
    }
  ],
  "netbox": [
    {
      "type": "doc",
      "id": "netbox/index"
    },
    {
      "type": "category",
      "collapsed": false,
      "label": "v4.4",
      "items": [
        {
          "type": "doc",
          "id": "netbox/v4.4/index"
        },
        {
          "type": "doc",
          "id": "netbox/v4.4/introduction"
        },
        {
          "type": "category",
          "label": "Administration",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.4/administration/error-reporting"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/administration/netbox-shell"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/administration/permissions"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/administration/replicating-netbox"
            },
            {
              "type": "category",
              "label": "Authentication",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.4/administration/authentication/google"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/administration/authentication/microsoft-entra-id"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/administration/authentication/okta"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/administration/authentication/overview"
                }
              ]
            }
          ]
        },
        {
          "type": "category",
          "label": "Best Practices",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.4/best-practices/modeling-pluggable-transceivers"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/best-practices/performance-handbook"
            }
          ]
        },
        {
          "type": "category",
          "label": "Configuration",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.4/configuration/index"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/configuration/data-validation"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/configuration/default-values"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/configuration/development"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/configuration/error-reporting"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/configuration/graphql-api"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/configuration/miscellaneous"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/configuration/plugins"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/configuration/remote-authentication"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/configuration/required-parameters"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/configuration/security"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/configuration/system"
            }
          ]
        },
        {
          "type": "category",
          "label": "Customization",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.4/customization/custom-fields"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/customization/custom-links"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/customization/custom-scripts"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/customization/custom-validation"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/customization/export-templates"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/customization/reports"
            }
          ]
        },
        {
          "type": "category",
          "label": "Development",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.4/development/index"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/development/adding-models"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/development/application-registry"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/development/extending-models"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/development/getting-started"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/development/git-cheat-sheet"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/development/internationalization"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/development/models"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/development/release-checklist"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/development/search"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/development/signals"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/development/style-guide"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/development/translations"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/development/user-preferences"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/development/web-ui"
            }
          ]
        },
        {
          "type": "category",
          "label": "Features",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.4/features/api-integration"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/features/authentication-permissions"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/features/background-jobs"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/features/change-logging"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/features/circuits"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/features/configuration-rendering"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/features/contacts"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/features/context-data"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/features/customization"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/features/devices-cabling"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/features/event-rules"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/features/facilities"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/features/ipam"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/features/journaling"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/features/l2vpn-overlay"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/features/notifications"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/features/power-tracking"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/features/search"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/features/synchronized-data"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/features/tenancy"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/features/user-preferences"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/features/virtualization"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/features/vlan-management"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/features/vpn-tunnels"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/features/wireless"
            }
          ]
        },
        {
          "type": "category",
          "label": "Getting Started",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.4/getting-started/planning"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/getting-started/populating-data"
            }
          ]
        },
        {
          "type": "category",
          "label": "Installation",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.4/installation/index"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/installation/postgresql"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/installation/redis"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/installation/netbox"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/installation/4a-gunicorn"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/installation/4b-uwsgi"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/installation/http-server"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/installation/ldap"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/installation/upgrading"
            }
          ]
        },
        {
          "type": "category",
          "label": "Integrations",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.4/integrations/graphql-api"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/integrations/prometheus-metrics"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/integrations/rest-api"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/integrations/synchronized-data"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/integrations/webhooks"
            }
          ]
        },
        {
          "type": "category",
          "label": "Models",
          "collapsed": true,
          "items": [
            {
              "type": "category",
              "label": "Circuits",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/circuits/circuit"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/circuits/circuitgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/circuits/circuitgroupassignment"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/circuits/circuittermination"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/circuits/circuittype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/circuits/provider"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/circuits/provideraccount"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/circuits/providernetwork"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/circuits/virtualcircuit"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/circuits/virtualcircuittermination"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/circuits/virtualcircuittype"
                }
              ]
            },
            {
              "type": "category",
              "label": "Core",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/core/datafile"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/core/datasource"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/core/job"
                }
              ]
            },
            {
              "type": "category",
              "label": "Dcim",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/cable"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/consoleport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/consoleporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/consoleserverport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/consoleserverporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/device"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/devicebay"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/devicebaytemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/devicerole"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/devicetype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/frontport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/frontporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/interface"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/interfacetemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/inventoryitem"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/inventoryitemrole"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/inventoryitemtemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/location"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/macaddress"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/manufacturer"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/module"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/modulebay"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/modulebaytemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/moduletype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/moduletypeprofile"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/platform"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/powerfeed"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/poweroutlet"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/poweroutlettemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/powerpanel"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/powerport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/powerporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/rack"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/rackreservation"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/rackrole"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/racktype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/rearport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/rearporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/region"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/site"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/sitegroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/virtualchassis"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/dcim/virtualdevicecontext"
                }
              ]
            },
            {
              "type": "category",
              "label": "Extras",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/extras/bookmark"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/extras/configcontext"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/extras/configcontextprofile"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/extras/configtemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/extras/customfield"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/extras/customfieldchoiceset"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/extras/customlink"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/extras/eventrule"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/extras/exporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/extras/imageattachment"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/extras/journalentry"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/extras/notification"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/extras/notificationgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/extras/savedfilter"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/extras/subscription"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/extras/tableconfig"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/extras/tag"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/extras/webhook"
                }
              ]
            },
            {
              "type": "category",
              "label": "Ipam",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/ipam/aggregate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/ipam/asn"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/ipam/asnrange"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/ipam/fhrpgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/ipam/fhrpgroupassignment"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/ipam/ipaddress"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/ipam/iprange"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/ipam/prefix"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/ipam/rir"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/ipam/role"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/ipam/routetarget"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/ipam/service"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/ipam/servicetemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/ipam/vlan"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/ipam/vlangroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/ipam/vlantranslationpolicy"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/ipam/vlantranslationrule"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/ipam/vrf"
                }
              ]
            },
            {
              "type": "category",
              "label": "Tenancy",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/tenancy/contact"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/tenancy/contactgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/tenancy/contactrole"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/tenancy/tenant"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/tenancy/tenantgroup"
                }
              ]
            },
            {
              "type": "category",
              "label": "Virtualization",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/virtualization/cluster"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/virtualization/clustergroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/virtualization/clustertype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/virtualization/virtualdisk"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/virtualization/virtualmachine"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/virtualization/vminterface"
                }
              ]
            },
            {
              "type": "category",
              "label": "Vpn",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/vpn/ikepolicy"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/vpn/ikeproposal"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/vpn/ipsecpolicy"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/vpn/ipsecprofile"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/vpn/ipsecproposal"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/vpn/l2vpn"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/vpn/l2vpntermination"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/vpn/tunnel"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/vpn/tunnelgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/vpn/tunneltermination"
                }
              ]
            },
            {
              "type": "category",
              "label": "Wireless",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/wireless/wirelesslan"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/wireless/wirelesslangroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/models/wireless/wirelesslink"
                }
              ]
            }
          ]
        },
        {
          "type": "category",
          "label": "Plugins",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.4/plugins/index"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/plugins/installation"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/plugins/removal"
            },
            {
              "type": "category",
              "label": "Development",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.4/plugins/development/index"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/plugins/development/background-jobs"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/plugins/development/dashboard-widgets"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/plugins/development/data-backends"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/plugins/development/event-types"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/plugins/development/exceptions"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/plugins/development/filtersets"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/plugins/development/forms"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/plugins/development/graphql-api"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/plugins/development/migration-v4"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/plugins/development/models"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/plugins/development/navigation"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/plugins/development/rest-api"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/plugins/development/search"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/plugins/development/tables"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/plugins/development/templates"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/plugins/development/user-interface"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/plugins/development/views"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.4/plugins/development/webhooks"
                }
              ]
            }
          ]
        },
        {
          "type": "category",
          "label": "Reference",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.4/reference/conditions"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/reference/filtering"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/reference/markdown"
            }
          ]
        },
        {
          "type": "category",
          "label": "Release Notes",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/index"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/version-2.0"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/version-2.1"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/version-2.10"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/version-2.11"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/version-2.2"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/version-2.3"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/version-2.4"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/version-2.5"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/version-2.6"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/version-2.7"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/version-2.8"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/version-2.9"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/version-3.0"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/version-3.1"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/version-3.2"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/version-3.3"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/version-3.4"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/version-3.5"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/version-3.6"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/version-3.7"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/version-4.0"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/version-4.1"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/version-4.2"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/version-4.3"
            },
            {
              "type": "doc",
              "id": "netbox/v4.4/release-notes/version-4.4"
            }
          ]
        }
      ]
    },
    {
      "type": "category",
      "collapsed": true,
      "label": "v4.3",
      "items": [
        {
          "type": "doc",
          "id": "netbox/v4.3/index"
        },
        {
          "type": "doc",
          "id": "netbox/v4.3/introduction"
        },
        {
          "type": "category",
          "label": "Administration",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.3/administration/error-reporting"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/administration/housekeeping"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/administration/netbox-shell"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/administration/permissions"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/administration/replicating-netbox"
            },
            {
              "type": "category",
              "label": "Authentication",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.3/administration/authentication/google"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/administration/authentication/microsoft-entra-id"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/administration/authentication/okta"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/administration/authentication/overview"
                }
              ]
            }
          ]
        },
        {
          "type": "category",
          "label": "Configuration",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.3/configuration/index"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/configuration/data-validation"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/configuration/default-values"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/configuration/development"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/configuration/error-reporting"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/configuration/graphql-api"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/configuration/miscellaneous"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/configuration/plugins"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/configuration/remote-authentication"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/configuration/required-parameters"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/configuration/security"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/configuration/system"
            }
          ]
        },
        {
          "type": "category",
          "label": "Customization",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.3/customization/custom-fields"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/customization/custom-links"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/customization/custom-scripts"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/customization/custom-validation"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/customization/export-templates"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/customization/reports"
            }
          ]
        },
        {
          "type": "category",
          "label": "Development",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.3/development/index"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/development/adding-models"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/development/application-registry"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/development/extending-models"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/development/getting-started"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/development/git-cheat-sheet"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/development/internationalization"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/development/models"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/development/release-checklist"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/development/search"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/development/signals"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/development/style-guide"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/development/translations"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/development/user-preferences"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/development/web-ui"
            }
          ]
        },
        {
          "type": "category",
          "label": "Features",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.3/features/api-integration"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/features/authentication-permissions"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/features/background-jobs"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/features/change-logging"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/features/circuits"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/features/configuration-rendering"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/features/contacts"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/features/context-data"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/features/customization"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/features/devices-cabling"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/features/event-rules"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/features/facilities"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/features/ipam"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/features/journaling"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/features/l2vpn-overlay"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/features/notifications"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/features/power-tracking"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/features/search"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/features/synchronized-data"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/features/tenancy"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/features/virtualization"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/features/vlan-management"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/features/vpn-tunnels"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/features/wireless"
            }
          ]
        },
        {
          "type": "category",
          "label": "Getting Started",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.3/getting-started/planning"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/getting-started/populating-data"
            }
          ]
        },
        {
          "type": "category",
          "label": "Installation",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.3/installation/index"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/installation/postgresql"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/installation/redis"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/installation/netbox"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/installation/4a-gunicorn"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/installation/4b-uwsgi"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/installation/http-server"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/installation/ldap"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/installation/upgrading"
            }
          ]
        },
        {
          "type": "category",
          "label": "Integrations",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.3/integrations/graphql-api"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/integrations/prometheus-metrics"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/integrations/rest-api"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/integrations/synchronized-data"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/integrations/webhooks"
            }
          ]
        },
        {
          "type": "category",
          "label": "Models",
          "collapsed": true,
          "items": [
            {
              "type": "category",
              "label": "Circuits",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/circuits/circuit"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/circuits/circuitgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/circuits/circuitgroupassignment"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/circuits/circuittermination"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/circuits/circuittype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/circuits/provider"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/circuits/provideraccount"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/circuits/providernetwork"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/circuits/virtualcircuit"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/circuits/virtualcircuittermination"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/circuits/virtualcircuittype"
                }
              ]
            },
            {
              "type": "category",
              "label": "Core",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/core/datafile"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/core/datasource"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/core/job"
                }
              ]
            },
            {
              "type": "category",
              "label": "Dcim",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/cable"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/consoleport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/consoleporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/consoleserverport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/consoleserverporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/device"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/devicebay"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/devicebaytemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/devicerole"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/devicetype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/frontport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/frontporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/interface"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/interfacetemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/inventoryitem"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/inventoryitemrole"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/inventoryitemtemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/location"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/macaddress"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/manufacturer"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/module"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/modulebay"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/modulebaytemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/moduletype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/moduletypeprofile"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/platform"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/powerfeed"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/poweroutlet"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/poweroutlettemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/powerpanel"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/powerport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/powerporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/rack"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/rackreservation"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/rackrole"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/racktype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/rearport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/rearporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/region"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/site"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/sitegroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/virtualchassis"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/dcim/virtualdevicecontext"
                }
              ]
            },
            {
              "type": "category",
              "label": "Extras",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/extras/bookmark"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/extras/configcontext"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/extras/configcontextprofile"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/extras/configtemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/extras/customfield"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/extras/customfieldchoiceset"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/extras/customlink"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/extras/eventrule"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/extras/exporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/extras/imageattachment"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/extras/journalentry"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/extras/notification"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/extras/notificationgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/extras/savedfilter"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/extras/subscription"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/extras/tableconfig"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/extras/tag"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/extras/webhook"
                }
              ]
            },
            {
              "type": "category",
              "label": "Ipam",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/ipam/aggregate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/ipam/asn"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/ipam/asnrange"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/ipam/fhrpgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/ipam/fhrpgroupassignment"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/ipam/ipaddress"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/ipam/iprange"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/ipam/prefix"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/ipam/rir"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/ipam/role"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/ipam/routetarget"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/ipam/service"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/ipam/servicetemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/ipam/vlan"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/ipam/vlangroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/ipam/vlantranslationpolicy"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/ipam/vlantranslationrule"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/ipam/vrf"
                }
              ]
            },
            {
              "type": "category",
              "label": "Tenancy",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/tenancy/contact"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/tenancy/contactgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/tenancy/contactrole"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/tenancy/tenant"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/tenancy/tenantgroup"
                }
              ]
            },
            {
              "type": "category",
              "label": "Virtualization",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/virtualization/cluster"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/virtualization/clustergroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/virtualization/clustertype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/virtualization/virtualdisk"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/virtualization/virtualmachine"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/virtualization/vminterface"
                }
              ]
            },
            {
              "type": "category",
              "label": "Vpn",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/vpn/ikepolicy"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/vpn/ikeproposal"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/vpn/ipsecpolicy"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/vpn/ipsecprofile"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/vpn/ipsecproposal"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/vpn/l2vpn"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/vpn/l2vpntermination"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/vpn/tunnel"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/vpn/tunnelgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/vpn/tunneltermination"
                }
              ]
            },
            {
              "type": "category",
              "label": "Wireless",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/wireless/wirelesslan"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/wireless/wirelesslangroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/models/wireless/wirelesslink"
                }
              ]
            }
          ]
        },
        {
          "type": "category",
          "label": "Plugins",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.3/plugins/index"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/plugins/installation"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/plugins/removal"
            },
            {
              "type": "category",
              "label": "Development",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.3/plugins/development/index"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/plugins/development/background-jobs"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/plugins/development/dashboard-widgets"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/plugins/development/data-backends"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/plugins/development/event-types"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/plugins/development/exceptions"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/plugins/development/filtersets"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/plugins/development/forms"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/plugins/development/graphql-api"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/plugins/development/migration-v4"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/plugins/development/models"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/plugins/development/navigation"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/plugins/development/rest-api"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/plugins/development/search"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/plugins/development/tables"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/plugins/development/templates"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/plugins/development/user-interface"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/plugins/development/views"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.3/plugins/development/webhooks"
                }
              ]
            }
          ]
        },
        {
          "type": "category",
          "label": "Reference",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.3/reference/conditions"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/reference/filtering"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/reference/markdown"
            }
          ]
        },
        {
          "type": "category",
          "label": "Release Notes",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/index"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/version-2.0"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/version-2.1"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/version-2.10"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/version-2.11"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/version-2.2"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/version-2.3"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/version-2.4"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/version-2.5"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/version-2.6"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/version-2.7"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/version-2.8"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/version-2.9"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/version-3.0"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/version-3.1"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/version-3.2"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/version-3.3"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/version-3.4"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/version-3.5"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/version-3.6"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/version-3.7"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/version-4.0"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/version-4.1"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/version-4.2"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/version-4.3"
            },
            {
              "type": "doc",
              "id": "netbox/v4.3/release-notes/version-4.4"
            }
          ]
        }
      ]
    },
    {
      "type": "category",
      "collapsed": true,
      "label": "v4.2",
      "items": [
        {
          "type": "doc",
          "id": "netbox/v4.2/index"
        },
        {
          "type": "doc",
          "id": "netbox/v4.2/introduction"
        },
        {
          "type": "category",
          "label": "Administration",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.2/administration/error-reporting"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/administration/housekeeping"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/administration/netbox-shell"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/administration/permissions"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/administration/replicating-netbox"
            },
            {
              "type": "category",
              "label": "Authentication",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.2/administration/authentication/google"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/administration/authentication/microsoft-entra-id"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/administration/authentication/okta"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/administration/authentication/overview"
                }
              ]
            }
          ]
        },
        {
          "type": "category",
          "label": "Configuration",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.2/configuration/index"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/configuration/data-validation"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/configuration/default-values"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/configuration/development"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/configuration/error-reporting"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/configuration/graphql-api"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/configuration/miscellaneous"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/configuration/plugins"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/configuration/remote-authentication"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/configuration/required-parameters"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/configuration/security"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/configuration/system"
            }
          ]
        },
        {
          "type": "category",
          "label": "Customization",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.2/customization/custom-fields"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/customization/custom-links"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/customization/custom-scripts"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/customization/custom-validation"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/customization/export-templates"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/customization/reports"
            }
          ]
        },
        {
          "type": "category",
          "label": "Development",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.2/development/index"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/development/adding-models"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/development/application-registry"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/development/extending-models"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/development/getting-started"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/development/git-cheat-sheet"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/development/internationalization"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/development/models"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/development/release-checklist"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/development/search"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/development/signals"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/development/style-guide"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/development/translations"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/development/user-preferences"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/development/web-ui"
            }
          ]
        },
        {
          "type": "category",
          "label": "Features",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.2/features/api-integration"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/features/authentication-permissions"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/features/background-jobs"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/features/change-logging"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/features/circuits"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/features/configuration-rendering"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/features/contacts"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/features/context-data"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/features/customization"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/features/devices-cabling"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/features/event-rules"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/features/facilities"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/features/ipam"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/features/journaling"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/features/l2vpn-overlay"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/features/notifications"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/features/power-tracking"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/features/search"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/features/synchronized-data"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/features/tenancy"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/features/virtualization"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/features/vlan-management"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/features/vpn-tunnels"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/features/wireless"
            }
          ]
        },
        {
          "type": "category",
          "label": "Getting Started",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.2/getting-started/planning"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/getting-started/populating-data"
            }
          ]
        },
        {
          "type": "category",
          "label": "Installation",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.2/installation/index"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/installation/postgresql"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/installation/redis"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/installation/netbox"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/installation/4a-gunicorn"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/installation/4b-uwsgi"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/installation/http-server"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/installation/ldap"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/installation/upgrading"
            }
          ]
        },
        {
          "type": "category",
          "label": "Integrations",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.2/integrations/graphql-api"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/integrations/prometheus-metrics"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/integrations/rest-api"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/integrations/synchronized-data"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/integrations/webhooks"
            }
          ]
        },
        {
          "type": "category",
          "label": "Models",
          "collapsed": true,
          "items": [
            {
              "type": "category",
              "label": "Circuits",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/circuits/circuit"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/circuits/circuitgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/circuits/circuitgroupassignment"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/circuits/circuittermination"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/circuits/circuittype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/circuits/provider"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/circuits/provideraccount"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/circuits/providernetwork"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/circuits/virtualcircuit"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/circuits/virtualcircuittermination"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/circuits/virtualcircuittype"
                }
              ]
            },
            {
              "type": "category",
              "label": "Core",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/core/datafile"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/core/datasource"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/core/job"
                }
              ]
            },
            {
              "type": "category",
              "label": "Dcim",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/cable"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/consoleport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/consoleporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/consoleserverport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/consoleserverporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/device"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/devicebay"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/devicebaytemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/devicerole"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/devicetype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/frontport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/frontporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/interface"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/interfacetemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/inventoryitem"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/inventoryitemrole"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/inventoryitemtemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/location"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/macaddress"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/manufacturer"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/module"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/modulebay"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/modulebaytemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/moduletype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/platform"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/powerfeed"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/poweroutlet"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/poweroutlettemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/powerpanel"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/powerport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/powerporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/rack"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/rackreservation"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/rackrole"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/racktype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/rearport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/rearporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/region"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/site"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/sitegroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/virtualchassis"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/dcim/virtualdevicecontext"
                }
              ]
            },
            {
              "type": "category",
              "label": "Extras",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/extras/bookmark"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/extras/branch"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/extras/configcontext"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/extras/configtemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/extras/customfield"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/extras/customfieldchoiceset"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/extras/customlink"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/extras/eventrule"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/extras/exporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/extras/imageattachment"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/extras/journalentry"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/extras/notification"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/extras/notificationgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/extras/savedfilter"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/extras/stagedchange"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/extras/subscription"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/extras/tag"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/extras/webhook"
                }
              ]
            },
            {
              "type": "category",
              "label": "Ipam",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/ipam/aggregate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/ipam/asn"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/ipam/asnrange"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/ipam/fhrpgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/ipam/fhrpgroupassignment"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/ipam/ipaddress"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/ipam/iprange"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/ipam/prefix"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/ipam/rir"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/ipam/role"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/ipam/routetarget"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/ipam/service"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/ipam/servicetemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/ipam/vlan"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/ipam/vlangroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/ipam/vlantranslationpolicy"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/ipam/vlantranslationrule"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/ipam/vrf"
                }
              ]
            },
            {
              "type": "category",
              "label": "Tenancy",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/tenancy/contact"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/tenancy/contactgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/tenancy/contactrole"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/tenancy/tenant"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/tenancy/tenantgroup"
                }
              ]
            },
            {
              "type": "category",
              "label": "Virtualization",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/virtualization/cluster"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/virtualization/clustergroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/virtualization/clustertype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/virtualization/virtualdisk"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/virtualization/virtualmachine"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/virtualization/vminterface"
                }
              ]
            },
            {
              "type": "category",
              "label": "Vpn",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/vpn/ikepolicy"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/vpn/ikeproposal"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/vpn/ipsecpolicy"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/vpn/ipsecprofile"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/vpn/ipsecproposal"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/vpn/l2vpn"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/vpn/l2vpntermination"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/vpn/tunnel"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/vpn/tunnelgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/vpn/tunneltermination"
                }
              ]
            },
            {
              "type": "category",
              "label": "Wireless",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/wireless/wirelesslan"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/wireless/wirelesslangroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/models/wireless/wirelesslink"
                }
              ]
            }
          ]
        },
        {
          "type": "category",
          "label": "Plugins",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.2/plugins/index"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/plugins/installation"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/plugins/removal"
            },
            {
              "type": "category",
              "label": "Development",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.2/plugins/development/index"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/plugins/development/background-jobs"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/plugins/development/dashboard-widgets"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/plugins/development/data-backends"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/plugins/development/event-types"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/plugins/development/exceptions"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/plugins/development/filtersets"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/plugins/development/forms"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/plugins/development/graphql-api"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/plugins/development/migration-v4"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/plugins/development/models"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/plugins/development/navigation"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/plugins/development/rest-api"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/plugins/development/search"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/plugins/development/staged-changes"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/plugins/development/tables"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/plugins/development/templates"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.2/plugins/development/views"
                }
              ]
            }
          ]
        },
        {
          "type": "category",
          "label": "Reference",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.2/reference/conditions"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/reference/filtering"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/reference/markdown"
            }
          ]
        },
        {
          "type": "category",
          "label": "Release Notes",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.2/release-notes/index"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/release-notes/version-2.0"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/release-notes/version-2.1"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/release-notes/version-2.10"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/release-notes/version-2.11"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/release-notes/version-2.2"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/release-notes/version-2.3"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/release-notes/version-2.4"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/release-notes/version-2.5"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/release-notes/version-2.6"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/release-notes/version-2.7"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/release-notes/version-2.8"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/release-notes/version-2.9"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/release-notes/version-3.0"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/release-notes/version-3.1"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/release-notes/version-3.2"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/release-notes/version-3.3"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/release-notes/version-3.4"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/release-notes/version-3.5"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/release-notes/version-3.6"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/release-notes/version-3.7"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/release-notes/version-4.0"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/release-notes/version-4.1"
            },
            {
              "type": "doc",
              "id": "netbox/v4.2/release-notes/version-4.2"
            }
          ]
        }
      ]
    },
    {
      "type": "category",
      "collapsed": true,
      "label": "v4.1",
      "items": [
        {
          "type": "doc",
          "id": "netbox/v4.1/index"
        },
        {
          "type": "doc",
          "id": "netbox/v4.1/introduction"
        },
        {
          "type": "category",
          "label": "Administration",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.1/administration/error-reporting"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/administration/housekeeping"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/administration/netbox-shell"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/administration/permissions"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/administration/replicating-netbox"
            },
            {
              "type": "category",
              "label": "Authentication",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.1/administration/authentication/google"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/administration/authentication/microsoft-entra-id"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/administration/authentication/okta"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/administration/authentication/overview"
                }
              ]
            }
          ]
        },
        {
          "type": "category",
          "label": "Configuration",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.1/configuration/index"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/configuration/data-validation"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/configuration/default-values"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/configuration/development"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/configuration/error-reporting"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/configuration/graphql-api"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/configuration/miscellaneous"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/configuration/plugins"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/configuration/remote-authentication"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/configuration/required-parameters"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/configuration/security"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/configuration/system"
            }
          ]
        },
        {
          "type": "category",
          "label": "Customization",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.1/customization/custom-fields"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/customization/custom-links"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/customization/custom-scripts"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/customization/custom-validation"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/customization/export-templates"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/customization/reports"
            }
          ]
        },
        {
          "type": "category",
          "label": "Development",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.1/development/index"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/development/adding-models"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/development/application-registry"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/development/extending-models"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/development/getting-started"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/development/git-cheat-sheet"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/development/internationalization"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/development/models"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/development/release-checklist"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/development/search"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/development/signals"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/development/style-guide"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/development/translations"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/development/user-preferences"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/development/web-ui"
            }
          ]
        },
        {
          "type": "category",
          "label": "Features",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.1/features/api-integration"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/features/authentication-permissions"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/features/background-jobs"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/features/change-logging"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/features/circuits"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/features/configuration-rendering"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/features/contacts"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/features/context-data"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/features/customization"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/features/devices-cabling"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/features/event-rules"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/features/facilities"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/features/ipam"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/features/journaling"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/features/l2vpn-overlay"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/features/notifications"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/features/power-tracking"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/features/search"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/features/synchronized-data"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/features/tenancy"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/features/virtualization"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/features/vlan-management"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/features/vpn-tunnels"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/features/wireless"
            }
          ]
        },
        {
          "type": "category",
          "label": "Getting Started",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.1/getting-started/planning"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/getting-started/populating-data"
            }
          ]
        },
        {
          "type": "category",
          "label": "Installation",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.1/installation/index"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/installation/postgresql"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/installation/redis"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/installation/netbox"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/installation/4a-gunicorn"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/installation/4b-uwsgi"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/installation/http-server"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/installation/ldap"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/installation/upgrading"
            }
          ]
        },
        {
          "type": "category",
          "label": "Integrations",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.1/integrations/graphql-api"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/integrations/prometheus-metrics"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/integrations/rest-api"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/integrations/synchronized-data"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/integrations/webhooks"
            }
          ]
        },
        {
          "type": "category",
          "label": "Models",
          "collapsed": true,
          "items": [
            {
              "type": "category",
              "label": "Circuits",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/circuits/circuit"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/circuits/circuitgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/circuits/circuitgroupassignment"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/circuits/circuittermination"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/circuits/circuittype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/circuits/provider"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/circuits/provideraccount"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/circuits/providernetwork"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/circuits/virtualcircuit"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/circuits/virtualcircuittermination"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/circuits/virtualcircuittype"
                }
              ]
            },
            {
              "type": "category",
              "label": "Core",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/core/datafile"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/core/datasource"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/core/job"
                }
              ]
            },
            {
              "type": "category",
              "label": "Dcim",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/cable"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/consoleport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/consoleporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/consoleserverport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/consoleserverporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/device"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/devicebay"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/devicebaytemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/devicerole"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/devicetype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/frontport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/frontporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/interface"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/interfacetemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/inventoryitem"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/inventoryitemrole"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/inventoryitemtemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/location"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/macaddress"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/manufacturer"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/module"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/modulebay"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/modulebaytemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/moduletype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/platform"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/powerfeed"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/poweroutlet"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/poweroutlettemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/powerpanel"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/powerport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/powerporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/rack"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/rackreservation"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/rackrole"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/racktype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/rearport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/rearporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/region"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/site"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/sitegroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/virtualchassis"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/dcim/virtualdevicecontext"
                }
              ]
            },
            {
              "type": "category",
              "label": "Extras",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/extras/bookmark"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/extras/branch"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/extras/configcontext"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/extras/configtemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/extras/customfield"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/extras/customfieldchoiceset"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/extras/customlink"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/extras/eventrule"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/extras/exporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/extras/imageattachment"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/extras/journalentry"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/extras/notification"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/extras/notificationgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/extras/savedfilter"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/extras/stagedchange"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/extras/subscription"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/extras/tag"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/extras/webhook"
                }
              ]
            },
            {
              "type": "category",
              "label": "Ipam",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/ipam/aggregate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/ipam/asn"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/ipam/asnrange"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/ipam/fhrpgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/ipam/fhrpgroupassignment"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/ipam/ipaddress"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/ipam/iprange"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/ipam/prefix"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/ipam/rir"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/ipam/role"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/ipam/routetarget"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/ipam/service"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/ipam/servicetemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/ipam/vlan"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/ipam/vlangroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/ipam/vlantranslationpolicy"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/ipam/vlantranslationrule"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/ipam/vrf"
                }
              ]
            },
            {
              "type": "category",
              "label": "Tenancy",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/tenancy/contact"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/tenancy/contactgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/tenancy/contactrole"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/tenancy/tenant"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/tenancy/tenantgroup"
                }
              ]
            },
            {
              "type": "category",
              "label": "Virtualization",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/virtualization/cluster"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/virtualization/clustergroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/virtualization/clustertype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/virtualization/virtualdisk"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/virtualization/virtualmachine"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/virtualization/vminterface"
                }
              ]
            },
            {
              "type": "category",
              "label": "Vpn",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/vpn/ikepolicy"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/vpn/ikeproposal"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/vpn/ipsecpolicy"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/vpn/ipsecprofile"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/vpn/ipsecproposal"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/vpn/l2vpn"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/vpn/l2vpntermination"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/vpn/tunnel"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/vpn/tunnelgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/vpn/tunneltermination"
                }
              ]
            },
            {
              "type": "category",
              "label": "Wireless",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/wireless/wirelesslan"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/wireless/wirelesslangroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/models/wireless/wirelesslink"
                }
              ]
            }
          ]
        },
        {
          "type": "category",
          "label": "Plugins",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.1/plugins/index"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/plugins/installation"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/plugins/removal"
            },
            {
              "type": "category",
              "label": "Development",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v4.1/plugins/development/index"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/plugins/development/background-jobs"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/plugins/development/dashboard-widgets"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/plugins/development/data-backends"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/plugins/development/event-types"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/plugins/development/exceptions"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/plugins/development/filtersets"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/plugins/development/forms"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/plugins/development/graphql-api"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/plugins/development/migration-v4"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/plugins/development/models"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/plugins/development/navigation"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/plugins/development/rest-api"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/plugins/development/search"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/plugins/development/staged-changes"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/plugins/development/tables"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/plugins/development/templates"
                },
                {
                  "type": "doc",
                  "id": "netbox/v4.1/plugins/development/views"
                }
              ]
            }
          ]
        },
        {
          "type": "category",
          "label": "Reference",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.1/reference/conditions"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/reference/filtering"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/reference/markdown"
            }
          ]
        },
        {
          "type": "category",
          "label": "Release Notes",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v4.1/release-notes/index"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/release-notes/version-2.0"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/release-notes/version-2.1"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/release-notes/version-2.10"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/release-notes/version-2.11"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/release-notes/version-2.2"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/release-notes/version-2.3"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/release-notes/version-2.4"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/release-notes/version-2.5"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/release-notes/version-2.6"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/release-notes/version-2.7"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/release-notes/version-2.8"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/release-notes/version-2.9"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/release-notes/version-3.0"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/release-notes/version-3.1"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/release-notes/version-3.2"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/release-notes/version-3.3"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/release-notes/version-3.4"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/release-notes/version-3.5"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/release-notes/version-3.6"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/release-notes/version-3.7"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/release-notes/version-4.0"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/release-notes/version-4.1"
            },
            {
              "type": "doc",
              "id": "netbox/v4.1/release-notes/version-4.2"
            }
          ]
        }
      ]
    },
    {
      "type": "category",
      "collapsed": true,
      "label": "v3.7",
      "items": [
        {
          "type": "doc",
          "id": "netbox/v3.7/index"
        },
        {
          "type": "doc",
          "id": "netbox/v3.7/introduction"
        },
        {
          "type": "category",
          "label": "Administration",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v3.7/administration/error-reporting"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/administration/housekeeping"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/administration/netbox-shell"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/administration/permissions"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/administration/replicating-netbox"
            },
            {
              "type": "category",
              "label": "Authentication",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v3.7/administration/authentication/microsoft-azure-ad"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/administration/authentication/okta"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/administration/authentication/overview"
                }
              ]
            }
          ]
        },
        {
          "type": "category",
          "label": "Configuration",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v3.7/configuration/index"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/configuration/data-validation"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/configuration/date-time"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/configuration/default-values"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/configuration/development"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/configuration/error-reporting"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/configuration/miscellaneous"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/configuration/plugins"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/configuration/remote-authentication"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/configuration/required-parameters"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/configuration/security"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/configuration/system"
            }
          ]
        },
        {
          "type": "category",
          "label": "Customization",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v3.7/customization/custom-fields"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/customization/custom-links"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/customization/custom-scripts"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/customization/custom-validation"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/customization/export-templates"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/customization/reports"
            }
          ]
        },
        {
          "type": "category",
          "label": "Development",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v3.7/development/index"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/development/adding-models"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/development/application-registry"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/development/extending-models"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/development/getting-started"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/development/git-cheat-sheet"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/development/internationalization"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/development/models"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/development/release-checklist"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/development/search"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/development/signals"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/development/style-guide"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/development/translations"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/development/user-preferences"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/development/web-ui"
            }
          ]
        },
        {
          "type": "category",
          "label": "Features",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v3.7/features/api-integration"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/features/authentication-permissions"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/features/background-jobs"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/features/change-logging"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/features/circuits"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/features/configuration-rendering"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/features/contacts"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/features/context-data"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/features/customization"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/features/devices-cabling"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/features/event-rules"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/features/facilities"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/features/ipam"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/features/journaling"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/features/l2vpn-overlay"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/features/power-tracking"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/features/search"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/features/synchronized-data"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/features/tenancy"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/features/virtualization"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/features/vlan-management"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/features/vpn-tunnels"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/features/wireless"
            }
          ]
        },
        {
          "type": "category",
          "label": "Getting Started",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v3.7/getting-started/planning"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/getting-started/populating-data"
            }
          ]
        },
        {
          "type": "category",
          "label": "Installation",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v3.7/installation/index"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/installation/postgresql"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/installation/redis"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/installation/netbox"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/installation/gunicorn"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/installation/http-server"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/installation/ldap"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/installation/upgrading"
            }
          ]
        },
        {
          "type": "category",
          "label": "Integrations",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v3.7/integrations/graphql-api"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/integrations/prometheus-metrics"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/integrations/rest-api"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/integrations/synchronized-data"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/integrations/webhooks"
            }
          ]
        },
        {
          "type": "category",
          "label": "Models",
          "collapsed": true,
          "items": [
            {
              "type": "category",
              "label": "Circuits",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/circuits/circuit"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/circuits/circuittermination"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/circuits/circuittype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/circuits/provider"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/circuits/provideraccount"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/circuits/providernetwork"
                }
              ]
            },
            {
              "type": "category",
              "label": "Core",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/core/datafile"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/core/datasource"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/core/job"
                }
              ]
            },
            {
              "type": "category",
              "label": "Dcim",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/cable"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/consoleport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/consoleporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/consoleserverport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/consoleserverporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/device"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/devicebay"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/devicebaytemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/devicerole"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/devicetype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/frontport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/frontporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/interface"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/interfacetemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/inventoryitem"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/inventoryitemrole"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/inventoryitemtemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/location"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/manufacturer"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/module"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/modulebay"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/modulebaytemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/moduletype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/platform"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/powerfeed"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/poweroutlet"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/poweroutlettemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/powerpanel"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/powerport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/powerporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/rack"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/rackreservation"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/rackrole"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/rearport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/rearporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/region"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/site"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/sitegroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/virtualchassis"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/dcim/virtualdevicecontext"
                }
              ]
            },
            {
              "type": "category",
              "label": "Extras",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/extras/bookmark"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/extras/branch"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/extras/configcontext"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/extras/configtemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/extras/customfield"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/extras/customfieldchoiceset"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/extras/customlink"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/extras/eventrule"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/extras/exporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/extras/imageattachment"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/extras/journalentry"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/extras/savedfilter"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/extras/stagedchange"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/extras/tag"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/extras/webhook"
                }
              ]
            },
            {
              "type": "category",
              "label": "Ipam",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/ipam/aggregate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/ipam/asn"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/ipam/asnrange"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/ipam/fhrpgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/ipam/fhrpgroupassignment"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/ipam/ipaddress"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/ipam/iprange"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/ipam/prefix"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/ipam/rir"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/ipam/role"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/ipam/routetarget"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/ipam/service"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/ipam/servicetemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/ipam/vlan"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/ipam/vlangroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/ipam/vrf"
                }
              ]
            },
            {
              "type": "category",
              "label": "Tenancy",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/tenancy/contact"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/tenancy/contactgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/tenancy/contactrole"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/tenancy/tenant"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/tenancy/tenantgroup"
                }
              ]
            },
            {
              "type": "category",
              "label": "Virtualization",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/virtualization/cluster"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/virtualization/clustergroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/virtualization/clustertype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/virtualization/virtualdisk"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/virtualization/virtualmachine"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/virtualization/vminterface"
                }
              ]
            },
            {
              "type": "category",
              "label": "Vpn",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/vpn/ikepolicy"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/vpn/ikeproposal"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/vpn/ipsecpolicy"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/vpn/ipsecprofile"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/vpn/ipsecproposal"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/vpn/l2vpn"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/vpn/l2vpntermination"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/vpn/tunnel"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/vpn/tunnelgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/vpn/tunneltermination"
                }
              ]
            },
            {
              "type": "category",
              "label": "Wireless",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/wireless/wirelesslan"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/wireless/wirelesslangroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/models/wireless/wirelesslink"
                }
              ]
            }
          ]
        },
        {
          "type": "category",
          "label": "Plugins",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v3.7/plugins/index"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/plugins/installation"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/plugins/removal"
            },
            {
              "type": "category",
              "label": "Development",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v3.7/plugins/development/index"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/plugins/development/background-tasks"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/plugins/development/dashboard-widgets"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/plugins/development/data-backends"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/plugins/development/exceptions"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/plugins/development/filtersets"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/plugins/development/forms"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/plugins/development/graphql-api"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/plugins/development/models"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/plugins/development/navigation"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/plugins/development/rest-api"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/plugins/development/search"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/plugins/development/staged-changes"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/plugins/development/tables"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/plugins/development/templates"
                },
                {
                  "type": "doc",
                  "id": "netbox/v3.7/plugins/development/views"
                }
              ]
            }
          ]
        },
        {
          "type": "category",
          "label": "Reference",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v3.7/reference/conditions"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/reference/filtering"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/reference/markdown"
            }
          ]
        },
        {
          "type": "category",
          "label": "Release Notes",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v3.7/release-notes/index"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/release-notes/version-2.0"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/release-notes/version-2.1"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/release-notes/version-2.10"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/release-notes/version-2.11"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/release-notes/version-2.2"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/release-notes/version-2.3"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/release-notes/version-2.4"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/release-notes/version-2.5"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/release-notes/version-2.6"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/release-notes/version-2.7"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/release-notes/version-2.8"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/release-notes/version-2.9"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/release-notes/version-3.0"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/release-notes/version-3.1"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/release-notes/version-3.2"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/release-notes/version-3.3"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/release-notes/version-3.4"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/release-notes/version-3.5"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/release-notes/version-3.6"
            },
            {
              "type": "doc",
              "id": "netbox/v3.7/release-notes/version-3.7"
            }
          ]
        }
      ]
    },
    {
      "type": "category",
      "collapsed": true,
      "label": "v1.0.0",
      "items": [
        {
          "type": "doc",
          "id": "netbox/v1.0.0/index"
        },
        {
          "type": "doc",
          "id": "netbox/v1.0.0/introduction"
        },
        {
          "type": "category",
          "label": "Administration",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v1.0.0/administration/index"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/administration/error-reporting"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/administration/netbox-shell"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/administration/permissions"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/administration/replicating-netbox"
            },
            {
              "type": "category",
              "label": "Authentication",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/administration/authentication/google"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/administration/authentication/microsoft-entra-id"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/administration/authentication/okta"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/administration/authentication/overview"
                }
              ]
            }
          ]
        },
        {
          "type": "category",
          "label": "Best Practices",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v1.0.0/best-practices/index"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/best-practices/modeling-pluggable-transceivers"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/best-practices/performance-handbook"
            }
          ]
        },
        {
          "type": "category",
          "label": "Configuration",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v1.0.0/configuration/index"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/configuration/data-validation"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/configuration/default-values"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/configuration/development"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/configuration/error-reporting"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/configuration/graphql-api"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/configuration/miscellaneous"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/configuration/plugins"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/configuration/remote-authentication"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/configuration/required-parameters"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/configuration/security"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/configuration/system"
            }
          ]
        },
        {
          "type": "category",
          "label": "Customization",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v1.0.0/customization/index"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/customization/custom-fields"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/customization/custom-links"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/customization/custom-scripts"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/customization/custom-validation"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/customization/export-templates"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/customization/reports"
            }
          ]
        },
        {
          "type": "category",
          "label": "Development",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v1.0.0/development/index"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/development/adding-models"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/development/application-registry"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/development/extending-models"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/development/getting-started"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/development/git-cheat-sheet"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/development/internationalization"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/development/models"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/development/release-checklist"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/development/search"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/development/signals"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/development/style-guide"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/development/translations"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/development/user-preferences"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/development/web-ui"
            }
          ]
        },
        {
          "type": "category",
          "label": "Features",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/index"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/api-integration"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/authentication-permissions"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/background-jobs"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/change-logging"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/circuits"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/configuration-rendering"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/contacts"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/context-data"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/customization"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/devices-cabling"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/event-rules"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/facilities"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/ipam"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/journaling"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/l2vpn-overlay"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/notifications"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/power-tracking"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/resource-ownership"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/search"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/synchronized-data"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/tenancy"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/user-preferences"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/virtualization"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/vlan-management"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/vpn-tunnels"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/features/wireless"
            }
          ]
        },
        {
          "type": "category",
          "label": "Getting Started",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v1.0.0/getting-started/index"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/getting-started/planning"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/getting-started/populating-data"
            }
          ]
        },
        {
          "type": "category",
          "label": "Installation",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v1.0.0/installation/index"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/installation/postgresql"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/installation/redis"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/installation/netbox"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/installation/4a-gunicorn"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/installation/4b-uwsgi"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/installation/http-server"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/installation/ldap"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/installation/upgrading"
            }
          ]
        },
        {
          "type": "category",
          "label": "Integrations",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v1.0.0/integrations/index"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/integrations/graphql-api"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/integrations/prometheus-metrics"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/integrations/rest-api"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/integrations/synchronized-data"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/integrations/webhooks"
            }
          ]
        },
        {
          "type": "category",
          "label": "Models",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v1.0.0/models/index"
            },
            {
              "type": "category",
              "label": "Circuits",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/circuits/circuit"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/circuits/circuitgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/circuits/circuitgroupassignment"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/circuits/circuittermination"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/circuits/circuittype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/circuits/provider"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/circuits/provideraccount"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/circuits/providernetwork"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/circuits/virtualcircuit"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/circuits/virtualcircuittermination"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/circuits/virtualcircuittype"
                }
              ]
            },
            {
              "type": "category",
              "label": "Core",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/core/datafile"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/core/datasource"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/core/job"
                }
              ]
            },
            {
              "type": "category",
              "label": "Dcim",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/cable"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/consoleport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/consoleporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/consoleserverport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/consoleserverporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/device"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/devicebay"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/devicebaytemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/devicerole"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/devicetype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/frontport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/frontporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/interface"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/interfacetemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/inventoryitem"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/inventoryitemrole"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/inventoryitemtemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/location"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/macaddress"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/manufacturer"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/module"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/modulebay"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/modulebaytemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/moduletype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/moduletypeprofile"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/platform"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/powerfeed"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/poweroutlet"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/poweroutlettemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/powerpanel"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/powerport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/powerporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/rack"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/rackreservation"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/rackrole"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/racktype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/rearport"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/rearporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/region"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/site"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/sitegroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/virtualchassis"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/dcim/virtualdevicecontext"
                }
              ]
            },
            {
              "type": "category",
              "label": "Extras",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/extras/bookmark"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/extras/configcontext"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/extras/configcontextprofile"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/extras/configtemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/extras/customfield"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/extras/customfieldchoiceset"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/extras/customlink"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/extras/eventrule"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/extras/exporttemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/extras/imageattachment"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/extras/journalentry"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/extras/notification"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/extras/notificationgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/extras/savedfilter"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/extras/subscription"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/extras/tableconfig"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/extras/tag"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/extras/webhook"
                }
              ]
            },
            {
              "type": "category",
              "label": "Ipam",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/ipam/aggregate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/ipam/asn"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/ipam/asnrange"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/ipam/fhrpgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/ipam/fhrpgroupassignment"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/ipam/ipaddress"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/ipam/iprange"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/ipam/prefix"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/ipam/rir"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/ipam/role"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/ipam/routetarget"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/ipam/service"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/ipam/servicetemplate"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/ipam/vlan"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/ipam/vlangroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/ipam/vlantranslationpolicy"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/ipam/vlantranslationrule"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/ipam/vrf"
                }
              ]
            },
            {
              "type": "category",
              "label": "Tenancy",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/tenancy/contact"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/tenancy/contactgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/tenancy/contactrole"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/tenancy/tenant"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/tenancy/tenantgroup"
                }
              ]
            },
            {
              "type": "category",
              "label": "Users",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/users/owner"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/users/ownergroup"
                }
              ]
            },
            {
              "type": "category",
              "label": "Virtualization",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/virtualization/cluster"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/virtualization/clustergroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/virtualization/clustertype"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/virtualization/virtualdisk"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/virtualization/virtualmachine"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/virtualization/vminterface"
                }
              ]
            },
            {
              "type": "category",
              "label": "Vpn",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/vpn/ikepolicy"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/vpn/ikeproposal"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/vpn/ipsecpolicy"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/vpn/ipsecprofile"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/vpn/ipsecproposal"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/vpn/l2vpn"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/vpn/l2vpntermination"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/vpn/tunnel"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/vpn/tunnelgroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/vpn/tunneltermination"
                }
              ]
            },
            {
              "type": "category",
              "label": "Wireless",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/wireless/wirelesslan"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/wireless/wirelesslangroup"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/models/wireless/wirelesslink"
                }
              ]
            }
          ]
        },
        {
          "type": "category",
          "label": "Plugins",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v1.0.0/plugins/index"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/plugins/installation"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/plugins/removal"
            },
            {
              "type": "category",
              "label": "Development",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/plugins/development/index"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/plugins/development/background-jobs"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/plugins/development/dashboard-widgets"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/plugins/development/data-backends"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/plugins/development/event-types"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/plugins/development/exceptions"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/plugins/development/filtersets"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/plugins/development/forms"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/plugins/development/graphql-api"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/plugins/development/migration-v4"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/plugins/development/models"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/plugins/development/navigation"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/plugins/development/rest-api"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/plugins/development/search"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/plugins/development/tables"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/plugins/development/templates"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/plugins/development/ui-components"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/plugins/development/user-interface"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/plugins/development/views"
                },
                {
                  "type": "doc",
                  "id": "netbox/v1.0.0/plugins/development/webhooks"
                }
              ]
            }
          ]
        },
        {
          "type": "category",
          "label": "Reference",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v1.0.0/reference/index"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/reference/conditions"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/reference/filtering"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/reference/markdown"
            }
          ]
        },
        {
          "type": "category",
          "label": "Release Notes",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/index"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-2.0"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-2.1"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-2.10"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-2.11"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-2.2"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-2.3"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-2.4"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-2.5"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-2.6"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-2.7"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-2.8"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-2.9"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-3.0"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-3.1"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-3.2"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-3.3"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-3.4"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-3.5"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-3.6"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-3.7"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-4.0"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-4.1"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-4.2"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-4.3"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-4.4"
            },
            {
              "type": "doc",
              "id": "netbox/v1.0.0/release-notes/version-4.5"
            }
          ]
        }
      ]
    }
  ],
  "orb-agent": [
    {
      "type": "doc",
      "id": "orb-agent/index"
    },
    {
      "type": "category",
      "collapsed": false,
      "label": "v1.0.0",
      "items": [
        {
          "type": "doc",
          "id": "orb-agent/v1.0.0/index"
        },
        {
          "type": "doc",
          "id": "orb-agent/v1.0.0/SECURITY"
        },
        {
          "type": "doc",
          "id": "orb-agent/v1.0.0/config_samples"
        },
        {
          "type": "category",
          "label": "Agent",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "orb-agent/v1.0.0/agent/index"
            }
          ]
        },
        {
          "type": "category",
          "label": "Backends",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "orb-agent/v1.0.0/backends/index"
            },
            {
              "type": "doc",
              "id": "orb-agent/v1.0.0/backends/device_discovery"
            },
            {
              "type": "doc",
              "id": "orb-agent/v1.0.0/backends/device_discovery_interface"
            },
            {
              "type": "doc",
              "id": "orb-agent/v1.0.0/backends/network_discovery"
            },
            {
              "type": "doc",
              "id": "orb-agent/v1.0.0/backends/opentelemetry_infinity"
            },
            {
              "type": "doc",
              "id": "orb-agent/v1.0.0/backends/pktvisor"
            },
            {
              "type": "doc",
              "id": "orb-agent/v1.0.0/backends/snmp_discovery"
            },
            {
              "type": "doc",
              "id": "orb-agent/v1.0.0/backends/snmp_discovery_interface"
            },
            {
              "type": "doc",
              "id": "orb-agent/v1.0.0/backends/worker"
            }
          ]
        },
        {
          "type": "category",
          "label": "Configs",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "orb-agent/v1.0.0/configs/index"
            },
            {
              "type": "doc",
              "id": "orb-agent/v1.0.0/configs/git"
            },
            {
              "type": "doc",
              "id": "orb-agent/v1.0.0/configs/local"
            }
          ]
        },
        {
          "type": "category",
          "label": "Docs",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "orb-agent/v1.0.0/docs/index"
            },
            {
              "type": "doc",
              "id": "orb-agent/v1.0.0/docs/config_samples"
            },
            {
              "type": "category",
              "label": "Backends",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "orb-agent/v1.0.0/docs/backends/device_discovery"
                },
                {
                  "type": "doc",
                  "id": "orb-agent/v1.0.0/docs/backends/device_discovery_interface"
                },
                {
                  "type": "doc",
                  "id": "orb-agent/v1.0.0/docs/backends/network_discovery"
                },
                {
                  "type": "doc",
                  "id": "orb-agent/v1.0.0/docs/backends/opentelemetry_infinity"
                },
                {
                  "type": "doc",
                  "id": "orb-agent/v1.0.0/docs/backends/pktvisor"
                },
                {
                  "type": "doc",
                  "id": "orb-agent/v1.0.0/docs/backends/snmp_discovery"
                },
                {
                  "type": "doc",
                  "id": "orb-agent/v1.0.0/docs/backends/snmp_discovery_interface"
                },
                {
                  "type": "doc",
                  "id": "orb-agent/v1.0.0/docs/backends/worker"
                }
              ]
            },
            {
              "type": "category",
              "label": "Configs",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "orb-agent/v1.0.0/docs/configs/git"
                },
                {
                  "type": "doc",
                  "id": "orb-agent/v1.0.0/docs/configs/local"
                }
              ]
            },
            {
              "type": "category",
              "label": "Secretsmgr",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "orb-agent/v1.0.0/docs/secretsmgr/vault"
                }
              ]
            }
          ]
        },
        {
          "type": "category",
          "label": "Secretsmgr",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "orb-agent/v1.0.0/secretsmgr/index"
            },
            {
              "type": "doc",
              "id": "orb-agent/v1.0.0/secretsmgr/vault"
            }
          ]
        }
      ]
    }
  ],
  "preview": [
    {
      "type": "doc",
      "id": "preview/index"
    },
    {
      "type": "category",
      "collapsed": false,
      "label": "v1.0.0",
      "items": [
        {
          "type": "doc",
          "id": "preview/v1.0.0/index"
        },
        {
          "type": "category",
          "label": "Helm",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "preview/v1.0.0/helm/index"
            },
            {
              "type": "category",
              "label": "Components",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "preview/v1.0.0/helm/components/README"
                }
              ]
            },
            {
              "type": "category",
              "label": "V1.11",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "preview/v1.0.0/helm/v1.11/README"
                },
                {
                  "type": "doc",
                  "id": "preview/v1.0.0/helm/v1.11/netbox-enterprise-helm-install"
                },
                {
                  "type": "doc",
                  "id": "preview/v1.0.0/helm/v1.11/netbox-enterprise-helm-operations"
                },
                {
                  "type": "doc",
                  "id": "preview/v1.0.0/helm/v1.11/netbox-enterprise-helm-overview"
                },
                {
                  "type": "doc",
                  "id": "preview/v1.0.0/helm/v1.11/netbox-enterprise-helm-prerequisites"
                },
                {
                  "type": "doc",
                  "id": "preview/v1.0.0/helm/v1.11/netbox-enterprise-helm-troubleshooting"
                },
                {
                  "type": "category",
                  "label": "Advanced",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "preview/v1.0.0/helm/v1.11/advanced/netbox-enterprise-helm-advanced-configuration"
                    },
                    {
                      "type": "doc",
                      "id": "preview/v1.0.0/helm/v1.11/advanced/netbox-enterprise-helm-deployment-examples"
                    },
                    {
                      "type": "doc",
                      "id": "preview/v1.0.0/helm/v1.11/advanced/netbox-enterprise-helm-external-database"
                    },
                    {
                      "type": "doc",
                      "id": "preview/v1.0.0/helm/v1.11/advanced/netbox-enterprise-helm-private-registry"
                    }
                  ]
                },
                {
                  "type": "category",
                  "label": "Components",
                  "collapsed": true,
                  "items": [
                    {
                      "type": "doc",
                      "id": "preview/v1.0.0/helm/v1.11/components/README"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "sdks": [
    {
      "type": "doc",
      "id": "sdks/index"
    },
    {
      "type": "category",
      "collapsed": false,
      "label": "v1.0.0",
      "items": [
        {
          "type": "doc",
          "id": "sdks/v1.0.0/index"
        },
        {
          "type": "category",
          "label": "Pynetbox",
          "collapsed": true,
          "items": [
            {
              "type": "doc",
              "id": "sdks/v1.0.0/pynetbox/index"
            },
            {
              "type": "doc",
              "id": "sdks/v1.0.0/pynetbox/IPAM"
            },
            {
              "type": "doc",
              "id": "sdks/v1.0.0/pynetbox/advanced"
            },
            {
              "type": "doc",
              "id": "sdks/v1.0.0/pynetbox/branching"
            },
            {
              "type": "doc",
              "id": "sdks/v1.0.0/pynetbox/dcim"
            },
            {
              "type": "doc",
              "id": "sdks/v1.0.0/pynetbox/endpoint"
            },
            {
              "type": "doc",
              "id": "sdks/v1.0.0/pynetbox/getting-started"
            },
            {
              "type": "doc",
              "id": "sdks/v1.0.0/pynetbox/installation"
            },
            {
              "type": "doc",
              "id": "sdks/v1.0.0/pynetbox/release-notes"
            },
            {
              "type": "doc",
              "id": "sdks/v1.0.0/pynetbox/request"
            },
            {
              "type": "doc",
              "id": "sdks/v1.0.0/pynetbox/response"
            },
            {
              "type": "doc",
              "id": "sdks/v1.0.0/pynetbox/virtualization"
            },
            {
              "type": "category",
              "label": "Development",
              "collapsed": true,
              "items": [
                {
                  "type": "doc",
                  "id": "sdks/v1.0.0/pynetbox/development/index"
                },
                {
                  "type": "doc",
                  "id": "sdks/v1.0.0/pynetbox/development/getting-started"
                },
                {
                  "type": "doc",
                  "id": "sdks/v1.0.0/pynetbox/development/release-checklist"
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "shared": [
    {
      "type": "doc",
      "id": "shared/index"
    },
    {
      "type": "category",
      "collapsed": false,
      "label": "v1.0.0",
      "items": [
        {
          "type": "doc",
          "id": "shared/v1.0.0/index"
        },
        {
          "type": "doc",
          "id": "shared/v1.0.0/maintenance"
        },
        {
          "type": "doc",
          "id": "shared/v1.0.0/product_feature_lifecycle"
        }
      ]
    }
  ]
};

export default sidebars;
