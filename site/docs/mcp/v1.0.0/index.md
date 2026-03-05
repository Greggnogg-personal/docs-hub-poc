---
lastUpdatedAt: 1762191018000
---
# NetBox MCP Server

## What is NetBox MCP Server?

The NetBox MCP Server is a read-only [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) server that enables AI agents and LLMs to interact with NetBox infrastructure data. MCP is an open protocol that standardizes how applications expose data and functionality to LLMs, making it easy to integrate NetBox with AI-powered tools and workflows.

With NetBox MCP Server, you can:

- Query NetBox data using natural language through any MCP-compatible LLM client
- Build autonomous AI agents that leverage infrastructure data from NetBox to guide reasoning and exploration
- Automate reporting and documentation workflows
- Integrate NetBox with AI-powered automation tools

## Key Capabilities

**MCP Tools:**

The server exposes four read-only tools that work with any NetBox object type:

| Tool | Description |
|------|-------------|
| `netbox_get_objects` | Retrieve NetBox objects by type with filtering, pagination, and field selection |
| `netbox_get_object_by_id` | Get detailed information about a specific object by ID |
| `netbox_search_objects` | Search across multiple object types by name, IP, serial number, or description |
| `netbox_get_changelogs` | Retrieve change history and audit trail with filtering by user, time, or action |

**Object Coverage:**

The tools work with any NetBox core object type across all modules (DCIM, IPAM, Circuits, Virtualization, etc.). Frontier LLMs (Claude, GPT, etc.) are trained on NetBox and its data model due to NetBox's widespread adoption and comprehensive documentation. NetBox's data model is a de facto industry standard, which means these models navigate relationships between objects with ease - for example, following connections from devices to interfaces to IP addresses without explicit instruction.

> **Note:** Plugin object types are not currently supported. The server is limited to core NetBox objects. 

For best results, use current leading large language models; smaller or older models may not have sufficient knowledge of NetBox's data model.

**Token Optimization:**

The NetBox API can return a lot of information. The MCP exposes field filtering and brief returns in order to  reduce the token usage. The model is strongly encouraged to use these parameters and should mitigate filling up your context window and blowing out your token costs.

## Transport Options

NetBox MCP Server supports two transport protocols:

### Stdio Transport (Default)

**When to use:** Local development, Claude Desktop/Code, and programmatic agents

Stdio (standard input/output) transport runs the MCP server as a subprocess and communicates via stdin/stdout. This is the most common and secure option since it doesn't open network ports.

**Use cases:**
- Claude Desktop integration
- Claude Code integration
- Building Python agents (e.g., using `openai-agents` library)
- Any local MCP client

### HTTP/SSE Transport

**When to use:** Web applications, remote access, and Docker deployments

HTTP transport with Server-Sent Events (SSE) runs the MCP server as an HTTP service, accessible over the network.

**Use cases:**
- Web-based MCP clients
- Docker container deployments
- Remote access scenarios
- Multi-user environments

> **Note:** Docker containers require HTTP transport since stdio doesn't work in containerized environments.

## Quick Setup

### Prerequisites

1. **Create a NetBox API token:** Generate a read-only API token in NetBox with permissions for the data you want to expose
2. **Install the server:** Clone the repository and install dependencies:

```bash
git clone https://github.com/netboxlabs/netbox-mcp-server.git
cd netbox-mcp-server
uv sync  # or: pip install -e .
```

3. **Verify the server runs:**

```bash
NETBOX_URL=<your-netbox-url> \
NETBOX_TOKEN=<your-token> \
uv run netbox-mcp-server
```

### Setup Examples

#### Claude Desktop (Stdio)

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
    "mcpServers": {
        "netbox": {
            "command": "uv",
            "args": [
                "--directory",
                "/path/to/netbox-mcp-server",
                "run",
                "netbox-mcp-server"
            ],
            "env": {
                "NETBOX_URL": "https://netbox.example.com/",
                "NETBOX_TOKEN": "<your-api-token>"
            }
        }
    }
}
```

> **Windows users:** Use escaped paths like `C:\\Users\\myuser\\netbox-mcp-server`

#### Claude Code (Stdio)

```bash
claude mcp add --transport stdio netbox \
  --env NETBOX_URL=https://netbox.example.com/ \
  --env NETBOX_TOKEN=<your-token> \
  -- uv --directory /path/to/netbox-mcp-server run netbox-mcp-server
