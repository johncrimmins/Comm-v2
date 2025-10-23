# Epic 2: One-on-One Messaging Core

**Epic Goal:** Implement the core messaging infrastructure with real-time message delivery, optimistic UI updates, local persistence via Expo SQLite, and offline resilience for one-on-one conversations. This epic proves the messaging architecture is solid.

## Story 2.1: Local Message Database (SQLite) Setup

**As a** developer,  
**I want** to set up Expo SQLite for local message storage,  
**So that** messages persist locally and the app works offline.

**Acceptance Criteria:**
- Expo SQLite installed (`expo-sqlite`)
- Database file created: `comm.db`
- Messages table schema:
  ```sql
  CREATE TABLE messages (
    id TEXT PRIMARY KEY,
    conversationId TEXT NOT NULL,
    senderId TEXT NOT NULL,
    text TEXT NOT NULL,
    timestamp INTEGER NOT NULL,
    status TEXT NOT NULL, -- 'sending', 'sent', 'delivered', 'read', 'failed'
    localOnly INTEGER DEFAULT 0, -- 1 if not yet synced to Firestore
    createdAt INTEGER NOT NULL
  );
  ```
- Conversations table schema:
  ```sql
  CREATE TABLE conversations (
    id TEXT PRIMARY KEY,
    participantIds TEXT NOT NULL, -- JSON array of UIDs
    lastMessageText TEXT,
    lastMessageTimestamp INTEGER,
    createdAt INTEGER NOT NULL
  );
  ```
- Database initialized on app startup
- Helper service created: `sqliteService.ts` with methods:
  - `saveMessage(message)` - Insert or update message
  - `getMessages(conversationId)` - Get messages for conversation (ordered by timestamp)
  - `getConversations()` - Get all conversations
  - `updateMessageStatus(messageId, status)` - Update message status

**Technical Notes:**
- Use Expo SQLite's async API
- Create indexes on `conversationId` and `timestamp` for fast queries
- Handle database migrations gracefully

---

## Story 2.2: Conversation List Screen with Firestore Sync

**As a** user,  
**I want** to see a list of my conversations,  
**So that** I can select a conversation to view.

**Acceptance Criteria:**
- Conversation List screen displays all conversations for logged-in user
- Each conversation item shows:
  - Other user's display name
  - Last message preview (truncated to 50 characters)
  - Timestamp of last message (formatted: "Just now", "5m ago", "Yesterday", etc.)
- Conversations sorted by most recent message first
- Tapping a conversation navigates to Chat screen for that conversation
- Real-time sync: New conversations appear automatically
- Empty state: "No conversations yet. Start a new chat!" with button to create conversation
- Conversations stored locally in SQLite and synced from Firestore
- Loading state while fetching initial conversations
- Pull-to-refresh to manually trigger sync

**Technical Notes:**
- Firestore collection: `conversations/{conversationId}` with fields:
  ```
  {
    participants: [uid1, uid2],
    lastMessage: { text, timestamp, senderId },
    createdAt: timestamp
  }
  ```
- Firestore query: Where `participants array-contains currentUserId`
- Real-time listener: `onSnapshot()` for live updates
- Sync to local SQLite on Firestore updates
- UI renders from SQLite for fast initial load

---

## Story 2.3: Start New Conversation (User Selection)

**As a** user,  
**I want** to start a new one-on-one conversation with another user,  
**So that** I can send them messages.

