# Database Schemas

## Firestore Schema

**Collection Structure:**

```
/users/{uid}
  - email: string
  - displayName: string
  - status: 'online' | 'offline'
  - lastSeen: timestamp
  - createdAt: timestamp

/conversations/{conversationId}
  - participants: string[]
  - isGroup: boolean
  - groupName: string | null
  - lastMessage: {
      text: string,
      senderId: string,
      timestamp: timestamp
    } | null
  - lastMessageTimestamp: timestamp
  - createdAt: timestamp
  - createdBy: string

  /messages/{messageId} (subcollection)
    - senderId: string
    - text: string
    - timestamp: timestamp (server)
    - status: string
    - readBy: string[]
    - createdAt: timestamp
```

**Indexes (Firestore automatic):**
- `conversations` collection: Index on `participants` (array-contains)
- `conversations` collection: Composite index on `participants` + `lastMessageTimestamp` (desc)
- `messages` subcollection: Index on `timestamp` (asc)

**Security Rules:** See Security section below.

---

## SQLite Schema

**Tables:**

```sql
CREATE TABLE users (
  uid TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  displayName TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'offline',
  lastSeen INTEGER,
  createdAt INTEGER NOT NULL
);

CREATE TABLE conversations (
  id TEXT PRIMARY KEY,
  participants TEXT NOT NULL,        -- JSON string array of UIDs
  isGroup INTEGER NOT NULL DEFAULT 0, -- Boolean: 0=false, 1=true
  groupName TEXT,
  lastMessageText TEXT,
  lastMessageSenderId TEXT,
  lastMessageTimestamp INTEGER,
  createdAt INTEGER NOT NULL,
  createdBy TEXT NOT NULL
);

CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  conversationId TEXT NOT NULL,
  senderId TEXT NOT NULL,
  text TEXT NOT NULL,
  timestamp INTEGER NOT NULL,
  status TEXT NOT NULL,               -- 'sending', 'sent', 'delivered', 'read', 'failed'
  readBy TEXT NOT NULL DEFAULT '[]',  -- JSON string array of UIDs
  localOnly INTEGER NOT NULL DEFAULT 0, -- Boolean: 0=false, 1=true
  createdAt INTEGER NOT NULL,
  FOREIGN KEY (conversationId) REFERENCES conversations(id)
);

-- Indexes for performance
CREATE INDEX idx_messages_conversation ON messages(conversationId, timestamp);
CREATE INDEX idx_messages_local ON messages(localOnly, status);
CREATE INDEX idx_conversations_timestamp ON conversations(lastMessageTimestamp DESC);
```

**Notes:**
- Arrays stored as JSON strings (SQLite limitation)
- Boolean values stored as INTEGER (0/1)
- Timestamps stored as INTEGER (Unix milliseconds)
- Foreign keys defined but not enforced (for flexibility)

---