```

**Options:**
- `--scope project`: Share config via `.mcp.json` in version control
- `--scope user`: Available across all projects (default: `local`)

#### Any MCP Client (Stdio)

Most MCP clients follow a similar pattern - spawn a subprocess with environment variables:

```json
{
    "command": "uv",
    "args": ["--directory", "/path/to/netbox-mcp-server", "run", "netbox-mcp-server"],
    "env": {
        "NETBOX_URL": "https://netbox.example.com/",
        "NETBOX_TOKEN": "<your-token>"
    }
}
```

#### HTTP Transport (Web Clients)

Start the server with HTTP transport:

```bash
NETBOX_URL=https://netbox.example.com/ \
NETBOX_TOKEN=<your-token> \
TRANSPORT=http \
HOST=127.0.0.1 \
PORT=8000 \
uv run netbox-mcp-server
```

The MCP endpoint is available at `http://127.0.0.1:8000/mcp`

For Claude Code with HTTP transport:

```bash
# Start server first (see above), then add it:
claude mcp add --transport http netbox http://127.0.0.1:8000/mcp
```

#### Docker (HTTP Transport)

```bash
# Build the image
docker build -t netbox-mcp-server:latest .

# Run with HTTP transport (required for containers)
docker run --rm \
  -e NETBOX_URL=https://netbox.example.com/ \
  -e NETBOX_TOKEN=<your-token> \
  -e TRANSPORT=http \
  -e HOST=0.0.0.0 \
  -p 8000:8000 \
  netbox-mcp-server:latest
```

Access at `http://localhost:8000/mcp`

> **Host NetBox access:** If NetBox runs on your host machine, use `http://host.docker.internal:8000/` (macOS/Windows) or `--network host` (Linux)

## Configuration Reference

The server uses environment variables, `.env` file, or CLI arguments for configuration.

### Required Settings

| Setting | Description | Example |
|---------|-------------|---------|
| `NETBOX_URL` | Base URL of NetBox instance | `https://netbox.example.com/` |
| `NETBOX_TOKEN` | API token for authentication | `a1b2c3d4e5f6...` |

### Optional Settings

| Setting | Default | Options | Description |
|---------|---------|---------|-------------|
| `TRANSPORT` | `stdio` | `stdio`, `http` | MCP transport protocol |
| `HOST` | `127.0.0.1` | Any IP | HTTP server host (HTTP transport only) |
| `PORT` | `8000` | 1-65535 | HTTP server port (HTTP transport only) |
| `VERIFY_SSL` | `true` | `true`, `false` | Verify SSL certificates |
| `LOG_LEVEL` | `INFO` | `DEBUG`, `INFO`, `WARNING`, `ERROR` | Logging verbosity |

### Configuration Priority

Settings are resolved in the following order (highest to lowest):

1. Command-line arguments (highest)
2. Environment variables
3. `.env` file in project root
4. Default values (lowest)

### Example .env File
You can find an .env.example in the root of the directory.
```env
# Core Configuration (required)
NETBOX_URL=https://netbox.example.com/
NETBOX_TOKEN=your_api_token_here

# Transport (optional, defaults to stdio)
TRANSPORT=stdio

# HTTP Settings (only if TRANSPORT=http)
HOST=127.0.0.1
PORT=8000

# Security (optional)
VERIFY_SSL=true

# Logging (optional)
LOG_LEVEL=INFO
```

### CLI Arguments

Override any setting via command line:

```bash
# View all options
uv run netbox-mcp-server --help

# Examples
uv run netbox-mcp-server --log-level DEBUG --no-verify-ssl
uv run netbox-mcp-server --transport http --port 9000
```

## Next Steps

- **[See examples and use cases →](examples.md)** - Learn how to query NetBox and build agents
- **[Visit the GitHub repository →](https://github.com/netboxlabs/netbox-mcp-server)** - Source code, issues, and contributions
- **[Read about MCP →](https://modelcontextprotocol.io/)** - Learn more about the Model Context Protocol