**Acceptance Criteria:**
- "New Conversation" button in conversation list (top-right, "+" icon)
- Tapping button navigates to "Select User" screen
- Select User screen shows list of all registered users (excluding current user)
- Each user item displays: display name
- Search bar to filter users by display name
- Tapping a user:
  - Creates new conversation in Firestore (if one doesn't already exist between the two users)
  - Navigates to Chat screen for that conversation
- If conversation already exists with selected user, navigate to existing conversation
- Loading state while fetching users

**Technical Notes:**
- Fetch users from Firestore `users` collection
- Check for existing conversation: Query `conversations` where `participants` contains both UIDs
- Create conversation document in Firestore:
  ```
  {
    participants: [currentUserId, selectedUserId],
    createdAt: serverTimestamp(),
    lastMessage: null
  }
  ```
- Use Firestore transaction to avoid duplicate conversations

---

## Story 2.4: Chat Screen with Message Display

**As a** user,  
**I want** to view message history in a conversation,  
**So that** I can see past messages.

**Acceptance Criteria:**
- Chat screen displays conversation header: Other user's display name
- Message list displays all messages in conversation (ordered by timestamp, oldest first)
- Each message shows:
  - Message text
  - Timestamp (formatted: "10:23 AM")
  - Sender indication (my messages right-aligned, their messages left-aligned)
  - Status indicator for my messages: sending (clock), sent (checkmark), delivered (double checkmark), read (blue double checkmark)
- Messages load from local SQLite on screen open (fast initial render)
- Real-time sync: New messages from other user appear automatically
- Smooth scrolling performance (60fps for 200+ messages)
- Auto-scroll to bottom when new message arrives or user sends message
- Empty state: "No messages yet. Say hi!" if no messages
- Back button returns to conversation list

**Technical Notes:**
- Use FlatList with `inverted` prop for chat-style scrolling
- Render from SQLite first, then sync from Firestore
- Firestore subcollection: `conversations/{conversationId}/messages/{messageId}`
- Real-time listener: `onSnapshot()` for live message updates
- Optimize: Only fetch last 50 messages initially, load more on scroll up (pagination)

---

## Story 2.5: Send Message with Optimistic Update

**As a** user,  
**I want** to send a text message to another user,  
**So that** I can communicate with them instantly.

**Acceptance Criteria:**
- Message input box at bottom of chat screen
- Typing in input box: Text displays in real-time
- "Send" button (paper plane icon) appears when text is entered
- Tapping "Send":
  - Message appears instantly in chat UI (optimistic update) with "sending" status
  - Message text input clears
  - Keyboard remains open
  - Message saved to local SQLite with `status: 'sending'`, `localOnly: 1`
  - Message sent to Firestore asynchronously
- On successful Firestore write:
  - Update message status to 'sent'
  - Update local SQLite: `localOnly: 0`, `status: 'sent'`
  - Status indicator updates to "sent" (single checkmark)
- On failure:
  - Update message status to 'failed'
  - Display retry button next to failed message
- Message delivery under 300ms when both users online
- Conversation list updates with last message and timestamp

**Technical Notes:**
- Generate unique message ID client-side (UUID)
- Optimistic update: Add to SQLite immediately, render in UI
- Firestore write: `addDoc()` to `conversations/{conversationId}/messages`
- Message document:
  ```
  {
    id: messageId,
    senderId: currentUserId,
    text: messageText,
    timestamp: serverTimestamp(),
    status: 'sent',
    createdAt: serverTimestamp()
  }
  ```
- Update conversation's `lastMessage` field on successful send

---

## Story 2.6: Real-Time Message Receiving

**As a** user,  
**I want** to receive messages from another user in real-time,  
**So that** I see new messages instantly when they send them.

**Acceptance Criteria:**
- When other user sends message, it appears in my chat screen within 300ms (when online)
- New message appears at bottom of chat (auto-scroll to bottom)
- No manual refresh required
- Message includes: text, timestamp, sender's display name
- Message saved to local SQLite immediately
- Conversation list updates with last message preview
- Works when chat screen is open or conversation list is open

**Technical Notes:**
- Firestore real-time listener on `conversations/{conversationId}/messages` collection
- `onSnapshot()` detects new messages immediately
- On new message:
  - Save to local SQLite
  - Update UI from SQLite
  - Update conversation list if applicable

---

## Story 2.7: Message Timestamps

**As a** user,  
**I want** to see timestamps on messages,  
**So that** I know when each message was sent.

**Acceptance Criteria:**
- Each message displays timestamp next to message bubble
- Timestamp format:
  - Today: Time only ("10:23 AM")
  - Yesterday: "Yesterday 10:23 AM"
  - Older: Date and time ("Oct 20, 10:23 AM")
- Timestamps update automatically (e.g., "Just now" becomes "1m ago")
- Timestamps are timezone-aware (user's local timezone)

**Technical Notes:**
- Use `date-fns` or similar library for formatting
- Store timestamps as UTC in Firestore
- Convert to local timezone for display

---

## Story 2.8: Online/Offline Status Indicators

**As a** user,  
**I want** to see if the other person is online or offline,  
**So that** I know if they'll receive my message immediately.

**Acceptance Criteria:**
- Chat screen header shows online/offline indicator:
  - Green dot + "Online" when other user is online
  - Gray dot + "Offline" when other user is offline
- Status updates in real-time (within 2-3 seconds of status change)
- Presence tracked in Firestore:
  - User's status updates to "online" when app is active
  - User's status updates to "offline" when app goes to background or closes
- Presence status also shows in conversation list (optional small indicator)

**Technical Notes:**
- Firestore presence system:
  - Add `status` field to `users/{uid}` document: "online" or "offline"
  - Update status to "online" on app foreground
  - Update status to "offline" on app background (use `AppState` API)
- Use Firebase's `onDisconnect()` for automatic offline detection (if using Realtime Database)
- Alternative: Periodic heartbeat (update timestamp every 30s, consider offline if no update in 60s)

---

## Story 2.9: Offline Message Queueing

**As a** user,  
**I want** to send messages even when offline,  
**So that** my messages are delivered when I reconnect.

**Acceptance Criteria:**
- When offline, user can still type and send messages
- Messages sent while offline:
  - Appear in chat UI immediately (optimistic update)
  - Saved to local SQLite with `status: 'sending'`, `localOnly: 1`
  - Queued for sending
- Connection status indicator shows "Offline" when no internet
- When connection restored:
  - App automatically detects reconnection within 2-3 seconds
  - Queued messages sent to Firestore automatically
  - Message status updates to 'sent' on successful upload
  - Status indicator shows "Online"
- User never loses unsent messages

**Technical Notes:**
- Detect network status using `@react-native-community/netinfo`
- Query local SQLite for messages with `localOnly: 1` on reconnect
- Send queued messages to Firestore sequentially
- Handle failures gracefully (retry logic)

---

## Story 2.10: Message Read Receipts

**As a** user,  
**I want** to see when the other person has read my message,  
**So that** I know they saw it.

**Acceptance Criteria:**
- When recipient opens conversation and views messages:
  - All unread messages marked as "read"
  - Read status synced to Firestore
- Sender sees read receipt:
  - Message status updates from "delivered" to "read"
  - Blue double checkmark appears on message
- Read receipts update in real-time
- Read status persists across app restarts

**Technical Notes:**
- Add `readBy` field to message document: Array of UIDs who have read it
- On opening conversation, mark all messages as read:
  - Update Firestore: Add current UID to `readBy` array
  - Update local SQLite: `status: 'read'`
- Real-time listener detects read status changes
- Batch updates for performance (mark multiple messages read in single Firestore transaction)

---

## Story 2.11: Connection Status Indicator

**As a** user,  
**I want** to see my connection status clearly,  
**So that** I know if I'm online or offline.

**Acceptance Criteria:**
- Persistent connection status banner/indicator visible throughout app
- Status states:
  - **Online:** Green indicator, no banner
  - **Offline:** Red banner at top: "You're offline. Messages will send when you reconnect."
  - **Reconnecting:** Yellow banner: "Reconnecting..."
- Status updates in real-time based on network state
- Banner disappears when status returns to online
- User can tap banner to retry connection (optional)

**Technical Notes:**
- Use `@react-native-community/netinfo` to detect network changes
- Update global connection state in React Context
- Display banner component in root layout

---
