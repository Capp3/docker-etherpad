# Etherpad API Guide

Complete guide to using the Etherpad HTTP API for programmatic integration and automation.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Authentication](#authentication)
3. [API Endpoints](#api-endpoints)
   - [Pad Management](#pad-management)
   - [User & Group Management](#user--group-management)
   - [Session Management](#session-management)
   - [Pad Metadata](#pad-metadata)
4. [Complete Examples](#complete-examples)
5. [Error Handling](#error-handling)
6. [Integration Patterns](#integration-patterns)
7. [References](#references)

---

## Introduction

The Etherpad HTTP API allows external applications to programmatically control and interact with Etherpad instances. This enables you to:

- **Automate pad management** - Create, delete, and manage pads
- **Integrate with existing systems** - Map your application users to Etherpad authors
- **Embed collaborative editing** - Add real-time editing to your web applications
- **Export and sync content** - Retrieve pad content for processing or backup

### API Version

Etherpad uses **API version 1** (also referred to as `1.2.13` in some contexts). All endpoints are accessed via:

```text
http://your-etherpad-instance/api/1/methodName
```

### Use Cases

- **Content Management Systems** - Automatically create pads for new documents
- **Learning Management Systems** - Create collaborative spaces for students
- **Project Management Tools** - Generate meeting notes and documentation pads
- **Custom Applications** - Embed real-time editing with user authentication

---

## Authentication

All API requests require an API key for authentication. The API key must be included in every request.

### Obtaining Your API Key

In a Docker-based Etherpad installation, the API key is stored in the container at `/opt/etherpad-lite/APIKEY.txt`.

**Get the API key from the running container:**

```bash
# Method 1: Using docker exec
docker exec etherpad cat /opt/etherpad-lite/APIKEY.txt

# Method 2: Copy the file to your host
docker cp etherpad:/opt/etherpad-lite/APIKEY.txt ./APIKEY.txt
cat ./APIKEY.txt
```

**Example output:**

```text
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0
```

### Using the API Key

Include the API key as a query parameter named `apikey` in all requests:

```text
http://your-etherpad-instance/api/1/methodName?apikey=YOUR_API_KEY&param1=value1
```

### Security Best Practices

1. **Never commit API keys** to version control
2. **Store API keys securely** - Use environment variables or secret management
3. **Restrict API key access** - Only share with authorized developers
4. **Use HTTPS** in production to encrypt API requests
5. **Rotate API keys** periodically if compromised

---

## API Endpoints

### Pad Management

#### Create Pad

Creates a new pad with optional initial text.

**Endpoint:** `GET /api/1/createPad`

**Parameters:**

- `apikey` (required) - Your API key
- `padID` (required) - Unique identifier for the pad
- `text` (optional) - Initial text content

**Example Request (cURL):**

```bash
curl "http://localhost:11155/api/1/createPad?apikey=YOUR_API_KEY&padID=myPad&text=Hello%20World"
```

**Example Request (Python):**

```python
import requests

url = "http://localhost:11155/api/1/createPad"
params = {
    "apikey": "YOUR_API_KEY",
    "padID": "myPad",
    "text": "Hello World"
}
response = requests.get(url, params=params)
print(response.json())
```

**Example Request (JavaScript/Node.js):**

```javascript
const fetch = require("node-fetch");

const url = new URL("http://localhost:11155/api/1/createPad");
url.searchParams.append("apikey", "YOUR_API_KEY");
url.searchParams.append("padID", "myPad");
url.searchParams.append("text", "Hello World");

fetch(url)
  .then((res) => res.json())
  .then((data) => console.log(data));
```

**Response:**

```json
{
  "code": 0,
  "message": "ok",
  "data": null
}
```

**Error Response:**

```json
{
  "code": 1,
  "message": "padID does already exist",
  "data": null
}
```

---

#### Delete Pad

Deletes an existing pad permanently.

**Endpoint:** `GET /api/1/deletePad`

**Parameters:**

- `apikey` (required) - Your API key
- `padID` (required) - Pad identifier to delete

**Example Request (cURL):**

```bash
curl "http://localhost:11155/api/1/deletePad?apikey=YOUR_API_KEY&padID=myPad"
```

**Response:**

```json
{
  "code": 0,
  "message": "ok",
  "data": null
}
```

---

#### List All Pads

Retrieves a list of all pad IDs.

**Endpoint:** `GET /api/1/listAllPads`

**Parameters:**

- `apikey` (required) - Your API key

**Example Request (cURL):**

```bash
curl "http://localhost:11155/api/1/listAllPads?apikey=YOUR_API_KEY"
```

**Response:**

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "padIDs": ["pad1", "pad2", "myPad"]
  }
}
```

---

#### Get Pad Text

Retrieves the plain text content of a pad.

**Endpoint:** `GET /api/1/getText`

**Parameters:**

- `apikey` (required) - Your API key
- `padID` (required) - Pad identifier

**Example Request (cURL):**

```bash
curl "http://localhost:11155/api/1/getText?apikey=YOUR_API_KEY&padID=myPad"
```

**Response:**

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "text": "Hello World\n\nThis is the pad content."
  }
}
```

---

#### Set Pad Text

Sets or replaces the entire text content of a pad.

**Endpoint:** `POST /api/1/setText`

**Parameters:**

- `apikey` (required) - Your API key
- `padID` (required) - Pad identifier
- `text` (required) - New text content

**Example Request (cURL):**

```bash
curl -X POST "http://localhost:11155/api/1/setText" \
  -d "apikey=YOUR_API_KEY" \
  -d "padID=myPad" \
  -d "text=Updated content"
```

**Example Request (Python):**

```python
import requests

url = "http://localhost:11155/api/1/setText"
data = {
    "apikey": "YOUR_API_KEY",
    "padID": "myPad",
    "text": "Updated content"
}
response = requests.post(url, data=data)
print(response.json())
```

**Response:**

```json
{
  "code": 0,
  "message": "ok",
  "data": null
}
```

---

#### Append Text to Pad

Appends text to the end of a pad.

**Endpoint:** `POST /api/1/appendText`

**Parameters:**

- `apikey` (required) - Your API key
- `padID` (required) - Pad identifier
- `text` (required) - Text to append

**Example Request (cURL):**

```bash
curl -X POST "http://localhost:11155/api/1/appendText" \
  -d "apikey=YOUR_API_KEY" \
  -d "padID=myPad" \
  -d "text=%0A%0AAdditional content"
```

**Response:**

```json
{
  "code": 0,
  "message": "ok",
  "data": null
}
```

---

#### Get Pad HTML

Retrieves the pad content as HTML.

**Endpoint:** `GET /api/1/getHTML`

**Parameters:**

- `apikey` (required) - Your API key
- `padID` (required) - Pad identifier
- `rev` (optional) - Revision number

**Example Request (cURL):**

```bash
curl "http://localhost:11155/api/1/getHTML?apikey=YOUR_API_KEY&padID=myPad"
```

**Response:**

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "html": "<!DOCTYPE HTML><html><body><p>Hello World</p></body></html>"
  }
}
```

---

#### Set Pad HTML

Sets pad content from HTML.

**Endpoint:** `POST /api/1/setHTML`

**Parameters:**

- `apikey` (required) - Your API key
- `padID` (required) - Pad identifier
- `html` (required) - HTML content

**Example Request (cURL):**

```bash
curl -X POST "http://localhost:11155/api/1/setHTML" \
  -d "apikey=YOUR_API_KEY" \
  -d "padID=myPad" \
  -d "html=%3Chtml%3E%3Cbody%3E%3Cp%3EContent%3C%2Fp%3E%3C%2Fbody%3E%3C%2Fhtml%3E"
```

**Response:**

```json
{
  "code": 0,
  "message": "ok",
  "data": null
}
```

---

### User & Group Management

#### Create Author

Creates a new author or returns existing author ID.

**Endpoint:** `GET /api/1/createAuthorIfNotExistsFor`

**Parameters:**

- `apikey` (required) - Your API key
- `name` (optional) - Author display name
- `authorMapper` (optional) - Your application's user ID (for mapping)

**Example Request (cURL):**

```bash
curl "http://localhost:11155/api/1/createAuthorIfNotExistsFor?apikey=YOUR_API_KEY&name=John%20Doe&authorMapper=user123"
```

**Response:**

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "authorID": "a.s8oes9dhwrvt0zif"
  }
}
```

---

#### Create Group

Creates a new group or returns existing group ID.

**Endpoint:** `GET /api/1/createGroupIfNotExistsFor`

**Parameters:**

- `apikey` (required) - Your API key
- `groupMapper` (optional) - Your application's group/user ID (for mapping)

**Example Request (cURL):**

```bash
curl "http://localhost:11155/api/1/createGroupIfNotExistsFor?apikey=YOUR_API_KEY&groupMapper=user123"
```

**Response:**

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "groupID": "g.s8oes9dhwrvt0zif"
  }
}
```

---

#### Create Group Pad

Creates a pad within a specific group.

**Endpoint:** `GET /api/1/createGroupPad`

**Parameters:**

- `apikey` (required) - Your API key
- `groupID` (required) - Group identifier
- `padName` (required) - Name for the pad
- `text` (optional) - Initial text content

**Example Request (cURL):**

```bash
curl "http://localhost:11155/api/1/createGroupPad?apikey=YOUR_API_KEY&groupID=g.s8oes9dhwrvt0zif&padName=myPad&text=Initial%20content"
```

**Response:**

```json
{
  "code": 0,
  "message": "ok",
  "data": null
}
```

**Note:** The full pad ID will be `{groupID}${padName}` (e.g., `g.s8oes9dhwrvt0zif$myPad`)

---

#### List Groups

Lists all groups.

**Endpoint:** `GET /api/1/listGroups`

**Parameters:**

- `apikey` (required) - Your API key

**Example Request (cURL):**

```bash
curl "http://localhost:11155/api/1/listGroups?apikey=YOUR_API_KEY"
```

**Response:**

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "groupIDs": ["g.s8oes9dhwrvt0zif", "g.anothergroup"]
  }
}
```

---

### Session Management

#### Create Session

Creates a session for a user to access pads in a group.

**Endpoint:** `GET /api/1/createSession`

**Parameters:**

- `apikey` (required) - Your API key
- `groupID` (required) - Group identifier
- `authorID` (required) - Author identifier
- `validUntil` (optional) - Unix timestamp when session expires

**Example Request (cURL):**

```bash
# Session valid for 24 hours
VALID_UNTIL=$(($(date +%s) + 86400))
curl "http://localhost:11155/api/1/createSession?apikey=YOUR_API_KEY&groupID=g.s8oes9dhwrvt0zif&authorID=a.s8oes9dhwrvt0zif&validUntil=$VALID_UNTIL"
```

**Response:**

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "sessionID": "s.s8oes9dhwrvt0zif"
  }
}
```

**Usage:** Set the `sessionID` as a cookie named `sessionID` on your client to grant access.

---

#### Delete Session

Deletes a session.

**Endpoint:** `GET /api/1/deleteSession`

**Parameters:**

- `apikey` (required) - Your API key
- `sessionID` (required) - Session identifier

**Example Request (cURL):**

```bash
curl "http://localhost:11155/api/1/deleteSession?apikey=YOUR_API_KEY&sessionID=s.s8oes9dhwrvt0zif"
```

**Response:**

```json
{
  "code": 0,
  "message": "ok",
  "data": null
}
```

---

#### Get Session Info

Retrieves information about a session.

**Endpoint:** `GET /api/1/getSessionInfo`

**Parameters:**

- `apikey` (required) - Your API key
- `sessionID` (required) - Session identifier

**Example Request (cURL):**

```bash
curl "http://localhost:11155/api/1/getSessionInfo?apikey=YOUR_API_KEY&sessionID=s.s8oes9dhwrvt0zif"
```

**Response:**

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "authorID": "a.s8oes9dhwrvt0zif",
    "groupID": "g.s8oes9dhwrvt0zif",
    "validUntil": 1312201246
  }
}
```

---

### Pad Metadata

#### Get Revisions Count

Returns the number of revisions for a pad.

**Endpoint:** `GET /api/1/getRevisionsCount`

**Parameters:**

- `apikey` (required) - Your API key
- `padID` (required) - Pad identifier

**Example Request (cURL):**

```bash
curl "http://localhost:11155/api/1/getRevisionsCount?apikey=YOUR_API_KEY&padID=myPad"
```

**Response:**

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "revisions": 5
  }
}
```

---

#### Get Last Edited

Returns the timestamp of the last edit.

**Endpoint:** `GET /api/1/getLastEdited`

**Parameters:**

- `apikey` (required) - Your API key
- `padID` (required) - Pad identifier

**Example Request (cURL):**

```bash
curl "http://localhost:11155/api/1/getLastEdited?apikey=YOUR_API_KEY&padID=myPad"
```

**Response:**

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "lastEdited": 1312201246000
  }
}
```

