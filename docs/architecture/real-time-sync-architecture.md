# Real-Time Sync Architecture

## Sync Flow

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant SQLite
    participant Sync
    participant Firestore
    
    Note over User,Firestore: Message Send (Optimistic)
    User->>UI: Type and send message
    UI->>SQLite: Write message (localOnly=true)
    SQLite-->>UI: Success (instant)
    UI->>User: Show message immediately
    UI->>Sync: Queue for upload
    Sync->>Firestore: Upload message (async)
    Firestore-->>Sync: Confirm
    Sync->>SQLite: Update (localOnly=false, status=sent)
    SQLite-->>UI: Updated message
    UI->>User: Show "sent" checkmark
    
    Note over User,Firestore: Message Receive (Real-time)
    Firestore->>Sync: onSnapshot: New message
    Sync->>SQLite: Save message
    SQLite-->>Sync: Saved
    Sync->>UI: Notify new message
    UI->>User: Display message + notification
```

## Offline Queueing

**Strategy:**
1. User sends message while offline
2. Message saved to SQLite with `localOnly=true`, `status='sending'`
3. UI displays message immediately
4. Network detection (NetInfo) detects reconnection
5. Sync Engine queries SQLite for messages where `localOnly=true`
6. Messages uploaded to Firestore sequentially
7. On success: Update `localOnly=false`, `status='sent'`
8. On failure: Update `status='failed'`, show retry button

**Retry Logic:**
- Exponential backoff: 1s, 2s, 4s, 8s, 16s (max)
- After 5 failed attempts, mark as 'failed' and require manual retry

---
