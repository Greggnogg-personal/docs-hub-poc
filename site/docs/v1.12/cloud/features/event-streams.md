---
title: Event Streams (v1.12)
description: >-
  Real-time integration between NetBox and external systems via event streaming
  and webhooks
tags:
  - cloud
  - enterprise
  - integration
  - automation
  - api
source: localdocs
lastUpdatedAt: 1764177275000
canonical: /docs/v1.12/cloud/features/event-streams/
---

# Event Streams

Event streams enable real-time integration between NetBox and external systems by delivering notifications when objects are created, updated, or deleted. This guide covers the event streaming capabilities available across the NetBox Labs ecosystem.

## Overview

The NetBox Labs platform provides comprehensive event streaming capabilities at multiple levels:

- **NetBox Event Rules**: Configure webhooks and notifications for object changes in NetBox
- **Event Sinks**: Route NetBox events to external cloud messaging services (AWS SNS, GCP Pub/Sub, Azure Service Bus)
- **Platform Event Streams**: Internal event bus for orchestrating NetBox Cloud operations

## NetBox Event Rules

NetBox includes a built-in event system that triggers actions when objects are created, modified, or deleted. Event rules allow you to automate workflows, integrate with external systems, and notify users of important changes.

### Event Types

NetBox generates events for the following actions:

| Event Type | Description |
|------------|-------------|
| `object_created` | Triggered when a new object is created |
| `object_updated` | Triggered when an object is modified |
| `object_deleted` | Triggered when an object is deleted |
| `job_started` | Triggered when a background job starts |
| `job_completed` | Triggered when a background job completes successfully |
| `job_failed` | Triggered when a background job fails |
| `job_errored` | Triggered when a background job encounters an error |

### Creating Event Rules

Event rules can be configured in NetBox to trigger specific actions when events occur. To create an event rule:

1. Navigate to **Integrations > Event Rules** in the NetBox UI
2. Click **Add Event Rule**
3. Configure the following:
   - **Name**: Descriptive name for the rule
   - **Object Types**: Select which object types trigger this rule (e.g., devices, sites, IP addresses)
   - **Events**: Choose which event types trigger this rule (created, updated, deleted)
   - **Conditions**: (Optional) Define JSON-based conditions to filter events
   - **Action**: Choose the action type (Webhook, Script, or Notification)

### Event Rule Actions

#### Webhooks

Webhooks send HTTP POST requests to external systems when events occur. This is the most common integration method for connecting NetBox to automation platforms, ticketing systems, or custom applications.

**Webhook Configuration:**

- **URL**: Target endpoint (supports Jinja2 templating)
- **HTTP Method**: POST, PUT, or PATCH
- **Headers**: Custom HTTP headers (supports Jinja2 templating)
- **Body Template**: Custom payload template using Jinja2
- **SSL Verification**: Enable/disable SSL certificate verification
- **CA Certificate**: (Optional) Custom CA certificate for SSL verification

**Security:**

Webhooks include an `X-Hook-Signature` header containing an HMAC-SHA512 signature of the request body. This allows receivers to verify the authenticity of webhook requests:

```python
import hmac
import hashlib

def verify_webhook(secret, body, signature):
    expected = hmac.new(
        secret.encode('utf-8'),
        body.encode('utf-8'),
        hashlib.sha512
    ).hexdigest()
    return hmac.compare_digest(expected, signature)
```

**Default Payload:**

By default, webhooks send the following JSON structure:

```json
{
  "event": "created",
  "timestamp": "2025-10-29T10:30:00.000000Z",
  "model": "dcim.device",
  "username": "admin",
  "request_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "data": {
    "id": 123,
    "name": "router-01",
    "site": {
      "id": 5,
      "name": "NYC-DC1"
    }
    // ... complete object data
  },
  "snapshots": {
    "prechange": null,  // Previous state (for updates)
    "postchange": { ... }  // New state
  }
}
```

#### Scripts

Event rules can trigger custom Python scripts that run within NetBox. This allows for complex automation logic that requires direct database access or integration with NetBox's internal APIs.

#### Notifications

Notifications create in-app messages for NetBox users. Users can subscribe to specific object types to receive notifications about changes.

### Conditional Evaluation

Event rules support conditional evaluation using JSON-based filters. Conditions allow you to selectively trigger events based on object attributes.

**Example**: Only trigger for devices in a specific site:

```json
{
  "attr": "site.name",
  "value": "NYC-DC1"
}
```

**Example**: Trigger when a device status changes to "failed":

```json
{
  "attr": "status",
  "value": "failed"
}
```

### Event Processing

Events are processed asynchronously using a background job queue (Redis Queue). This ensures that:

- NetBox API/UI responses remain fast
- Webhook failures don't impact NetBox operations
- Events can be retried if delivery fails
- Multiple webhooks can be delivered in parallel

## Event Sinks (NetBox Cloud)

:::info[NetBox Cloud Feature]
Event Sinks are available exclusively on NetBox Cloud and NetBox Enterprise. They extend the basic webhook functionality by routing events to cloud-native messaging services.
:::