**Note:** Timestamp is in milliseconds since Unix epoch.

---

#### List Authors of Pad

Returns a list of author IDs who have edited the pad.

**Endpoint:** `GET /api/1/listAuthorsOfPad`

**Parameters:**

- `apikey` (required) - Your API key
- `padID` (required) - Pad identifier

**Example Request (cURL):**

```bash
curl "http://localhost:11155/api/1/listAuthorsOfPad?apikey=YOUR_API_KEY&padID=myPad"
```

**Response:**

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "authorIDs": ["a.s8oes9dhwrvt0zif", "a.anotherauthor"]
  }
}
```

---

#### Get Read-Only ID

Returns the read-only ID for a pad (for sharing read-only access).

**Endpoint:** `GET /api/1/getReadOnlyID`

**Parameters:**

- `apikey` (required) - Your API key
- `padID` (required) - Pad identifier

**Example Request (cURL):**

```bash
curl "http://localhost:11155/api/1/getReadOnlyID?apikey=YOUR_API_KEY&padID=myPad"
```

**Response:**

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "readOnlyID": "r.s8oes9dhwrvt0zif"
  }
}
```

**Usage:** Access the pad read-only via: `http://your-etherpad-instance/p/r.s8oes9dhwrvt0zif`

---

## Complete Examples

