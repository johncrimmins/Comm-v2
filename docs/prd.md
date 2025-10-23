# Comm Product Requirements Document (PRD)

## Goals and Background Context

### Goals

- **Prove messaging infrastructure reliability** through real-time sync, optimistic updates, and offline resilience
- **Deliver sub-300ms message latency** for all online users with instant perceived send speed
- **Achieve 100% message persistence** across app restarts, force-quits, and device reboots
- **Enable multi-user testing** with simultaneous users experiencing smooth, crash-free performance
- **Establish clean architecture foundation** for rapid post-MVP feature development
- **Demonstrate offline-first design** with automatic message queueing and sync recovery
- **Deploy to Expo Go** for real-world multi-device testing

### Background Context

Busy startup founders need communication tools that work reliably under any conditions. WhatsApp demonstrated that two developers could build messaging infrastructure serving billions by focusing on fundamentals: instant delivery, offline resilience, and message persistence. Comm follows this philosophy, building production-quality messaging infrastructure before adding features.

The MVP focuses exclusively on proving the core messaging architecture is solid. By implementing real-time sync via Firebase Firestore, local persistence with Expo SQLite, optimistic UI updates, and robust offline handling, we create a foundation that can scale to support advanced features post-MVP. The success of this MVP is measured not by feature count, but by infrastructure reliability.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2025-10-22 | 1.0 | Initial PRD created from Project Brief | John (PM) |

---

## Requirements

### Functional Requirements

**FR1:** Users can create accounts with display names and authenticate using Firebase Authentication

**FR2:** Users can send text messages to another user in real-time, with messages delivered in under 300ms when both users are online

**FR3:** Messages appear instantly in sender's UI (optimistic update) before server confirmation

**FR4:** All messages persist locally using Expo SQLite and survive app restarts, force-quits, and device reboots

**FR5:** Messages sync to Firebase Firestore and remain accessible across devices after re-authentication

**FR6:** Users see online/offline status indicators for conversation participants with immediate status updates

**FR7:** Each message displays timestamp indicating when it was sent

**FR8:** Users receive read receipts showing when messages were delivered and read

**FR9:** Users can create group conversations with 3+ participants

**FR10:** Group messages deliver to all participants in real-time with individual read receipts

**FR11:** Messages sent while offline queue locally and automatically send when connection is restored

**FR12:** App reconnects within 2-3 seconds after coming back online from offline state

**FR13:** Users receive push notifications for new messages when app is in foreground (via Expo Notifications)

**FR14:** Connection status indicator shows user their current online/offline/reconnecting state

**FR15:** App launches in under 5 seconds from tap to ready state

### Non-Functional Requirements

**NFR1:** Message delivery latency must be under 300ms (P95) for online users

**NFR2:** App must maintain smooth 60fps scrolling performance for conversations with 200+ messages

**NFR3:** Firebase free tier limits must not be exceeded during MVP testing (monitor Firestore reads/writes)

**NFR4:** API keys and sensitive credentials must never be exposed in the mobile app code (use Expo secure environment variables)

**NFR5:** All message operations require authentication via Firebase Auth

**NFR6:** Codebase must maintain clean organization with clear separation: screens, components, hooks, services, utils

**NFR7:** The app must handle multiple simultaneous users testing without performance degradation or sync conflicts

**NFR8:** Crash-free session rate must exceed 99.5%

**NFR9:** Local SQLite database must efficiently handle 10,000+ messages without performance degradation

**NFR10:** Firebase Security Rules must prevent unauthorized access to user messages and conversations

---

## User Interface Design Goals

### Overall UX Vision

Comm prioritizes **clarity, speed, and reliability** over visual complexity. The interface should feel familiar to anyone who has used messaging apps, with standard patterns: conversation list, chat view, message composition. Visual design emphasizes:

- **Clear connection status** - Users always know if they're online or offline
- **Instant feedback** - Every action (send message, open chat) feels immediate
- **Minimal friction** - Fast navigation, responsive keyboard, smooth scrolling
- **Clean aesthetics** - Uncluttered interface focused on content (messages)

