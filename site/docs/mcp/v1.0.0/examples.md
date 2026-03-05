---
lastUpdatedAt: 1762191154000
---
# NetBox MCP Server Examples

This page shows practical examples of using NetBox MCP Server for common tasks, from simple queries to building autonomous agents.

## Interactive Usage

Once you've configured NetBox MCP Server with an LLM client (like Claude), you can query your infrastructure using natural language. Frontier models (Claude, GPT, etc.) are well-trained on NetBox due to its widespread use and comprehensive documentation. Since NetBox's data model is a de facto industry standard, these models automatically select the appropriate MCP tools and navigate relationships between objects with ease.

### Basic Querying

Simple queries to explore and analyze your infrastructure:

```text
> Show me all devices in the NYC datacenter

> Find available /24 prefixes in the production VRF

> List all interfaces on device core-router-01

> What Cisco devices do I have in my network?

> Tell me about my IPAM utilization across all sites
```

The LLM will use `netbox_get_objects` or `netbox_search_objects` to retrieve the data, automatically following relationships (e.g., devices → site, interfaces → device) using its understanding of NetBox's data model.

### Audit & Compliance

Track changes and validate infrastructure state:

```text
> Who modified the NYC site in the last week?

> Show me all configuration changes to core-router-01 in the last month

> Find all devices without a primary IP address

> What changes were made by user jsmith yesterday?
```

These queries use `netbox_get_changelogs` for audit trails and combine it with `netbox_get_objects` for validation checks.

### Advanced Analysis

Multi-step queries that combine data from different object types:

```text
> Analyze rack capacity across all datacenters

> Find devices with more than 80% interface utilization

> Show me IP address allocation by site

> Identify orphaned VLANs not assigned to any interfaces
```

The LLM will automatically break these down into multiple tool calls, gathering the necessary data and performing analysis.

## Programmatic Usage

You can build autonomous agents that use NetBox MCP Server to perform tasks programmatically. This is useful for compliance checking, automated reporting, and integration with other tools.

### Simple Agent Example