### Example 1: Creating a Pad for a User

This example demonstrates the complete workflow of creating a pad for a specific user in your application.

**Scenario:** A web portal wants to grant user ID `7` (named "Michael") access to a new pad.

#### Step 1: Create or Get Author

```bash
curl "http://localhost:11155/api/1/createAuthorIfNotExistsFor?apikey=YOUR_API_KEY&name=Michael&authorMapper=7"
```

**Response:**

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "authorID": "a.s8oes9dhwrvt0zif"
  }
}
```

#### Step 2: Create or Get Group

```bash
curl "http://localhost:11155/api/1/createGroupIfNotExistsFor?apikey=YOUR_API_KEY&groupMapper=7"
```

**Response:**

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "groupID": "g.s8oes9dhwrvt0zif"
  }
}
```

#### Step 3: Create Pad in Group

```bash
curl "http://localhost:11155/api/1/createGroupPad?apikey=YOUR_API_KEY&groupID=g.s8oes9dhwrvt0zif&padName=samplePad&text=Welcome%20to%20your%20pad"
```

#### Step 4: Create Session

```bash
VALID_UNTIL=$(($(date +%s) + 86400))  # 24 hours
curl "http://localhost:11155/api/1/createSession?apikey=YOUR_API_KEY&groupID=g.s8oes9dhwrvt0zif&authorID=a.s8oes9dhwrvt0zif&validUntil=$VALID_UNTIL"
```

