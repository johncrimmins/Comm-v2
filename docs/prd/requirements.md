# Requirements

## Functional Requirements

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

## Non-Functional Requirements

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