Event Sinks allow you to route NetBox events to external pub/sub messaging services across multiple cloud providers. This provides scalable, reliable event delivery for enterprise integrations.

### Supported Sink Types

| Sink Type | Service | Use Case |
|-----------|---------|----------|
| AWS SNS | Amazon Simple Notification Service | Integrate with AWS Lambda, SQS, or other AWS services |
| GCP Pub/Sub | Google Cloud Pub/Sub | Trigger Cloud Functions, route to BigQuery, or process with Dataflow |
| Azure Service Bus | Azure Service Bus Topics | Connect to Azure Functions, Logic Apps, or Event Grid |
| MQTT | MQTT Brokers | IoT integrations and edge computing scenarios |

### Event Sink Architecture

```
NetBox Instance
    ↓
NetBox Event Extension
    ↓
Event Sink Service
    ↓
Rule Matching & Routing
    ├→ AWS SNS Topic
    ├→ GCP Pub/Sub Topic
    └→ Azure Service Bus Topic
        ↓
Your External Systems
```

### Configuring Event Sinks

Event Sinks are provisioned and managed by NetBox Labs. To set up Event Sinks for your NetBox Cloud or Enterprise instance:

1. Contact [NetBox Labs Support](https://netboxlabs.com/support) with your requirements
2. Specify your preferred messaging service type (AWS SNS, GCP Pub/Sub, Azure Service Bus, or MQTT)
3. Provide any event filtering requirements you need
4. NetBox Labs will provision the Event Sink and provide you with connection details

Once provisioned, you can consume NetBox events from the Event Sink using the connection details provided by NetBox Labs.

### Event Message Format

Event Sinks deliver messages in a standardized format:

```json
{
  "version": 1,
  "source_id": "550e8400-e29b-41d4-a716-446655440000",
  "source_timestamp": "2025-10-29T10:30:00.000000Z",
  "source_type": "object_created",
  "source_type_docs": "https://docs.netboxlabs.com/event-streams/#event-types",
  "netbox_id": "nb-abc123",
  "netbox_version": "4.1.0",
  "egress_environment": "production",
  "egress_id": "660e8400-e29b-41d4-a716-446655440001",
  "egress_timestamp": "2025-10-29T10:30:00.123456Z",
  "egress_version": "2.3.1",
  "message": {
    "event": "created",
    "model": "dcim.device",
    "username": "admin",
    "data": { ... }
  }
}
```

**Key Fields:**

- `source_id`: Unique ID from NetBox event extension
- `source_timestamp`: When the event occurred in NetBox
- `netbox_id`: Identifier for the NetBox instance
- `egress_id`: Unique ID for the sink delivery
- `egress_timestamp`: When the event was delivered to the sink
- `message`: The original NetBox event payload

## Change Logging & Audit Trail

All object changes in NetBox are automatically logged to the `ObjectChange` table, providing a complete audit trail.

### ObjectChange Model

Each change record includes:

- **User**: Who made the change
- **Timestamp**: When the change occurred
- **Request ID**: Correlation ID for the API request
- **Action**: created, updated, or deleted
- **Object Type**: The type of object changed
- **Object ID**: The specific object instance
- **Pre-change Snapshot**: Object state before the change (for updates/deletes)
- **Post-change Snapshot**: Object state after the change (for creates/updates)

### Querying Change Logs

Change logs are available via the NetBox API:

```bash
# Get all changes for a specific device
curl https://your-netbox.cloud.netboxlabs.com/api/extras/object-changes/ \
  -H "Authorization: Token YOUR_TOKEN" \
  -G --data-urlencode "changed_object_type=dcim.device" \
     --data-urlencode "changed_object_id=123"

# Get recent changes by a specific user
curl https://your-netbox.cloud.netboxlabs.com/api/extras/object-changes/ \
  -H "Authorization: Token YOUR_TOKEN" \
  -G --data-urlencode "user=admin" \
     --data-urlencode "time_after=2025-10-29T00:00:00Z"
```

### Change Log Retention

Change logs are retained according to the `CHANGELOG_RETENTION` configuration parameter. By default, NetBox Cloud retains change logs for 90 days.

## Best Practices

### Webhook Design

1. **Idempotency**: Design webhook receivers to handle duplicate deliveries gracefully
2. **Async Processing**: Process webhooks asynchronously to avoid timeout issues
3. **Signature Verification**: Always verify the `X-Hook-Signature` header
4. **Error Handling**: Return appropriate HTTP status codes (200-299 for success)
5. **Timeout Configuration**: Set reasonable timeouts (5-10 seconds recommended)

### Event Rule Configuration

1. **Specific Object Types**: Only trigger on relevant object types to reduce noise
2. **Use Conditions**: Add conditional logic to filter events precisely
3. **Test Before Production**: Test event rules with the NetBox development environment
4. **Monitor Failures**: Review webhook delivery failures regularly in NetBox logs
5. **Limit Actions**: Avoid creating loops where events trigger more events

### Event Sink Integration

1. **Message Deduplication**: Use `egress_id` to detect and handle duplicate deliveries
2. **Batch Processing**: Process multiple events together when possible for efficiency
3. **Error Handling**: Implement dead-letter queues for failed message processing
4. **Monitoring**: Set up alerting on message queue depth and processing latency
5. **Schema Validation**: Validate message structure before processing

## Troubleshooting

### Webhooks Not Firing

**Check**:
- Event rule is enabled and conditions match
- Object type is included in the event rule
- Webhook URL is accessible from NetBox
- No firewall blocking outbound connections
- SSL certificate is valid (if SSL verification enabled)

**Debug**:
```bash
# Check webhook logs in NetBox
tail -f /var/log/netbox/webhook.log

# Test webhook URL manually
curl -X POST https://your-webhook-endpoint \
  -H "Content-Type: application/json" \
  -d '{"test": "message"}'
```

### Event Sink Delivery Failures

**Check**:
- Pub/Sub broker configuration is correct
- IAM permissions allow NetBox to publish to topic
- Topic ARN/name exists in the cloud provider
- Network connectivity to cloud provider APIs
- Message size within cloud provider limits

**Debug**:
- Review Event Sink Lambda logs in CloudWatch
- Check Kafka consumer lag metrics
- Verify message format matches expected schema

### High Event Latency

**Check**:
- Redis queue depth (indicates backlog)
- Background worker process count
- Database query performance
- Network latency to external services

**Optimization**:
- Increase number of background workers
- Use event conditions to reduce event volume
- Batch similar webhook deliveries
- Consider Event Sinks for high-volume scenarios

## API Reference

### Event Rules API

**List Event Rules**:
```bash
GET /api/extras/event-rules/
```

**Create Event Rule**:
```bash
POST /api/extras/event-rules/
Content-Type: application/json

{
  "name": "Device Created Webhook",
  "object_types": ["dcim.device"],
  "events": ["object_created"],
  "action_type": "webhook",
  "action_object_id": 1
}
```

### Webhooks API

**List Webhooks**:
```bash
GET /api/extras/webhooks/
```

**Create Webhook**:
```bash
POST /api/extras/webhooks/
Content-Type: application/json

{
  "name": "External System Webhook",
  "payload_url": "https://external-system.example.com/webhook",
  "http_method": "POST",
  "http_content_type": "application/json",
  "ssl_verification": true
}
```

## Additional Resources

- [NetBox Webhooks Documentation](https://docs.netbox.dev/en/stable/integrations/webhooks/)
- [Event Rules Configuration](https://docs.netbox.dev/en/stable/features/event-rules/)
- [NetBox API Documentation](https://docs.netbox.dev/en/stable/integrations/rest-api/)
- [NetBox Cloud Console Guide](../console-administration/console-overview.md)

## Code Examples

### Python: Webhook Receiver

```python
from flask import Flask, request
import hmac
import hashlib

app = Flask(__name__)
WEBHOOK_SECRET = "your-webhook-secret"

@app.route('/webhook', methods=['POST'])
def receive_webhook():
    # Verify signature
    signature = request.headers.get('X-Hook-Signature')
    body = request.get_data()
    expected = hmac.new(
        WEBHOOK_SECRET.encode('utf-8'),
        body,
        hashlib.sha512
    ).hexdigest()

    if not hmac.compare_digest(expected, signature):
        return 'Invalid signature', 403

    # Process event
    event = request.get_json()
    print(f"Received {event['event']} for {event['model']}")

    # Your business logic here
    process_netbox_event(event)

    return 'OK', 200

if __name__ == '__main__':
    app.run(port=8080)
```

### Python: Event Sink Consumer (AWS Lambda)

```python
import json
import boto3

def lambda_handler(event, context):
    """Process NetBox events from SNS"""

    for record in event['Records']:
        # Parse SNS message
        message = json.loads(record['Sns']['Message'])

        # Extract NetBox event
        netbox_event = message['message']
        event_type = message['source_type']
        netbox_id = message['netbox_id']

        print(f"Processing {event_type} from {netbox_id}")

        # Your business logic
        if event_type == 'object_created':
            handle_object_created(netbox_event)
        elif event_type == 'object_updated':
            handle_object_updated(netbox_event)
        elif event_type == 'object_deleted':
            handle_object_deleted(netbox_event)

    return {'statusCode': 200}

def handle_object_created(event):
    """Handle object creation events"""
    model = event['model']
    data = event['data']

    if model == 'dcim.device':
        # Device was created - update CMDB, monitoring, etc.
        device_name = data['name']
        site_name = data['site']['name']
        print(f"New device: {device_name} at {site_name}")

        # Your integration logic here
        update_monitoring_system(device_name, site_name)
        update_cmdb(data)
```

---

This documentation covers the comprehensive event streaming capabilities across the NetBox Labs ecosystem. For specific integration questions or issues, please contact [NetBox Labs Support](https://netboxlabs.com/support).