**Response:**

```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "sessionID": "s.s8oes9dhwrvt0zif"
  }
}
```

#### Step 5: Set Session Cookie and Embed Pad

In your web application, set the session cookie and embed the pad:

```html
<!-- Set cookie via JavaScript -->
<script>
  document.cookie = "sessionID=s.s8oes9dhwrvt0zif; path=/";
</script>

<!-- Embed pad -->
<iframe
  src="http://localhost:11155/p/g.s8oes9dhwrvt0zif$samplePad"
  width="100%"
  height="600px"
>
</iframe>
```

**Python Complete Example:**

```python
import requests
from datetime import datetime, timedelta

API_KEY = "YOUR_API_KEY"
BASE_URL = "http://localhost:11155/api/1"
USER_ID = "7"
USER_NAME = "Michael"

# Step 1: Create author
response = requests.get(f"{BASE_URL}/createAuthorIfNotExistsFor", params={
    "apikey": API_KEY,
    "name": USER_NAME,
    "authorMapper": USER_ID
})
author_id = response.json()["data"]["authorID"]

# Step 2: Create group
response = requests.get(f"{BASE_URL}/createGroupIfNotExistsFor", params={
    "apikey": API_KEY,
    "groupMapper": USER_ID
})
group_id = response.json()["data"]["groupID"]

# Step 3: Create pad
response = requests.get(f"{BASE_URL}/createGroupPad", params={
    "apikey": API_KEY,
    "groupID": group_id,
    "padName": "samplePad",
    "text": "Welcome to your pad"
})

# Step 4: Create session (valid for 24 hours)
valid_until = int((datetime.now() + timedelta(days=1)).timestamp())
response = requests.get(f"{BASE_URL}/createSession", params={
    "apikey": API_KEY,
    "groupID": group_id,
    "authorID": author_id,
    "validUntil": valid_until
})
session_id = response.json()["data"]["sessionID"]

print(f"Session ID: {session_id}")
print(f"Pad URL: http://localhost:11155/p/{group_id}$samplePad")
```

