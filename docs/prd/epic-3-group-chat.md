# Epic 3: Group Chat

**Epic Goal:** Extend the messaging infrastructure to support group conversations with 3+ participants. Users can create group chats, send messages to multiple people, and see group message activity.

## Story 3.1: Create Group Conversation

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

## Story 3.2: Group Chat Screen

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

## Story 3.3: Group Read Receipts

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

## Story 3.4: Group Conversation List Display

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