This example uses the [`openai-agents`](https://github.com/openai/openai-agents-python) SDK to build a NetBox compliance checking agent:

```python
import asyncio
from agents import Agent, Runner
from agents.extensions.models.litellm_model import LitellmModel
from agents.mcp import MCPServerStdio, create_static_tool_filter

async def check_compliance():
    """Check that all devices in NYC site have primary IPs assigned."""

    # Step 1: Create MCP server connection via stdio transport
    async with MCPServerStdio(
        name="netbox",
        params={
            "command": "uv",
            "args": [
                "--directory",
                "/path/to/netbox-mcp-server",
                "run",
                "netbox-mcp-server"
            ],
            "env": {
                "NETBOX_URL": "https://netbox.example.com",
                "NETBOX_TOKEN": "your-token-here",
            },
        },
        tool_filter=create_static_tool_filter(
            allowed_tool_names=[
                "netbox_get_objects",
                "netbox_get_object_by_id",
            ]
        ),
    ) as server:

        # Step 2: Create agent with MCP tools
        agent = Agent(
            name="NetBoxComplianceChecker",
            instructions="""
                You are a NetBox compliance checker. Use the MCP tools to:
                1. Get all devices in the specified site
                2. Check that each device has a primary_ip4 or primary_ip6
                3. Return a report listing any non-compliant devices
            """,
            model=LitellmModel(
                model="openai/gpt-4o",
                api_key="your-openai-key",
            ),
            mcp_servers=[server],
        )

        # Step 3: Run the agent with a natural language task
        result = await Runner.run(
            starting_agent=agent,
            input="Check that all devices in NYC site have primary IPs assigned",
            max_turns=25,
        )

        print(result.final_output)

# Run the agent
asyncio.run(check_compliance())
```

**Key aspects:**

- **Stdio transport:** The agent spawns the MCP server as a subprocess (secure, no network ports)
- **Tool filtering:** Restricts the agent to read-only operations for safety
- **Autonomous execution:** The agent decides when and how to call MCP tools based on your instructions
- **Model flexibility:** Use any LLM via LiteLLM (OpenAI, Anthropic, local models, etc.)

**Full example:** See the [NetBox Compliance Agent](https://github.com/netboxlabs/netbox-agent-compliance) repository for a complete implementation with CLI, structured output, and comprehensive system prompts.

### Building Your First Agent

To build an agent for your use case:

1. **Define the task** - What should the agent check or analyze?
2. **Write system instructions** - Tell the agent how to use the MCP tools
3. **Set tool filters** - Restrict to read-only operations if appropriate
4. **Run and iterate** - Test with realistic data and refine prompts

**Other agent frameworks:**

While this example uses `openai-agents`, you can also build agents with:
- Direct Anthropic SDK or OpenAI SDK with function calling
- LangChain or many other agent frameworks with MCP tool integration
- Custom frameworks using the MCP SDK

The key is connecting to the MCP server (via stdio or HTTP) and exposing the tools to your LLM.

## Common Patterns

### Navigating Relationships

NetBox has a rich data model with relationships between objects. Frontier LLMs know NetBox well because NetBox is so widely used and well documented, and they leverage their knowledge of NetBox's relationships to navigate your data.

**Example: Device → Interfaces → IPs**

```text
> Show me all IP addresses assigned to interfaces on device core-router-01
```

The LLM will:
1. Get the device by name
2. Get interfaces for that device
3. Get IP addresses assigned to those interfaces

You don't need to explicitly specify these steps - the LLM knows the NetBox data model.

Frontier LLMs will automatically recognize when two-step queries are needed and use this pattern without prompting, thanks to their deep understanding of NetBox's API constraints.

### Search vs. Get Objects

Use `netbox_search_objects` for broad searches across object types:

```text
> Find anything related to "customer-acme"
```

This searches names, descriptions, IPs, serial numbers, and asset tags across devices, sites, IP addresses, circuits, and more.

Use `netbox_get_objects` for targeted queries of a specific object type:

```text
> Get all devices in the NYC site
```

This queries only the devices endpoint with specific filters.

## Troubleshooting

### Poor Results or Incorrect Queries

**Symptoms:**
- LLM doesn't understand NetBox object relationships
- Queries fail to navigate the data model correctly
- Incorrect or incomplete results
- Agent makes poor decisions about which tools to use

**Causes:**
- Using a smaller or older language model
- Model lacks sufficient training on NetBox and infrastructure concepts

**Fix:**

Use a current leading large language model (frontier model) for best results:

**Recommended models:**
- **Anthropic Claude** (Sonnet, Opus) - Excellent NetBox knowledge
- **OpenAI GPT-4 or later** - Strong infrastructure understanding
- **Other frontier models** from major providers with recent training data

**Why this matters:** NetBox is widely deployed and extensively documented, making it well-represented in the training data of leading LLMs. These models understand NetBox's data model as a de facto industry standard and can navigate relationships (devices ↔ interfaces ↔ IP addresses, sites ↔ racks ↔ devices, etc.) without explicit instruction.

**Not recommended:**
- Smaller models (7B, 13B parameter models)
- Older models with knowledge cutoffs before 2023
- Models not trained on technical/infrastructure content

If you're building an agent programmatically, specify a frontier model in your configuration:

```python
model=LitellmModel(
    model="openai/gpt-5",  # or "anthropic/claude-sonnet-4-5"
    api_key="your-key",
)
```

### Authentication Errors

**Error:** `401 Unauthorized` or `Invalid token`

**Causes:**
- Token is expired or invalid
- Token doesn't have read permissions for requested objects

**Fix:**
1. Verify token in NetBox: Admin → API Tokens
2. Check token permissions (should have read access)
3. Test with `curl`:
   ```bash
   curl -H "Authorization: Token your-token" \
        https://netbox.example.com/api/dcim/devices/
   ```

### Connection Errors

**Error:** `Connection refused` or `Timeout`

**Causes:**
- NETBOX_URL is incorrect or unreachable
- Firewall blocking access
- NetBox is down

**Fix:**
1. Verify NETBOX_URL includes protocol: `https://netbox.example.com/`
2. Test connectivity: `curl https://netbox.example.com/api/`
3. Check firewall rules if NetBox is on internal network

### Invalid Object Type

**Error:** `Invalid object_type: 'xyz'`

**Causes:**
- Typo in object type name
- Requesting a plugin object type (not supported)

**Fix:**
1. Use correct object type name (e.g., `dcim.device` not `device` or `devices`)
2. Check [NetBox API docs](https://docs.netbox.dev/en/stable/integrations/rest-api/) for valid object types
3. Plugin objects are not currently supported - use core NetBox objects only

### SSL Verification Errors

**Error:** `SSL: CERTIFICATE_VERIFY_FAILED`

**Causes:**
- Self-signed certificate
- Corporate SSL inspection

**Fix:**
For development/testing only, disable SSL verification:
```bash
VERIFY_SSL=false uv run netbox-mcp-server
```

⚠️ **Warning:** Only use `VERIFY_SSL=false` in development. Always use valid SSL certificates in production.

### MCP Server Not Connecting

**Claude Desktop/Code specific:**

1. **Restart the client** after config changes
2. **Check logs:**
   - Claude Desktop: Help → View Logs
   - Claude Code: Check terminal output
3. **Verify paths:**
   - Use absolute paths, not relative
   - Windows: Escape backslashes (`C:\\Users\\...`)
4. **Test manually:**
   ```bash
   uv --directory /path/to/netbox-mcp-server run netbox-mcp-server
   ```

**HTTP transport specific:**

1. **Verify server is running:**
   ```bash
   curl http://127.0.0.1:8000/mcp
   ```
2. **Check URL includes protocol:** `http://` or `https://`
3. **Verify port isn't in use:** `lsof -i :8000` (macOS/Linux)

## Additional Resources

- **[NetBox Agent Compliance Workshop](https://netboxlabs.com/blog/build-your-first-netbox-ai-agent-workshop-recap/)** - Blog post and video from our agent building workshop
- **[NetBox Agent Compliance Repository](https://github.com/netboxlabs/netbox-agent-compliance)** - Full example of a compliance checking agent
- **[NetBox API Documentation](https://docs.netbox.dev/en/stable/integrations/rest-api/)** - Complete API reference for filters and fields
- **[Model Context Protocol](https://modelcontextprotocol.io/)** - Learn more about MCP
- **[NetBox MCP Server GitHub](https://github.com/netboxlabs/netbox-mcp-server)** - Source code, issues, and contributions