---

### Example 2: Embedding Pads in Web Applications

Etherpad pads can be embedded in web applications using iframes with various customization options.

**Basic Embedding:**

```html
<iframe
  src="http://localhost:11155/p/myPad"
  width="100%"
  height="600px"
  frameborder="0"
>
</iframe>
```

**With Customization Parameters:**

```html
<iframe
  src="http://localhost:11155/p/myPad#L4?showChat=false&showLineNumbers=false&userName=John"
  width="100%"
  height="600px"
  frameborder="0"
>
</iframe>
```

**Available Embed Parameters:**

- `showChat` - Show/hide chat panel (true/false)
- `showLineNumbers` - Show/hide line numbers (true/false)
- `userName` - Set user display name
- `userColor` - Set user color (hex code)
- `alwaysShowChat` - Always show chat (true/false)
- `lang` - Set language code (e.g., "en", "de", "fr")

**Example with All Options:**

```html
<iframe
  src="http://localhost:11155/p/myPad?showChat=false&showLineNumbers=true&userName=John%20Doe&userColor=%23FF0000&lang=en"
  width="100%"
  height="600px"
  frameborder="0"
>
</iframe>
```

---

### Example 3: Exporting Pad Content Programmatically

Retrieve pad content and process it for export or backup.

**Python Export Script:**

```python
import requests
from datetime import datetime

API_KEY = "YOUR_API_KEY"
BASE_URL = "http://localhost:11155/api/1"
PAD_ID = "myPad"

# Get pad text
response = requests.get(f"{BASE_URL}/getText", params={
    "apikey": API_KEY,
    "padID": PAD_ID
})
text_content = response.json()["data"]["text"]

# Get pad HTML
response = requests.get(f"{BASE_URL}/getHTML", params={
    "apikey": API_KEY,
    "padID": PAD_ID
})
html_content = response.json()["data"]["html"]

# Get metadata
response = requests.get(f"{BASE_URL}/getLastEdited", params={
    "apikey": API_KEY,
    "padID": PAD_ID
})
last_edited = response.json()["data"]["lastEdited"]

# Save to files
timestamp = datetime.fromtimestamp(last_edited / 1000).strftime("%Y%m%d_%H%M%S")

with open(f"export_{PAD_ID}_{timestamp}.txt", "w") as f:
    f.write(text_content)

with open(f"export_{PAD_ID}_{timestamp}.html", "w") as f:
    f.write(html_content)

print(f"Exported pad {PAD_ID} at {timestamp}")
```

---

### Example 4: Managing User Access with Groups and Sessions

Complete workflow for managing user access to multiple pads.

**Python Access Management:**

```python
import requests
from datetime import datetime, timedelta

API_KEY = "YOUR_API_KEY"
BASE_URL = "http://localhost:11155/api/1"

class EtherpadManager:
    def __init__(self, api_key, base_url):
        self.api_key = api_key
        self.base_url = base_url

    def get_or_create_author(self, user_id, user_name):
        """Get or create author for user"""
        response = requests.get(f"{self.base_url}/createAuthorIfNotExistsFor", params={
            "apikey": self.api_key,
            "name": user_name,
            "authorMapper": user_id
        })
        return response.json()["data"]["authorID"]

    def get_or_create_group(self, user_id):
        """Get or create group for user"""
        response = requests.get(f"{self.base_url}/createGroupIfNotExistsFor", params={
            "apikey": self.api_key,
            "groupMapper": user_id
        })
        return response.json()["data"]["groupID"]

    def create_pad_for_user(self, user_id, pad_name, initial_text=""):
        """Create a pad for a specific user"""
        group_id = self.get_or_create_group(user_id)
        response = requests.get(f"{self.base_url}/createGroupPad", params={
            "apikey": self.api_key,
            "groupID": group_id,
            "padName": pad_name,
            "text": initial_text
        })
        return f"{group_id}${pad_name}"

    def create_session(self, user_id, user_name, duration_hours=24):
        """Create a session for user access"""
        author_id = self.get_or_create_author(user_id, user_name)
        group_id = self.get_or_create_group(user_id)

        valid_until = int((datetime.now() + timedelta(hours=duration_hours)).timestamp())
        response = requests.get(f"{self.base_url}/createSession", params={
            "apikey": self.api_key,
            "groupID": group_id,
            "authorID": author_id,
            "validUntil": valid_until
        })
        return response.json()["data"]["sessionID"]

    def list_user_pads(self, user_id):
        """List all pads for a user"""
        group_id = self.get_or_create_group(user_id)
        # Note: There's no direct API to list pads in a group
        # You would need to track this in your application
        pass

# Usage
manager = EtherpadManager(API_KEY, BASE_URL)

# Create pad for user
pad_id = manager.create_pad_for_user("user123", "meeting-notes", "Meeting notes for today")

# Create session
session_id = manager.create_session("user123", "John Doe", duration_hours=48)

print(f"Pad ID: {pad_id}")
print(f"Session ID: {session_id}")
```