### Key Interaction Paradigms

- **Optimistic updates** - Messages appear instantly when sent, update with delivery confirmation
- **Pull-to-refresh** - Manual sync trigger if automatic sync seems stuck
- **Swipe gestures** - Standard mobile patterns (swipe to go back)
- **Keyboard optimization** - Smart keyboard handling, no lag or freezing
- **Real-time updates** - Messages from others appear instantly without refresh

### Core Screens and Views

1. **Authentication Screen** - Sign up / Sign in with display name
2. **Conversation List Screen** - All conversations (one-on-one and groups) with last message preview
3. **Chat Screen** - Individual conversation view with message history and composition
4. **New Conversation Screen** - Select user(s) to start new chat or group
5. **Connection Status Indicator** - Persistent visual indicator of online/offline/reconnecting state (potentially a banner or header element)

### Accessibility

Accessibility: Basic (MVP focus on core functionality)
- Text should be readable with system font scaling
- Color contrast meets basic readability standards
- Interactive elements have sufficient touch target size (44x44pt minimum)

Post-MVP will address WCAG AA compliance.

### Branding

**MVP Branding:** Minimal and functional
- Simple, clean interface
- Standard iOS/Android design patterns
- Focus on usability over custom branding

No custom branding required for MVP. Post-MVP can introduce logo, custom colors, and brand identity.

### Target Device and Platforms

**Primary:** iOS via Expo Go  
**Secondary:** iOS Simulator  
**Stretch:** Android via Expo Go (if time permits, but not required for MVP gate)

Responsive design for various phone sizes (iPhone SE to iPhone Pro Max). No tablet or desktop optimization in MVP.

---

## Technical Assumptions

### Repository Structure

**Monorepo** - Single repository containing the React Native Expo app

Project structure:
```
comm/
├── app/                 # Expo Router screens
├── components/          # Reusable React components
├── hooks/              # Custom React hooks
├── services/           # Firebase, API, and business logic services
├── store/              # Local state management
├── utils/              # Helper functions
├── types/              # TypeScript types
├── assets/             # Images, fonts
└── docs/               # Project documentation
```

### Service Architecture

**Client-side focused with Firebase Backend-as-a-Service (BaaS)**

- **Frontend:** React Native with Expo SDK (no custom native code)
- **Real-time sync:** Firebase Firestore with real-time listeners
- **Authentication:** Firebase Authentication
- **Push notifications:** Expo Notifications (foreground only for MVP)
- **Local persistence:** Expo SQLite
- **No custom backend servers** - All logic client-side or Firebase Security Rules

### Testing Requirements

**MVP Testing Strategy:**

- **Manual testing:** Primary approach for MVP (testing on simulators and Expo Go)
- **Unit tests:** For critical utility functions and services (optional but recommended)
- **Integration tests:** Deferred to post-MVP
- **E2E tests:** Deferred to post-MVP

**Testing focus areas:**
- Multi-user scenarios (2-3 team members testing simultaneously)
- Offline-to-online transitions
- App lifecycle (force-quit, reopen, background/foreground)
- Message delivery in various network conditions
- Performance with 200+ messages

### Additional Technical Assumptions and Requests

**Technology Stack:**
- **Language:** TypeScript (strongly recommended for type safety in messaging logic)
- **Framework:** React Native with Expo SDK 49+
- **Navigation:** Expo Router (file-based routing)
- **State Management:** React Context + Hooks (keep simple for MVP)
- **Local Database:** Expo SQLite
- **Backend:** Firebase (Firestore, Auth, FCM)
- **Push Notifications:** Expo Notifications (no FCM Cloud Functions)

**Development Tools:**
- Expo CLI
- Firebase Console
- VS Code or preferred editor
- iOS Simulator / Expo Go app

**Deployment:**
- Expo Go (primary deployment target)
- No App Store / Play Store deployment for MVP
- No native builds unless absolutely required

