# Tech Stack

## Technology Stack Table

| Category | Technology | Version | Status | Purpose | Rationale |
|----------|-----------|---------|--------|---------|-----------|
| **Frontend Language** | TypeScript | ~5.9.2 | ✅ Installed | Type-safe mobile app development | Type safety critical for messaging logic; prevents runtime errors in sync and offline scenarios |
| **Frontend Framework** | React | 19.1.0 | ✅ Installed | UI library | React 19 with latest features and performance improvements |
| **Frontend Framework** | React Native | 0.81.5 | ✅ Installed | Cross-platform mobile development | Latest stable RN version compatible with Expo 54 |
| **Mobile SDK** | Expo SDK | ~54.0.19 | ✅ Installed | Managed React Native workflow | Latest Expo SDK with improved stability and features |
| **Navigation** | Expo Router | ^6.0.13 | ✅ Installed | File-based routing for mobile | Latest router with React Navigation 6 integration and deep linking |
| **Environment Config** | expo-constants | ~18.0.10 | ✅ Installed | Access to app.json and env variables | Required for Firebase config access in Expo apps |
| **Status Bar** | expo-status-bar | ~3.0.8 | ✅ Installed | Status bar styling | Expo-managed status bar for cross-platform consistency |
| **Web Support** | react-dom | 19.1.0 | ✅ Installed | React web renderer | Enables web builds via Expo |
| **Web Support** | react-native-web | ^0.21.0 | ✅ Installed | RN components for web | Allows running RN app in browsers |
| **UI Component Library** | React Native Elements | 4.x | 📦 Deferred | Pre-built mobile UI components | To be added when building UI components (Story 1.4+) |
| **State Management** | React Context + Hooks | Built-in | ✅ Available | Global state management | Simple, sufficient for MVP scope; no over-engineering with Redux/Zustand |
| **Backend Platform** | Firebase | ^12.4.0 | ✅ Installed | Backend-as-a-Service | Latest Firebase SDK with modular architecture and improved tree-shaking |
| **Backend Database** | Firebase Firestore | 12.x (via firebase) | ✅ Available | Real-time NoSQL cloud database | Real-time listeners for instant sync; offline persistence; scales automatically |
| **Local Database** | Expo SQLite | Latest (expo-sqlite) | 📦 Deferred | Local relational database | To be added when implementing offline storage (Story 2.x) |
| **Authentication** | Firebase Authentication | 12.x (via firebase) | ✅ Available | User account management | Drop-in auth solution; secure; integrates with Firestore security rules |
| **Push Notifications** | Expo Notifications | Latest | 📦 Deferred | Foreground push notifications | To be added when implementing notifications (Story 3.x) |
| **Frontend Testing** | Jest + React Native Testing Library | Latest | 📦 Deferred | Unit and component testing | To be added post-MVP per testing strategy |
| **E2E Testing** | Manual (MVP) | N/A | ✅ Active | Manual testing on real devices | E2E automation deferred post-MVP; focus on manual multi-user testing |
| **Build Tool** | Expo CLI | Latest | ✅ Installed | Expo project management | Required for Expo managed workflow, no EAS for MVP |
| **Bundler** | Metro | Latest | ✅ Installed | React Native bundler | Standard RN bundler; optimized for mobile |
| **CI/CD** | None (MVP) | N/A | ⏸️ Post-MVP | Manual testing and deployment | CI/CD and EAS deferred post-MVP |
| **Monitoring** | Firebase Crashlytics (future) | Latest | 📦 Post-MVP | Crash reporting | Post-MVP; manual testing sufficient for MVP |
| **Logging** | Console + Firebase (future) | N/A | ⏸️ Post-MVP | Development logging | Console logging for MVP; structured logging post-MVP |
| **Styling** | StyleSheet (React Native) | Built-in | ✅ Available | Component styling | Native RN styling; simple and performant |
| **Date/Time** | date-fns | 2.x | 📦 Deferred | Date formatting and manipulation | To be added when implementing message timestamps (Story 2.x) |
| **Network Detection** | @react-native-community/netinfo | 11.x | 📦 Deferred | Network status monitoring | To be added when implementing sync logic (Story 2.x) |
| **Unique IDs** | uuid | 9.x | 📦 Deferred | Generate unique message IDs | To be added when implementing messaging (Story 2.x) |

## Status Legend
- ✅ **Installed**: Currently installed and available
- ✅ **Available**: Available via installed package (e.g., Firestore via firebase package)
- ✅ **Active**: Currently in use
- 📦 **Deferred**: Planned but not yet needed; will be installed in future stories
- ⏸️ **Post-MVP**: Planned for after MVP completion

## Version Notes

**Major Version Updates from Original Plan:**
- **Expo SDK**: Originally planned 50.x, installed ~54.0.19 (latest stable)
- **React Native**: Originally planned 0.73.x, installed 0.81.5 (required by Expo 54)
- **Firebase SDK**: Originally planned 9.x, installed ^12.4.0 (latest with better TypeScript support)
- **Expo Router**: Originally planned 3.x, installed ^6.0.13 (latest with better stability)

These version updates were necessary due to:
1. Dependency compatibility requirements between Expo SDK 54 and React Native 0.81
2. Latest Firebase SDK (v12) provides better TypeScript definitions and smaller bundle size
3. Expo Router 6 required by Expo SDK 54 and provides improved routing features

See [Dependency Deviations](./dependency-deviations.md) for detailed rationale and compatibility notes.

---
