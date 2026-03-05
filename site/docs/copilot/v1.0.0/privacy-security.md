---
lastUpdatedAt: 1764704736000
---
# Privacy & Security

:::note
NetBox Copilot is currently in public preview. You may encounter bugs or inconsistencies. For questions or assistance, contact copilot-team@netboxlabs.com.
:::


NetBox Copilot is designed with security and privacy as core principles. This page explains how we collect, use, and protect your data.

## Data Collection and Usage {#data-collection-usage}

### What Data Is Collected

When you use NetBox Copilot, we collect the following in order to deliver the product experience:

**Conversation Data:**
- Your questions and messages in Copilot
- Copilot's responses
- Conversation history for maintaining context

**NetBox Context:**
- Current page URL and path in NetBox
- Object type and ID you're viewing (e.g., device #123)
- Page navigation history within your session

**API Responses:**
- NetBox API responses when Copilot executes queries
- Only specific query results, not your entire database

**Usage Analytics:**
- AI credit consumption
- Feature usage patterns
- Performance metrics
- Error logs for troubleshooting

**Account Information:**
- Email address
- Organization name (if applicable)
- Account preferences and settings

### What Data Is NOT Collected

We explicitly do not collect:

- **NetBox login credentials** - Never transmitted to Copilot services
- **Your complete NetBox database** - Only specific query results
- **Sensitive configuration details** - Passwords, secrets, API keys stored in NetBox
- **Data from pages you're not querying** - We only see what you actively ask about
- **Continuous monitoring data** - No background data collection

### How Data Is Used

Your data is used to:

**Provide the Service:**
- Process your queries and generate responses
- Maintain conversation history for context
- Execute NetBox API calls on your behalf

**Improve Service Quality:**
- Identify and fix bugs
- Improve response accuracy
- Optimize performance
- Aggregate usage analytics (anonymized)

**Your Data Is NOT Used For:**
- Training AI models (your data doesn't train LLMs)
- Sharing with third parties
- Marketing or advertising to you
- Any purpose beyond providing and improving NetBox and Copilot

---

## Security Measures

NetBox Copilot employs multiple security measures to protect your data:

- **All communications encrypted in transit** using HTTPS/TLS protocols
- **All customer data encrypted at rest**
- **Secure token-based authentication** with automatic expiration (10h of inactivity)
- **Copilot can see only what your NetBox permissions allow** - RBAC is fully respected
- **Each user's data isolated by organization** - No cross-tenant data access
- **API calls execute with your NetBox session credentials** - No separate credentials stored
- **Uses your existing NetBox RBAC permissions** - No elevation of privileges

These measures ensure that Copilot integrates securely with your NetBox environment without introducing new security vulnerabilities.

---

## Data Governance Options

For organizations with specific data governance requirements, enterprise options will be available after general availability:

### Bring Your Own Model (BYOM)

Use your own Anthropic model access for complete control:
- Your own API keys and billing
- Direct relationship with LLM provider
- Full visibility into API usage
- Compliance with your existing AI policies

### Data Sovereignty

By default, NetBox Copilot processes and stores data in United States data centers. For organizations requiring specific geographic compliance:
- Meet regulatory requirements for data locality
- Control where data is processed and stored
- Available for EU, US, and other regions

### Data Retention Control

Configure retention policies to meet your compliance needs:
- Set custom retention periods for conversation history
- Optionally disable retention of conversation history (disabling session resumption)
- Screening and filtering options for retained conversation data

### Private Copilot

Deploy the entire Copilot platform within your NetBox Enterprise environment:
- Complete control over infrastructure
- Data never leaves your environment
- Integration with your existing security tools
- Ideal for air-gapped or highly regulated environments

---

## Enterprise Data Governance

All enterprise data governance options listed above will be available after general availability.

**Interested in enterprise features?**

Contact us to discuss your organization's specific data governance requirements:
- **Email**: copilot-team@netboxlabs.com
- **Subject**: Copilot Enterprise Data Governance Inquiry

Our team will work with you to understand your needs and provide details on:
- Feature availability timeline
- Pricing and packaging
- Implementation support
- Compliance documentation

---

## Questions About Privacy or Security?

We're committed to transparency about how we handle your data.

**Have questions or concerns?**
- **Email**: copilot-team@netboxlabs.com
- **Subject**: Copilot Privacy/Security Question

We respond to all privacy and security inquiries within 1-2 business days.

**Want more details?**
- Review our full [Terms of Service](https://netboxlabs.com/ai-terms/)
- Review our [Privacy Policy](https://netboxlabs.com/privacy-policy/)
- Request detailed security documentation for enterprise evaluations

---

## Additional Resources

- **[Overview](index.md)** - Learn what NetBox Copilot is
- **[Quickstart Guide](quickstart.md)** - Get started quickly
- **[Usage Guide](usage-guide.md)** - Comprehensive guide to capabilities
- **[FAQ](usage-guide.md#frequently-asked-questions)** - Common questions answered