**Performance Optimization:**
- Use FlatList for message rendering (virtualized scrolling)
- Paginate message history (load 50 messages at a time)
- Debounce Firestore writes for typing/presence indicators
- Optimize Firestore queries (indexed, limited)

**Security:**
- Firebase Security Rules to enforce user isolation
- API keys in Expo environment variables (never in code)
- Authentication required for all message operations
- No sensitive data in local storage (only message content and metadata)

**Offline Handling:**
- Firestore offline persistence enabled
- Local SQLite as source of truth for UI
- Queue unsent messages locally, sync on reconnect
- Clear "offline mode" indicator for users

---

## Epic List

**Epic 1: Foundation & Authentication**  
*Goal:* Establish project foundation, Firebase integration, and user authentication system

**Epic 2: One-on-One Messaging Core**  
*Goal:* Implement real-time messaging infrastructure with optimistic updates, persistence, and offline support for two-user conversations

**Epic 3: Group Chat**  
*Goal:* Extend messaging infrastructure to support multi-user group conversations

**Epic 4: Polish & Deployment**  
*Goal:* Add push notifications, optimize performance, and deploy to Expo Go for multi-user testing

---

## Epic 1: Foundation & Authentication

**Epic Goal:** Establish the project foundation with Expo + Firebase integration, implement user authentication, and create basic navigation structure. This epic delivers a working authentication flow and sets up the core infrastructure for messaging features.

### Story 1.1: Project Setup & Firebase Configuration

**As a** developer,  
**I want** to initialize an Expo React Native project with Firebase and TypeScript,  
**So that** I have a clean foundation for building the messaging app.

**Acceptance Criteria:**
- New Expo project created with TypeScript template
- Project structure organized: `app/`, `components/`, `hooks/`, `services/`, `utils/`, `types/`
- Firebase project created in Firebase Console
- Firebase SDK (@react-native-firebase or Firebase JS SDK) installed and configured
- Firebase config (API keys, project ID) stored in Expo environment variables (`.env` file, never in code)
- Firestore database created in Firebase Console (test mode initially)
- Firebase Authentication enabled (Email/Password provider)
- Git repository initialized with proper `.gitignore` (excludes `.env`, `node_modules`)
- README.md with setup instructions
- App runs successfully on iOS simulator with "Hello World" screen

**Technical Notes:**
- Use Expo SDK 49 or later
- Prefer Firebase JS SDK for Expo compatibility (avoid native Firebase packages unless required)
- Store Firebase config in `.env` file, load via `expo-constants`

---

### Story 1.2: User Registration Flow

**As a** new user,  
**I want** to create an account with a display name,  
**So that** I can use the messaging app.

**Acceptance Criteria:**
- Registration screen with fields: display name, email, password
- Display name validation (3-30 characters, required)
- Email validation (valid email format, required)
- Password validation (minimum 6 characters, required)
- "Sign Up" button creates user via Firebase Authentication
- Display name stored in Firestore `users` collection: `{ uid, displayName, createdAt }`
- Error handling: duplicate email, weak password, network errors
- Loading state during registration
- Success: Navigate to conversation list screen
- Failure: Display error message to user

**Technical Notes:**
- Use Firebase `createUserWithEmailAndPassword()` for authentication
- Store user profile in Firestore `users/{uid}` document
- Handle Firebase auth errors gracefully

---

### Story 1.3: User Login Flow

**As an** existing user,  
**I want** to sign in with my email and password,  
**So that** I can access my conversations.

**Acceptance Criteria:**
- Login screen with fields: email, password
- "Sign In" button authenticates user via Firebase Authentication
- Successful login: Navigate to conversation list screen
- Failed login: Display error message (invalid credentials, network error)
- Loading state during authentication
- "Don't have an account? Sign Up" link navigates to registration screen
- Firebase auth state persistence (user stays logged in across app restarts)

