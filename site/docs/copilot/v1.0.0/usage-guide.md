---
lastUpdatedAt: 1764704736000
---
# NetBox Copilot Usage Guide

:::note
NetBox Copilot is currently in public preview. You may encounter bugs or inconsistencies. For questions or assistance, contact copilot-team@netboxlabs.com.
:::


A comprehensive guide to using NetBox Copilot effectively, including capabilities, best practices, troubleshooting, and frequently asked questions.

## Table of Contents

- [How It Works](#how-it-works)
- [What Copilot Can Do](#what-copilot-can-do)
- [Using Copilot Effectively](#using-copilot-effectively)
- [Troubleshooting](#troubleshooting)
- [Frequently Asked Questions](#frequently-asked-questions)
- [Providing Feedback](#providing-feedback)

---

## How It Works

Understanding how NetBox Copilot works will help you use it more effectively.

### Architecture Overview

NetBox Copilot uses a browser-based integration that:

- **Embeds directly in NetBox** without requiring modifications to your NetBox installation
- **Processes queries in the cloud** using advanced AI models optimized for NetBox
- **Executes securely in your browser** using your existing NetBox session
- **Authenticates with secure tokens** that automatically expire after 10 hours of inactivity for safety

There's no need to install software, modify NetBox files, or change your NetBox database. Copilot works entirely through your web browser.

### How a Query Works

When you ask Copilot a question, here's what happens:

1. **You ask a question** in the Copilot chat interface
2. **Context is captured** - Copilot knows what page you're viewing and what object you're looking at
3. **Query sent securely** to the NetBox Cloud backend for processing
4. **AI analyzes your question** and determines what NetBox data is needed
5. **Tools execute in your browser** using your NetBox API session and your permissions
6. **Results are processed** and formatted into a helpful response
7. **Response appears in chat** and Copilot is ready for the next question

This architecture ensures that Copilot always respects your NetBox permissions and that sensitive data is handled securely.

### Security Model

NetBox Copilot's security is designed to keep your data safe:

- **Uses your existing NetBox session** - No separate credentials needed for NetBox access
- **No NetBox credentials shared with Copilot** - Copilot never sees or stores your NetBox credentials
- **Secure communication** - All data transmitted between browser and cloud is encrypted
- **Token-based authentication** - Copilot uses secure tokens that expire after 10 hours of inactivity
- **Respects RBAC** - Copilot can see only what your NetBox permissions allow

For complete security and privacy details, see the [Privacy & Security](privacy-security.md) page.

### Administrator Configuration

NetBox administrators have control over Copilot availability for their instance:

**Global Configuration (NetBox 4.4.5+):**

NetBox provides a `COPILOT_ENABLED` configuration parameter that controls Copilot availability instance-wide. When enabled by an administrator, individual users can then enable or disable Copilot for themselves through their user preferences.

**User Preferences (NetBox 4.4.5+):**

When the global configuration allows Copilot, each user can control whether Copilot appears in their NetBox interface through their personal preferences. This allows organizations to make Copilot available without forcing it on users who prefer not to use it.

**Isolated Deployments:**

If NetBox is configured with `ISOLATED_DEPLOYMENT` enabled (meaning no external network access), Copilot will be automatically disabled since it requires access to the NetBox Cloud backend to function. This ensures Copilot respects air-gapped or isolated NetBox environments.

**For Users:**

If you don't see the Copilot preference option in your user settings (NetBox 4.4.5+), check with your NetBox administrator. They may have disabled Copilot globally for security, compliance, or operational reasons.

---

## What Copilot Can Do

NetBox Copilot provides several powerful capabilities for working with your NetBox data.

### Querying NetBox Data

Ask questions to find and filter NetBox objects across all types:

**Supported Object Types:**
- Devices, interfaces, cables, and connections
- IP addresses, prefixes, VLANs, and VRFs
- Sites, locations, racks, and power feeds
- Circuits, providers, and connections
- Virtual machines and clusters
- Tenants, contacts, and more
- Plugin object types - Copilot introspects your NetBox data model and can work with any data model

**Example Queries:**

```
"Show me all devices in the NYC datacenter"
"What IP addresses are available in 10.0.1.0/24?"
"Find all interfaces with MTU 9000"
"Show me devices with the role 'core-switch'"
"What VLANs are assigned to the production tenant?"
```

**Understanding Results:**

Copilot responses include:
- Natural language summaries of what was found
- Direct links to NetBox objects (click to navigate)
- Counts and statistics when relevant
- Explanations of how the data was gathered

### Analyzing Your Data

Go beyond simple queries to explore relationships and patterns:

**Cross-Object Analysis:**
```
"Which interfaces on switch01 are not connected?"
"Show me all devices in racks that are over 80% full"
"What VLANs are used in the datacenter site?"
"Find devices without a primary IP address"
"Which circuits are connected to devices in site ABC?"
```

**Multi-Step Analysis:**

Copilot can break down complex questions into multiple steps:
```
"Show me interfaces on all core switches in NYC that are disabled"
```

This query requires:
1. Finding core switches
2. Filtering by NYC site
3. Getting interfaces for those switches
4. Identifying which are tagged as disabled

Copilot handles this automatically.

### Change History and Audit {#change-history-audit}

Track what happened in your NetBox environment:

**Viewing Change History:**
```
"What changes were made to this device last week?"
"Show me the change history for device 123"
"Who modified this IP address?"
"What happened to this circuit in the past month?"
```

**Understanding Audit Information:**

Copilot shows:
- Who made the change (NetBox username)
- When it happened (timestamp)
- What changed (before and after values)
- Type of change (created, updated, deleted)

This is valuable for troubleshooting, compliance, and understanding your network's evolution.

### Navigation and Context Awareness {#navigation-context-awareness}

Copilot understands where you are in NetBox:

**Context-Aware Queries:**
- When viewing a device page: "What interfaces does this device have?"
- When viewing a site page: "How many racks are in this site?"
- When viewing an IP: "What device is this IP assigned to?"

**Benefits:**
- No need to repeat object names or IDs
- Faster queries with natural references
- Maintains context through conversations

**Selections:**

Copilot is aware of text you've selected on the page:
- Select a device type and ask "what kind of device is this?"
- Select a site name and ask "how many devices are in this site?"

**Navigation:**

Copilot can help you move around NetBox:
- Click any object link in responses to navigate
- Ask "show me device XYZ"
- Follow relationships naturally through conversation

### NetBox Documentation Access

Get help understanding NetBox features without leaving your workflow:

**Documentation Queries:**
```
"How do VRFs work in NetBox?"
"What's the difference between a site and a location?"
"How do I use cable traces?"
"What are device roles used for?"
"Explain NetBox's IPAM hierarchy"
```

**When to Use:**
- Learning NetBox concepts
- Understanding data models
- Getting guidance on NetBox features
- Clarifying terminology

Copilot searches NetBox's official documentation and provides relevant excerpts and links.

Copilot's documentation awareness is especially powerful when combined with its direct access to your NetBox data, e.g. "How do config contexts work and does my DNS setup in NYC follow best practices for config contexts?"

### Current Limitations (Public Preview)

During Public Preview, NetBox Copilot has some limitations:

**Read-Only Operations:**
- Cannot create, update, or delete NetBox objects
- Cannot make configuration changes
- Cannot execute write operations via API

Write operations are planned for post-GA releases.

**Other Limitations:**
- Cannot execute complex multi-step workflows automatically
- Response quality continues to improve with feedback

---

## Using Copilot Effectively

Get the most value from NetBox Copilot with these best practices.

### Asking Good Questions

The quality of Copilot's responses depends on how you phrase your questions.

**Be Specific:**

❌ "Show me stuff in NYC"
✅ "Show me all devices in NYC site"

❌ "What's available?"
✅ "What IP addresses are available in the 10.0.1.0/24 subnet?"

❌ "Check the switch"
✅ "Show me interface status for switch01"

**Mention Object Types:**

When you know the NetBox terminology, use it:
- "Show me **devices**..." (not just "show me systems")
- "What **interfaces** are down?" (not "what connections")
- "List **circuits** expiring soon" (not "connections to providers")

**Use NetBox Terminology (When You Know It):**

NetBox-specific terms help Copilot understand exactly what you want:
- Sites, locations, racks
- Devices, interfaces, cables
- Prefixes, IP addresses, VLANs, VRFs
- Tenants, contacts, providers

**But Don't Worry If You Don't!**

Copilot can often understand common language too:
- "Show me switches in NYC" works even without saying "devices with role switch"
- "What networks are available?" can find prefixes and IP ranges
- Ask for clarification if needed - Copilot will guide you

### Understanding Context

Copilot is aware of your current location in NetBox, or text you've selected on the page. It is also aware of the conversation history from the active session.

**Context Carries Through Conversations:**

```
You: "Show me all devices in NYC site"
Copilot: [shows 25 devices]

You: "Which of these are switches?"
Copilot: [filters to just switches, remembering NYC context]

You: "Show me interfaces for the first one"
Copilot: [shows interfaces, remembering which device you meant]
```

**Starting Fresh:**

If you want to change topics, just start a new line of questioning:
- "Now show me devices in Chicago" (context switches to Chicago)
- Or start a new conversation for completely unrelated topics

### Multi-Step Queries

Break complex questions into steps for better results:

**Example Workflow:**

```
Step 1: "Show me all devices in NYC site"
Step 2: "Which of these are core switches?"
Step 3: "Show me interfaces on [specific switch name]"
Step 4: "Which interfaces are not connected?"
```

**Why This Works:**
- Each step has a clear, specific goal
- You can verify results at each stage
- Easier to spot and correct misunderstandings
- More reliable than trying to ask everything at once

**When to Use Single vs. Multi-Step:**

**Single query works well:**
- "Show me all devices in NYC"
- "What IPs are available in this subnet?"

**Multi-step works better:**
- Complex filtering across multiple object types
- Analyzing relationships between objects
- When you want to explore results progressively

### Tips and Tricks {#tips-tricks}

**Keyboard Shortcut:**
- `Ctrl+I` (Windows/Linux) or `Cmd+I` (Mac) to open/close Copilot quickly

**Copy Results:**
- Select and copy text directly from Copilot responses (or use the copy icon at the bottom of a response to copy it in its entirety)
- Click object links to navigate to full NetBox pages
- Use results in documentation, reports, or tickets

**Using Copilot with NetBox Search:**
- NetBox's native search is fast for exact matches and names
- Copilot is great for questions, analysis, and explanations
- Use both together for maximum efficiency

---

## Troubleshooting

Common issues and how to resolve them.

### Copilot Not Appearing

**Symptoms:** Script runs but no interface appears in NetBox

**Solutions:**

1. **Check browser console for errors**
   - Press F12 to open developer tools
   - Look in the Console tab for red error messages
   - Look for messages mentioning "Copilot" or errors loading scripts

2. **Verify network connectivity**
   - Ensure your browser can reach `static.copilot.netboxlabs.ai`
   - Check if corporate firewall or proxy is blocking access
   - Try accessing from a different network (e.g., phone hotspot) to test

3. **Check browser compatibility**
   - Chrome/Edge 90+, Firefox 88+, Safari 14+ required
   - Try a different browser to isolate the issue
   - Update your browser to the latest version

4. **Try refreshing and re-running**
   - Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
   - Re-run the console script
   - Clear browser cache for the NetBox domain

5. **Disable browser extensions**
   - Ad blockers or privacy extensions might interfere
   - Try in private/incognito mode
   - Disable extensions one by one to identify conflicts

### Authentication Issues

**Symptoms:** Cannot log in, session expired, or account creation fails

**Solutions:**

1. **Account creation problems**
   - Reach out to copilot-team@netboxlabs.com
   - Try a different email address or SSO provider if issues persist

2. **Login failures**
   - Verify you're using the same email you created your account with
   - Use password reset if you've forgotten credentials
   - Clear browser cookies and try again

3. **Session expiration**
   - Tokens expire after 10 hours of inactivity
   - Simply log in again to get a new token
   - This is normal security behavior

4. **CORS/Network Issues**
   - If you see CORS-related errors in browser console
   - Check if your network has proxy or firewall restrictions
   - Verify `*.copilot.netboxlabs.ai` is accessible
   - Contact your network administrator if corporate proxy is blocking

### No Responses or Slow Responses

**Symptoms:** Questions submitted but no answer appears, or responses take a long time

**Solutions:**

1. **Check AI credit limits**
   - The Copilot UI will warn you if you're out of AI credits
   - If limit reached, during the Public Preview, you can request more AI credits through the Copilot interface
   - See [FAQ](#frequently-asked-questions) for details on AI credit limits

2. **Network latency**
   - Check your internet connection speed
   - Ensure `*.copilot.netboxlabs.ai` is not blocked by firewall
   - Large queries may take 5-10 seconds to process
   - Streaming responses should start appearing within 2-3 seconds, usually starting with thinking and tool call traces

3. **Complex queries**
   - Very complex questions may take longer or exceed the allowed iterations of the Copilot agent
   - Try breaking down into simpler steps
   - Copilot will show "thinking" indicators while processing

### Unexpected or Incorrect Answers

**Symptoms:** Results don't match expectations or seem wrong

**Solutions:**

1. **Verify NetBox permissions**
   - Copilot uses your NetBox user's RBAC permissions
   - You'll only see objects you have permission to view
   - Ask your NetBox admin if you need broader access

2. **Rephrase your question**
   - AI might have interpreted your query differently
   - Try being more specific about what you want
   - Use NetBox terminology when you know it

3. **Multi-step queries**
   - Some data relationships require multiple steps
   - Break complex questions into simpler parts
   - Verify intermediate results before proceeding

4. **Plugin models**
   - Plugin-provided models may need discovery first
   - First query about a plugin model may be slower
   - Subsequent queries will be faster

**Important Note About Public Preview:**

NetBox Copilot is a Public Preview product and we're actively refining the AI agent's behavior. We greatly value examples where the agent's behavior could be improved - please share these through the feedback mechanism so we can continue to enhance Copilot. Your reports of unexpected behavior directly help us make Copilot better!

### Browser-Specific Issues

**Checking the browser console:**
- **Windows/Linux**: Press `F12` or right-click → Inspect → Console
- **Mac**: Press `Cmd+Option+I` or right-click → Inspect Element → Console

**Common console errors:**

| Error Message | Meaning | Solution |
|--------------|---------|----------|
| `CORS policy` | Cross-origin blocking | Check firewall/proxy settings |
| `Failed to fetch` | Network connectivity issue | Verify access to static.copilot.netboxlabs.ai |
| `Script load error` | Script source unreachable | Check network and script URL |
| `401 Unauthorized` | Authentication expired | Log in again |

**Other browser-specific fixes:**

- **Clear cache**: Ctrl+Shift+Delete → Clear browsing data
- **Private/incognito mode**: Test if extensions are interfering
- **Different browser**: Try Chrome, Firefox, or Edge to isolate issues

### Getting Help

**When to contact us for help:**
- Persistent technical issues that troubleshooting doesn't resolve
- Questions about features or capabilities
- Bug reports
- Feature requests

**How to report issues effectively:**

Include as much detail as possible:
- **What you were trying to do**: "I asked Copilot to show devices in NYC"
- **What happened**: "I got an error message" or "No results appeared"
- **Error messages**: Copy exact text from browser console
- **Screenshots**: Especially helpful for UI issues
- **Browser console errors**: Press F12, screenshot any red errors
- **Steps to reproduce**: Exactly how to recreate the problem
- **Your environment**: NetBox version and edition, browser version

**Contact:**
- **Email**: copilot-team@netboxlabs.com
- **Copilot UI**: Use the feedback button (preferred - includes context automatically)

We aim to respond to all inquiries within 1-2 business days during Public Preview.

---

## Frequently Asked Questions

Answers to common questions about NetBox Copilot.

### General Questions

**Q: What is the difference between NetBox Copilot and NetBox MCP?**

A: NetBox Copilot is tightly integrated with the NetBox UI and designed to accelerate day-to-day workflows within NetBox. You use it directly in your browser while working in NetBox. NetBox MCP (Model Context Protocol) is a standardized way for external AI agents and tools to interact with NetBox programmatically. They serve different use cases - Copilot for interactive work in the NetBox UI, MCP for integrating NetBox with other AI systems.

**Q: Is this part of Microsoft Copilot?**

A: No, NetBox Copilot is a separate product from NetBox Labs, completely independent of Microsoft Copilot.

**Q: What LLM provider powers Copilot?**

A: NetBox Copilot primarily uses Anthropic models today, though we are always testing new models and providers. This may change over time as we optimize performance and capabilities.

**Q: Will this be available after Public Preview?**

A: Yes! NetBox Copilot will move to general availability with tiered pricing plans for all NetBox editions, and we will continue to provide a Free plan. We're using Public Preview to gather feedback and refine the product before GA.

**Q: Can I use Copilot with NetBox Community Edition?**

A: Yes! Copilot works with all NetBox editions: Community, Cloud, and Enterprise.

**Q: Does Copilot work with NetBox plugins?**

A: Yes, Copilot can discover and work with plugin-provided models dynamically. The first query about a plugin model may take a moment for discovery, but subsequent queries will be faster.

### Usage and Limitations {#usage-limitations}

**Q: What are AI credits?**

A: AI credits are NetBox Copilot's consumption-based unit for measuring usage. One AI credit equals one input token OR 0.2 output tokens from the underlying AI language model. For example:
- 1 million AI credits = up to 1 million input tokens OR up to 200,000 output tokens
- You can use any combination in between (e.g., 500K input tokens + 100K output tokens would consume 1 million AI credits)

Tokens themselves roughly equate to "words" or word fragments. For example, "Show me all devices" is about 5 tokens.

**Q: How many AI credits will I use?**

A: AI credit consumption depends on query complexity and how much data Copilot processes. A simple query like "show devices in NYC" might use 2,000-5,000 AI credits. A complex analysis with lots of data might use 10,000-50,000 AI credits. The free plan includes 1 million AI credits - enough for substantial usage and multiple extended conversations with a well-populated NetBox instance.

**Q: What happens if I exceed the free plan limits?**

A: During Public Preview, you can request additional AI credits directly through the Copilot UI. We'll work with you to ensure you can continue evaluating Copilot effectively.

**Q: Why is Copilot read-only right now?**

A: During Public Preview, we're focusing on ensuring reliability and gathering feedback on query and analysis capabilities. Write operations (creating, updating, deleting objects) will be added in future releases once we've validated the core functionality and safety measures.

### Data Governance and Security {#data-governance-security}

**Q: Where does my data go?**

A: Your queries and the API responses from your NetBox instance are sent to the NetBox Cloud backend for processing by our AI models. See the [Privacy & Security](privacy-security.md) page for complete details on data handling.

**Q: Do you train AI models on my NetBox data?**

A: No. We do not train or fine-tune any AI models on your data, and your data is not retained by our LLM providers for training purposes.

**Q: Is my data retained in the LLM provider?**

A: No. Our LLM provider configurations explicitly prevent data retention and training. Data is processed to generate responses but not stored or used for model training.

**Q: What data is sent to the cloud?**

A: When you use Copilot, the following is sent to our backend:
- Your questions and conversation history
- Context of what you're viewing in NetBox (page URL, object type, object ID)
- NetBox API responses when Copilot queries your instance

What is NOT sent:
- Your NetBox login credentials
- Your entire NetBox database
- Data from pages you're not querying about

**Q: How is my data secured?**

A: Data is encrypted in transit using HTTPS/TLS and encrypted at rest. Authentication uses secure tokens with automatic expiration (10h of inactivity). Copilot respects your existing NetBox RBAC permissions - you only see data you're authorized to access. See the [Privacy & Security](privacy-security.md) page for complete details.

**Q: Can I use my own LLM or API key?**

A: Bring Your Own Model (BYOM) will be available as an Enterprise feature after general availability. Contact us at copilot-team@netboxlabs.com for more details about enterprise data governance options.

**Q: Can I ensure data stays in specific geographic regions?**

A: Data sovereignty options will be available for Enterprise customers after GA. Contact us at copilot-team@netboxlabs.com for more details.

**Q: What is Private Copilot?**

A: Private Copilot delivers the complete Copilot platform within your NetBox Enterprise deployment for organizations with stringent data governance requirements. This option provides maximum control over where data is processed and stored. Contact us at copilot-team@netboxlabs.com for more details.

**Q: What are the data governance options for enterprises?**

A: Enterprise data governance options will include:
- **Bring Your Own Model (BYOM)**: Use your own Anthropic access through your enterprise Anthropic agreement, AWS, GCP, or other sources
- **Data Sovereignty**: Ensure data processing in specific geographic regions
- **Data Retention Control**: Configure retention policies to meet compliance needs
- **Private Copilot**: Deploy entire platform within NetBox Enterprise

All of these will be available after general availability. For details about enterprise features and pricing, contact us at copilot-team@netboxlabs.com.

### Technical Questions

**Q: What NetBox version is required?**

A: NetBox 4.2.x or higher is strongly recommended for best compatibility. NetBox 4.4.5 and later include native Copilot integration with a user preference toggle, providing the easiest setup experience. Earlier versions (4.2.x through 4.4.4) can still use Copilot via console-based or template-based installation methods.

**Q: What browsers are supported?**

A: Modern browsers including:
- Chrome/Edge 90 or higher
- Firefox 88 or higher
- Safari 14 or higher

Older browser versions may work but are not officially supported.

**Q: Does Copilot modify my NetBox installation?**

A: No. Copilot embeds in your browser and uses your NetBox API. For NetBox 4.4.5+, native integration is built into NetBox and controlled via user preferences - no installation required. For earlier versions, you can optionally add a script tag to your template for persistent installation.

**Q: Can I uninstall or disable Copilot?**

A: Yes, easily:
- **Native preference (4.4.5+)**: Toggle the Copilot setting to "Disabled" in your user preferences
- **Console-based installation**: Simply don't run the console script
- **Template-based installation**: Remove the script tag from your template and restart NetBox

**Q: Does Copilot require special NetBox permissions?**

A: No. Copilot uses your existing NetBox user permissions and RBAC. You'll see and access only what your NetBox user account is permitted to access. If you need broader access, talk to your NetBox administrator about your user permissions.

---

## Providing Feedback

Your feedback during Public Preview is invaluable and directly shapes NetBox Copilot's future.

### How to Provide Feedback

**Through Copilot UI (Preferred):**
- Use the feedback button within the Copilot interface
- Fastest way to get feedback to the team
- Context is automatically included (what page you were on, browser details, etc)
- Ensures we can follow up if we need clarification

**Via Email:**
- Contact: copilot-team@netboxlabs.com
- Include as much detail as possible
- Screenshots and console errors are helpful

### Types of Feedback We're Looking For

**Bug Reports:**

Help us fix issues by including:
- What you were trying to do
- What happened vs. what you expected
- Exact error messages (copy/paste)
- Browser console errors (screenshots helpful)
- Steps to reproduce the problem
- Your NetBox version and browser

**Feature Requests:**

Tell us what you'd like to see:
- What capability would you like?
- What problem would it solve for you?
- How would you use it in your workflow?
- How important is it to your use case?

**Agent Behavior Improvement:**

Since we're actively refining how the AI agent works, we especially value:
- Examples where Copilot misunderstood your question
- Cases where the answer was wrong or incomplete
- Situations where Copilot could have been more helpful
- Ideas for how responses could be better formatted

**General Feedback:**

We want to hear about your overall experience:
- What's working well?
- What's confusing or frustrating?
- What would make Copilot more useful?
- How does Copilot fit (or not fit) your workflow?
- Ideas for improvement

### What Happens to Your Feedback

During Public Preview:
- We review all feedback within 1-2 business days
- Critical bugs are prioritized for immediate fixes
- Feature requests are evaluated and prioritized for roadmap
- We may follow up with questions or to say thank you!

Your feedback directly influences:
- Bug fix priorities
- Agent improvement training
- Feature roadmap
- Documentation improvements
- UI/UX enhancements

**Thank you for helping make NetBox Copilot better!**

---

## Additional Resources

- **[Overview](index.md)** - Learn what NetBox Copilot is and why to use it
- **[Quickstart Guide](quickstart.md)** - Get up and running quickly
- **[Privacy & Security](privacy-security.md)** - Understand data handling and security
- **Email Support**: copilot-team@netboxlabs.com
