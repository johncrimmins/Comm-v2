# Technical Assumptions

## Repository Structure

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

## Service Architecture

**Client-side focused with Firebase Backend-as-a-Service (BaaS)**

- **Frontend:** React Native with Expo SDK (no custom native code)
- **Real-time sync:** Firebase Firestore with real-time listeners
- **Authentication:** Firebase Authentication
- **Push notifications:** Expo Notifications (foreground only for MVP)
- **Local persistence:** Expo SQLite
- **No custom backend servers** - All logic client-side or Firebase Security Rules

## Testing Requirements

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

## Additional Technical Assumptions and Requests

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