**Technical Notes:**
- Use Firebase `signInWithEmailAndPassword()`
- Use `onAuthStateChanged()` listener to detect auth state
- Redirect to conversation list if already authenticated on app launch

---

### Story 1.4: Basic Navigation Structure

**As a** user,  
**I want** to navigate between key screens,  
**So that** I can access different parts of the app.

**Acceptance Criteria:**
- Expo Router configured with file-based routing
- Root layout handles authentication state:
  - Unauthenticated users: Show auth screens (login/register)
  - Authenticated users: Show main app screens (conversation list, chat)
- Conversation List screen (placeholder UI: "Your conversations will appear here")
- Chat screen (placeholder UI: "Chat messages will appear here")
- Navigation from conversation list to chat screen works
- Back navigation from chat to conversation list works
- Logout button in conversation list (top-right) signs user out and returns to login screen

**Technical Notes:**
- Use Expo Router for navigation
- Implement auth context provider to manage authentication state
- Protect main screens with authentication check

---

### Story 1.5: Firestore Security Rules (Basic)

**As a** developer,  
**I want** to secure Firestore data access,  
**So that** users can only access their own conversations and messages.

**Acceptance Criteria:**
- Firestore Security Rules deployed to Firebase project
- Rules enforce authentication: All reads/writes require `request.auth != null`
- Users collection rules:
  - Users can read any user document (for displaying display names)
  - Users can only update their own user document
- Conversations collection rules (prepared for later epics):
  - Users can only read conversations where they are a participant
  - Users can create new conversations
  - Users can only update conversations where they are a participant
- Messages subcollection rules (prepared for later epics):
  - Users can only read messages from conversations they participate in
  - Users can only create messages in conversations they participate in
- Rules tested via Firebase Console or test suite

**Technical Notes:**
- Use Firebase Security Rules language
- Rules example: `allow read: if request.auth.uid in resource.data.participants;`
- Test rules in Firebase Console Simulator

---

## Epic 2: One-on-One Messaging Core

**Epic Goal:** Implement the core messaging infrastructure with real-time message delivery, optimistic UI updates, local persistence via Expo SQLite, and offline resilience for one-on-one conversations. This epic proves the messaging architecture is solid.

### Story 2.1: Local Message Database (SQLite) Setup

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

### Story 2.2: Conversation List Screen with Firestore Sync

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

### Story 2.3: Start New Conversation (User Selection)

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

### Story 2.4: Chat Screen with Message Display

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

### Story 2.5: Send Message with Optimistic Update

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

### Story 2.6: Real-Time Message Receiving

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

### Story 2.7: Message Timestamps

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

### Story 2.8: Online/Offline Status Indicators

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

### Story 2.9: Offline Message Queueing

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

### Story 2.10: Message Read Receipts

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

### Story 2.11: Connection Status Indicator

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

## Epic 3: Group Chat

**Epic Goal:** Extend the messaging infrastructure to support group conversations with 3+ participants. Users can create group chats, send messages to multiple people, and see group message activity.

### Story 3.1: Create Group Conversation

**As a** user,  
**I want** to create a group conversation with multiple people,  
**So that** I can message several people at once.

**Acceptance Criteria:**
- "New Group" button in conversation list (separate from "New Conversation")
- Tapping button navigates to "Create Group" screen
- Create Group screen:
  - Group name input field (optional, defaults to "Group Chat")
  - User selection list (multi-select, checkboxes)
  - Search bar to filter users
  - Selected users shown at top with remove option
  - "Create Group" button (enabled when 2+ users selected)
- Tapping "Create Group":
  - Creates new group conversation in Firestore
  - Adds current user + selected users to `participants` array
  - Navigates to group chat screen
- Group appears in conversation list for all participants
- Loading state during group creation

**Technical Notes:**
- Firestore document structure for groups same as one-on-one:
  ```
  {
    participants: [uid1, uid2, uid3, ...],
    isGroup: true,
    groupName: "Group name" (optional),
    createdAt: serverTimestamp(),
    createdBy: currentUserId,
    lastMessage: null
  }
  ```
