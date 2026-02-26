---
source: localdocs
tags:
  - administration
  - authentication
  - cloud
  - getting-started
  - installation
  - netbox
versions:
  netbox_cloud: v1.10
status: current
title: 'NetBox Cloud: NetBox Cloud Console Access'
lastUpdatedAt: 1753958602000
canonical: /docs/cloud/console-administration/console-access/
---

# NetBox Cloud Console Access

You should already have access to the NetBox Labs [Console](https://console.netboxlabs.com/dashboard/) when you sign up for NetBox Cloud.

## How to Access the Console

There are two ways to access the NetBox Labs Console:

### Option 1: Direct URL Access

Simply go directly to the [NetBox Labs Console](https://console.netboxlabs.com/dashboard/) in your browser.

### Option 2: Access from NetBox Cloud UI

From within the NetBox Cloud Web Interface, you can easily switch to the NetBox Labs Console:

1. In the left hand main menu, click to expand the **NetBox Labs plugin** menu, and then click on **Open Console**:

    ![netbox labs plugin](/cloud-images/console/admin_console_from_ui_1.png)

2. This will take you directly to the NetBox Labs Console login page.

## Requesting Console Access

If you don't already have access to the console, you can request it by:

- Clicking **Request Console Access** in the **NetBox Labs plugin** menu from the NetBox Cloud web interface
- Then clicking the link to email the [NetBox Labs Support Team](mailto:support@netboxlabs.com) to request access

![request console access](/cloud-images/console/admin_console_from_ui_3.png)

:::note
If you encounter any issues when accessing the NetBox Labs Console, raise a support ticket by emailing the [NetBox Labs Support Team](mailto:support@netboxlabs.com)

:::
## Login and Account Setup

The NetBox Cloud team will set up your account with your email address as the username. You can login to the NetBox Labs Console using:

- **Email/Password**: Your email address and the password you set up when your account was created
- **Single Sign-On (SSO)**: Providers such as Google, GitHub, and Microsoft
- **Enterprise SSO**: Your organization's Identity Provider (IdP) if configured

![netbox labs console login](/cloud-images/console/admin-console-login.png)

## Using the Console

Once logged in, you will see all the NetBox Cloud instances running under your Organization, which you can administer from the console.

![view instances](/cloud-images/console_access/view_instances.png)

### Accessing Your NetBox Cloud Instances

To access a specific NetBox Cloud instance:

1. **Get the credentials**: Click to reveal or copy the admin credentials from the **Credentials** section:

    ![retrieve admin credentials](/cloud-images/console_access/get_credentials.png)

2. **Open the instance**: Click on either of the links to open the NetBox Cloud interface in a new browser window:

    ![launch ui](/cloud-images/console_access/launch_ui.png)

3. **Login to NetBox Cloud**: Use the username and password you copied from step 1:

    ![admin login](/cloud-images/console_access/admin_login.png)