---

## Error Handling

### Response Format

All API responses follow this format:

```json
{
  "code": 0,
  "message": "ok",
  "data": { ... }
}
```

### Error Codes

- **0** - Success
- **1** - Invalid parameters or operation failed
- **2** - Internal error
- **3** - No such function
- **4** - Invalid API key

### Common Errors

**Invalid API Key:**

```json
{
  "code": 4,
  "message": "no or wrong API Key",
  "data": null
}
```

**Pad Already Exists:**

```json
{
  "code": 1,
  "message": "padID does already exist",
  "data": null
}
```

**Pad Not Found:**

```json
{
  "code": 1,
  "message": "padID does not exist",
  "data": null
}
```

**Invalid Parameters:**

```json
{
  "code": 1,
  "message": "required parameter missing",
  "data": null
}
```

### Error Handling Example

**Python with Error Handling:**

```python
import requests

def create_pad_safe(api_key, pad_id, text=""):
    """Create pad with proper error handling"""
    url = "http://localhost:11155/api/1/createPad"
    params = {
        "apikey": api_key,
        "padID": pad_id,
        "text": text
    }

    try:
        response = requests.get(url, params=params, timeout=10)
        result = response.json()

        if result["code"] == 0:
            return {"success": True, "data": result["data"]}
        else:
            return {
                "success": False,
                "error_code": result["code"],
                "error_message": result["message"]
            }
    except requests.exceptions.RequestException as e:
        return {
            "success": False,
            "error": "Network error",
            "details": str(e)
        }

# Usage
result = create_pad_safe("YOUR_API_KEY", "myPad", "Hello")
if result["success"]:
    print("Pad created successfully")
else:
    print(f"Error: {result.get('error_message', result.get('error'))}")
```

---

## Integration Patterns

### REST Client Examples

#### cURL

**Basic GET Request:**

```bash
curl "http://localhost:11155/api/1/getText?apikey=YOUR_API_KEY&padID=myPad"
```

**POST Request:**

```bash
curl -X POST "http://localhost:11155/api/1/setText" \
  -d "apikey=YOUR_API_KEY" \
  -d "padID=myPad" \
  -d "text=New content"
```

**With Headers:**

```bash
curl -X POST "http://localhost:11155/api/1/setText" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "apikey=YOUR_API_KEY" \
  -d "padID=myPad" \
  -d "text=New content"
```

#### Python with requests

**Simple Client Class:**

```python
import requests
from typing import Optional, Dict, Any

class EtherpadClient:
    def __init__(self, base_url: str, api_key: str):
        self.base_url = base_url.rstrip('/')
        self.api_key = api_key
        self.api_path = f"{self.base_url}/api/1"

    def _request(self, method: str, endpoint: str, params: Optional[Dict] = None, data: Optional[Dict] = None) -> Dict[str, Any]:
        """Make API request"""
        url = f"{self.api_path}/{endpoint}"
        params = params or {}
        params["apikey"] = self.api_key

        if method.upper() == "GET":
            response = requests.get(url, params=params)
        else:
            response = requests.post(url, params=params, data=data)

        response.raise_for_status()
        return response.json()

    def create_pad(self, pad_id: str, text: str = "") -> Dict[str, Any]:
        """Create a new pad"""
        return self._request("GET", "createPad", params={
            "padID": pad_id,
            "text": text
        })

    def get_text(self, pad_id: str) -> str:
        """Get pad text content"""
        result = self._request("GET", "getText", params={"padID": pad_id})
        return result["data"]["text"]

    def set_text(self, pad_id: str, text: str) -> Dict[str, Any]:
        """Set pad text content"""
        return self._request("POST", "setText", data={
            "padID": pad_id,
            "text": text
        })

    def delete_pad(self, pad_id: str) -> Dict[str, Any]:
        """Delete a pad"""
        return self._request("GET", "deletePad", params={"padID": pad_id})

# Usage
client = EtherpadClient("http://localhost:11155", "YOUR_API_KEY")
client.create_pad("myPad", "Hello World")
content = client.get_text("myPad")
print(content)
```