- Minimum 3 participants (current user + 2 others)
- No maximum for MVP (can add limit post-MVP)

---

### Story 3.2: Group Chat Screen

**As a** user,  
**I want** to view and send messages in a group conversation,  
**So that** I can communicate with multiple people.

**Acceptance Criteria:**
- Group chat screen displays conversation header:
  - Group name (or "Group Chat" if no name)
  - Participant count ("3 members")
- Message list displays all messages in group (ordered by timestamp)
- Each message shows:
  - Sender's display name (above message)
  - Message text
  - Timestamp
- My messages: Right-aligned, no sender name shown
- Other's messages: Left-aligned, sender name shown
- Sending messages works same as one-on-one (optimistic update)
- Real-time sync: Messages from other participants appear instantly
- All messaging features work: timestamps, read receipts, offline queueing

**Technical Notes:**
- Reuse existing chat screen component with group-specific logic
- Query messages from same subcollection structure
- Display sender's display name for group messages

---

### Story 3.3: Group Read Receipts

**As a** user,  
**I want** to see who has read my message in a group,  
**So that** I know which group members saw my message.

**Acceptance Criteria:**
- My messages in group chat show read status:
  - "Delivered" if at least one person received it
  - "Read by N" where N is count of members who read it (excluding sender)
- Tapping "Read by N" shows list of members who read the message (optional detail view)
- Read receipts update in real-time as members read messages
- Read status persists across app restarts

**Technical Notes:**
- Message document `readBy` array contains UIDs of readers
- Calculate read count: `readBy.length` (excluding sender)
- Display as: "Read by 2" or "Delivered" if none read yet

---

### Story 3.4: Group Conversation List Display

**As a** user,  
**I want** to see group conversations in my conversation list,  
**So that** I can access them like one-on-one chats.

**Acceptance Criteria:**
- Conversation list displays both one-on-one and group conversations
- Group conversations show:
  - Group name (or "Group Chat")
  - Last message preview with sender's name: "Alice: Hey everyone!"
  - Timestamp of last message
  - Group icon indicator (e.g., multi-person icon)
- Groups sorted by most recent message (mixed with one-on-one chats)
- Tapping group navigates to group chat screen
- Real-time updates for new group messages

**Technical Notes:**
- Query all conversations where current user is in `participants` array
- Distinguish groups by `isGroup: true` flag or `participants.length > 2`
- Fetch display names for all participants to show group preview

---

## Epic 4: Polish & Deployment

**Epic Goal:** Add push notifications, optimize app performance, improve user experience, and deploy to Expo Go for multi-user testing. This epic makes the app production-ready for MVP validation.

### Story 4.1: Foreground Push Notifications

**As a** user,  
**I want** to receive notifications for new messages when the app is open,  
**So that** I don't miss important messages.

**Acceptance Criteria:**
- Expo Notifications installed and configured
- When new message received while app is in foreground:
  - Local notification displays at top of screen
  - Notification shows: Sender name, message preview (truncated)
  - Tapping notification navigates to conversation (if not already there)
- Notifications only for messages from other users (not my own messages)
- Notifications work for both one-on-one and group messages
- User can dismiss notification

**Technical Notes:**
- Use Expo Notifications API
- Trigger local notification on Firestore real-time listener detecting new message
- Include conversation ID in notification data for navigation
- Request notification permissions on app launch

---

### Story 4.2: App Launch Performance Optimization

**As a** user,  
**I want** the app to launch quickly,  
**So that** I can start messaging without waiting.

**Acceptance Criteria:**
- App launches in under 5 seconds from tap to conversation list screen
- Splash screen displays during initial load
- Conversation list renders from local SQLite first (fast), then syncs from Firestore
- No blocking operations during app startup
- Loading indicators shown during async operations

**Technical Notes:**
- Optimize Firestore queries (indexes)
- Lazy load unnecessary resources
- Use React lazy loading for heavy components
- Measure launch time with performance profiling

