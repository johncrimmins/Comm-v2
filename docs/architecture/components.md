# Components

## Authentication Service

**Responsibility:** Provides basic authentication to identify users and control access to the app. Minimal complexity - just sign in/out functionality.

**Key Interfaces:**
- `signIn(email: string, password: string): Promise<User>` - Authenticate user
- `signUp(email: string, password: string, displayName: string): Promise<User>` - Create new account (simple, single-screen)
- `signOut(): Promise<void>` - Sign out current user
- `getCurrentUser(): User | null` - Get currently authenticated user
- `onAuthStateChange(callback: (user: User | null) => void): Unsubscribe` - Listen for auth state changes

**Dependencies:**
- Firebase Authentication SDK (email/password only)
- Firestore (minimal - just store displayName)

**Technology Stack:** 
- Firebase Auth (email/password provider only)
- React Context for auth state
- Simple conditional rendering for auth gates

**Implementation Notes:**
- **Keep it simple:** No password reset, email verification, or social auth in MVP
- **Combined auth screen:** Single screen with "Sign In" / "Sign Up" toggle
- **Minimal validation:** Just check email format and password length (6+ chars)
- **Auto-login:** Remember user session across app restarts (Firebase handles this)
- **Basic error messages:** "Invalid credentials" or "Email already in use"

---

## Messaging Service

**Responsibility:** Core messaging operations - sending, receiving, and managing messages and conversations.

**Key Interfaces:**
- `sendMessage(conversationId: string, text: string): Promise<Message>` - Send new message (optimistic)
- `getMessages(conversationId: string, limit?: number): Promise<Message[]>` - Get messages for conversation
- `markMessagesAsRead(conversationId: string, messageIds: string[]): Promise<void>` - Update read status
- `createConversation(participantUids: string[], groupName?: string): Promise<Conversation>` - Create new conversation
- `getConversations(): Promise<Conversation[]>` - Get all user conversations
- `subscribeToConversation(conversationId: string, callback: (message: Message) => void): Unsubscribe` - Real-time message listener

**Dependencies:**
- SQLite Service (local storage)
- Sync Engine (cloud sync)
- Auth Service (current user UID)

**Technology Stack:** 
- Firestore for cloud message storage
- SQLite for local message storage
- Custom hooks for component integration

---

## Sync Engine

**Responsibility:** Synchronizes data between local SQLite and cloud Firestore, handles offline queueing, and manages conflict resolution.

**Key Interfaces:**
- `syncConversations(): Promise<void>` - Sync all conversations from Firestore to SQLite
- `syncMessages(conversationId: string): Promise<void>` - Sync messages for specific conversation
- `uploadPendingMessages(): Promise<void>` - Upload unsent messages from local queue to Firestore
- `handleIncomingMessage(message: Message): Promise<void>` - Process real-time message from Firestore
- `startRealtimeSync(): void` - Initialize real-time Firestore listeners
- `stopRealtimeSync(): void` - Clean up Firestore listeners

**Dependencies:**
- SQLite Service (local data access)
- Firestore (cloud data access)
- Network Detection (online/offline state)

**Technology Stack:** 
- Firestore real-time listeners (onSnapshot)
- NetInfo for network detection
- Custom sync logic with retry mechanisms

**Sync Strategy:**
1. **On app launch:** Load from SQLite first (instant UI), then sync from Firestore in background
2. **On message send:** Write to SQLite immediately, upload to Firestore async
3. **On Firestore change:** Update SQLite, trigger UI re-render
4. **On reconnect:** Upload queued local messages, fetch missed remote messages

---

## SQLite Service

**Responsibility:** Abstracts all local database operations for users, conversations, and messages.

**Key Interfaces:**
- `initializeDatabase(): Promise<void>` - Create tables and indexes
- `saveUser(user: User): Promise<void>` - Insert or update user
- `saveConversation(conversation: Conversation): Promise<void>` - Insert or update conversation
- `saveMessage(message: Message): Promise<void>` - Insert or update message
- `getMessages(conversationId: string, limit?: number): Promise<Message[]>` - Query messages
- `getConversations(userId: string): Promise<Conversation[]>` - Query conversations
- `updateMessageStatus(messageId: string, status: MessageStatus): Promise<void>` - Update message status
- `getUnsyncedMessages(): Promise<Message[]>` - Get messages with localOnly=true

**Dependencies:**
- Expo SQLite

**Technology Stack:** 
- expo-sqlite for database access
- Prepared statements for performance
- Transactions for atomicity

---

## Notification Service

**Responsibility:** Manages push notifications for new messages when app is in foreground.

**Key Interfaces:**
- `requestPermissions(): Promise<boolean>` - Request notification permissions from user
- `showMessageNotification(message: Message, conversationName: string): Promise<void>` - Display local notification
- `handleNotificationTap(data: NotificationData): void` - Navigate to conversation when notification tapped
- `cancelNotification(notificationId: string): Promise<void>` - Cancel notification

**Dependencies:**
- Expo Notifications
- Navigation (for deep linking)

**Technology Stack:** 
- Expo Notifications API
- Local notifications (no FCM server needed for MVP foreground)
- Notification categories and actions

---

## Presence Service

**Responsibility:** Tracks and displays user online/offline status in real-time.

**Key Interfaces:**
- `updatePresence(status: 'online' | 'offline'): Promise<void>` - Update current user status in Firestore
- `subscribeToUserPresence(uid: string, callback: (status: string) => void): Unsubscribe` - Listen to another user's presence
- `startPresenceTracking(): void` - Begin automatic presence updates based on app state
- `stopPresenceTracking(): void` - Stop presence tracking

**Dependencies:**
- Firestore (user status updates)
- AppState API (detect foreground/background)
- NetInfo (detect network status)

**Technology Stack:** 
- Firestore real-time updates
- React Native AppState
- Periodic heartbeat (every 30 seconds when online)

---