#### JavaScript/Node.js

**Simple Client:**

```javascript
const fetch = require("node-fetch");

class EtherpadClient {
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.apiKey = apiKey;
    this.apiPath = `${this.baseUrl}/api/1`;
  }

  async request(method, endpoint, params = {}, data = null) {
    const url = new URL(`${this.apiPath}/${endpoint}`);
    url.searchParams.append("apikey", this.apiKey);

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const options = {
      method: method.toUpperCase(),
      headers: {},
    };

    if (data && method.toUpperCase() === "POST") {
      options.headers["Content-Type"] = "application/x-www-form-urlencoded";
      options.body = new URLSearchParams(data).toString();
    }

    const response = await fetch(url.toString(), options);
    return await response.json();
  }

  async createPad(padId, text = "") {
    return this.request("GET", "createPad", {
      padID: padId,
      text: text,
    });
  }

  async getText(padId) {
    const result = await this.request("GET", "getText", { padID: padId });
    return result.data.text;
  }

  async setText(padId, text) {
    return this.request(
      "POST",
      "setText",
      {},
      {
        padID: padId,
        text: text,
      },
    );
  }

  async deletePad(padId) {
    return this.request("GET", "deletePad", { padID: padId });
  }
}

// Usage
const client = new EtherpadClient("http://localhost:11155", "YOUR_API_KEY");
client
  .createPad("myPad", "Hello World")
  .then((result) => console.log(result))
  .catch((err) => console.error(err));
```

### SSO Integration Considerations

If your Etherpad instance uses SSO (Single Sign-On) authentication, you'll need to:

1. **Configure SSO clients** in `config/etherpad.settings.json`
2. **Use OAuth tokens** instead of API keys for authenticated requests
3. **Set Authorization header** instead of query parameter:

```bash
curl -H "Authorization: Bearer YOUR_OAUTH_TOKEN" \
  "http://localhost:11155/api/1/getText?padID=myPad"
```

For more details on SSO configuration, see the [Admin Guide](./admin-guide.md).

---

## References

### Official Documentation

- **Etherpad API Documentation**: <https://docs.etherpad.org/api/>
- **HTTP API Reference**: <https://docs.etherpad.org/api/http_api.html>
- **Embed Parameters**: <https://docs.etherpad.org/api/embed_parameters.html>
- **Etherpad Docker Documentation**: <https://docs.etherpad.org/docker.html>

### Additional Resources

- **Etherpad GitHub Repository**: <https://github.com/ether/etherpad-lite>
- **Etherpad Community**: <https://etherpad.org/>
- **Etherpad Plugins**: <https://static.etherpad.org/>

### Related Documentation

- [Admin Guide](./admin-guide.md) - Configuration and administration
- [User Guide](./user-guide.md) - End-user documentation
- [Getting Started](./getting-started.md) - Quick start guide

---

## Quick Reference

### Common Endpoints

| Method | Endpoint                            | Purpose             |
| ------ | ----------------------------------- | ------------------- |
| GET    | `/api/1/createPad`                  | Create new pad      |
| GET    | `/api/1/deletePad`                  | Delete pad          |
| GET    | `/api/1/getText`                    | Get pad text        |
| POST   | `/api/1/setText`                    | Set pad text        |
| GET    | `/api/1/getHTML`                    | Get pad HTML        |
| GET    | `/api/1/createAuthorIfNotExistsFor` | Create/get author   |
| GET    | `/api/1/createGroupIfNotExistsFor`  | Create/get group    |
| GET    | `/api/1/createSession`              | Create user session |

### Response Codes

- `0` - Success
- `1` - Invalid parameters
- `2` - Internal error
- `3` - No such function
- `4` - Invalid API key

---

**Last Updated:** 2026-01-07  
**API Version:** 1.2.13