---

### Story 4.3: Message List Performance Optimization

**As a** user,  
**I want** smooth scrolling in conversations with many messages,  
**So that** the app doesn't lag when viewing message history.

**Acceptance Criteria:**
- Smooth 60fps scrolling for conversations with 200+ messages
- Messages render efficiently (no lag or stuttering)
- Pagination: Load 50 messages initially, load more on scroll to top
- FlatList optimizations applied (virtualization)
- No performance degradation with large message count

**Technical Notes:**
- Use FlatList with `initialNumToRender={50}`, `maxToRenderPerBatch={10}`
- Implement `getItemLayout` for consistent item heights
- Pagination: Query last 50 messages from SQLite, load more on scroll
- Avoid re-renders (memoize components)

---

### Story 4.4: Keyboard Handling

**As a** user,  
**I want** the keyboard to behave smoothly when typing messages,  
**So that** I have a good messaging experience.

**Acceptance Criteria:**
- Keyboard opens smoothly when tapping message input
- Chat scrolls up when keyboard opens (message input stays visible)
- Keyboard closes when sending message or tapping outside input
- No lag or freezing when keyboard animates
- Keyboard doesn't cover message input

**Technical Notes:**
- Use `KeyboardAvoidingView` for iOS
- Handle Android keyboard separately (use `android:windowSoftInputMode`)
- Test on various device sizes

---

### Story 4.5: Error Handling & Retry Logic

**As a** user,  
**I want** clear feedback when something goes wrong,  
**So that** I understand issues and can retry.

**Acceptance Criteria:**
- Failed messages show "failed" status with retry button
- Tapping retry button resends message
- Network errors show user-friendly messages: "Connection lost. Trying to reconnect..."
- Firestore errors handled gracefully (e.g., permission denied, quota exceeded)
- No silent failures (user always knows what happened)
- Error messages auto-dismiss after successful retry or timeout

**Technical Notes:**
- Implement retry logic with exponential backoff
- Display toast notifications for transient errors
- Log errors for debugging (console.error)

---

### Story 4.6: Deployment to Expo Go

**As a** developer,  
**I want** to deploy the app to Expo Go,  
**So that** multiple team members can test it on real devices.

**Acceptance Criteria:**
- App published to Expo Go using `expo publish` or EAS Update
- QR code generated for app access
- Multiple users can install app on iOS devices via Expo Go
- App runs on Expo Go without native build
- Firebase configuration works in production mode
- All MVP features functional on Expo Go

**Technical Notes:**
- Use `expo publish` or `eas update`
- Test on iOS devices with Expo Go app
- Ensure Firebase config includes production credentials
- Share QR code with testing team

---

### Story 4.7: Multi-User Testing Validation

**As a** QA tester,  
**I want** to validate that multiple users can use the app simultaneously,  
**So that** we ensure the infrastructure is reliable.

**Acceptance Criteria:**
- 3+ team members can test simultaneously without issues
- Test scenarios:
  1. Two users send messages back and forth in real-time (< 300ms latency)
  2. User A sends message while User B is offline; User B comes online and receives message
  3. App force-quit and reopened: Full message history intact
  4. Group chat with 3+ users: All messages delivered to all participants
  5. High-frequency messaging (rapid send): No message loss or duplication
- All scenarios pass without crashes or sync issues
- Performance remains smooth with multiple active users

**Technical Notes:**
- Create test plan document
- Conduct testing session with team
- Log any issues discovered
- Validate against MVP success criteria

---

## Risks and Mitigations

### Risk 1: Firestore Costs Exceed Free Tier

**Impact:** High  
**Likelihood:** Medium  
**Mitigation:**
- Monitor Firestore usage in Firebase Console dashboard
- Implement read/write optimizations (pagination, debouncing)
- Set up Firebase usage alerts
- If approaching limits, optimize queries or consider caching strategies

