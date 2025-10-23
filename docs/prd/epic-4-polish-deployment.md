# Epic 4: Polish & Deployment

**Epic Goal:** Add push notifications, optimize app performance, improve user experience, and deploy to Expo Go for multi-user testing. This epic makes the app production-ready for MVP validation.

## Story 4.1: Foreground Push Notifications

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

## Story 4.2: App Launch Performance Optimization

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

## Story 4.3: Message List Performance Optimization

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

## Story 4.4: Keyboard Handling

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

## Story 4.5: Error Handling & Retry Logic

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

## Story 4.6: Deployment to Expo Go

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

## Story 4.7: Multi-User Testing Validation

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