### Risk 2: Offline Sync Conflicts

**Impact:** Medium  
**Likelihood:** Low  
**Mitigation:**
- Firestore's built-in conflict resolution handles most cases (last-write-wins)
- Test edge cases: Two users offline, edit same conversation, both come online
- Message IDs generated client-side prevent duplicates
- Implement conflict detection and user notification if needed

### Risk 3: Expo Go Limitations

**Impact:** Medium  
**Likelihood:** Low  
**Mitigation:**
- Design around Expo Go constraints (no custom native modules)
- Fallback to iOS simulator if Expo Go issues arise
- Document any Expo Go-specific bugs
- Consider native build post-MVP if limitations are blocking

### Risk 4: Performance Degradation with Large Message History

**Impact:** Medium  
**Likelihood:** Medium  
**Mitigation:**
- Implement pagination from day one (load 50 messages at a time)
- Test with 1000+ messages to validate performance
- Monitor SQLite query performance
- Consider archiving old messages post-MVP

### Risk 5: Push Notification Reliability

**Impact:** Low (MVP only requires foreground)  
**Likelihood:** Medium  
**Mitigation:**
- Expo Notifications tested extensively for foreground notifications
- Document any delivery quirks
- Background notifications deferred to post-MVP
- Fallback: Real-time listeners keep messages in sync when app open

---

## Success Metrics (MVP Gate)

The MVP must meet these criteria to pass:

### Functional Success Criteria

✅ **Multiple simultaneous users:** 3+ team members can send/receive messages concurrently  
✅ **Message delivery latency:** < 300ms (P95) when both users online  
✅ **Optimistic updates:** Messages appear instantly in sender's UI  
✅ **Message persistence:** Full history survives force-quit and reopen  
✅ **Offline resilience:** Messages sent offline deliver when reconnected  
✅ **Read receipts:** Mostly working (> 95% accuracy)  
✅ **Group chat:** 3+ users can participate in group conversation  
✅ **Foreground push notifications:** Notifications work when app is open  
✅ **Connection status:** Clear online/offline/reconnecting indicators  

### Performance Success Criteria

✅ **App launch:** < 5 seconds from tap to conversation list  
✅ **Scrolling performance:** Smooth 60fps for 200+ messages  
✅ **Reconnection time:** 2-3 seconds after offline period  
✅ **Crash-free sessions:** > 99.5%  

### Code Quality Success Criteria

✅ **Clean organization:** Well-structured folders (screens, components, services, etc.)  
✅ **API keys secured:** Never exposed in mobile app code  
✅ **Authentication:** Functional and secure (Firebase Auth)  
✅ **Local storage:** SQLite working correctly  
✅ **Sync logic:** Clear, maintainable code  

### Deployment Success Criteria

✅ **Expo Go:** App deployed and accessible via QR code  
✅ **Multi-device:** Works on multiple iOS devices simultaneously  
✅ **Simulator:** Works on iOS simulator as fallback  

---

## Next Steps & Architect Handoff

This PRD is now ready for the **Architect** to review and create the technical architecture document.

**Architect Focus Areas:**
1. **Data models:** Firestore document structures and SQLite schema
2. **Real-time sync:** Firestore listener patterns and sync logic
3. **Offline handling:** Message queueing and conflict resolution strategy
4. **Performance optimization:** FlatList virtualization, pagination, query optimization
5. **Security:** Firebase Security Rules, API key management
6. **Project structure:** Folder organization, code patterns, state management

**Key Technical Decisions for Architect:**
- State management approach (React Context + Hooks vs. Redux/Zustand)
- Firebase SDK choice (JS SDK vs. native packages)
- Offline persistence strategy (Firestore offline + SQLite dual approach)
- Presence system implementation (Firestore vs. Realtime Database)
- Message pagination strategy
- Push notification integration details

---

**Document Status:** Ready for Architecture Review  
**Version:** 1.0  
**Last Updated:** October 22, 2025  
**Author:** John (Product Manager)
