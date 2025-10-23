# Tech Stack

## Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|----------|-----------|---------|---------|-----------|
| **Frontend Language** | TypeScript | 5.x | Type-safe mobile app development | Type safety critical for messaging logic; prevents runtime errors in sync and offline scenarios |
| **Frontend Framework** | React Native | 0.73.x | Cross-platform mobile development | Expo requires specific RN version; proven platform for production messaging apps |
| **Mobile SDK** | Expo SDK | 50.x | Managed React Native workflow | Simplifies native module integration (SQLite, Notifications); no custom native code needed |
| **Navigation** | Expo Router | 3.x | File-based routing for mobile | Modern routing approach; deep linking support for notifications |
| **UI Component Library** | React Native Elements | 4.x | Pre-built mobile UI components | Speeds up UI development with consistent, accessible components |
| **State Management** | React Context + Hooks | Built-in | Global state management | Simple, sufficient for MVP scope; no over-engineering with Redux/Zustand |
| **Backend Platform** | Firebase | Latest | Backend-as-a-Service | No custom backend needed; free tier sufficient; real-time capabilities built-in |
| **Backend Database** | Firebase Firestore | Latest | Real-time NoSQL cloud database | Real-time listeners for instant sync; offline persistence; scales automatically |
| **Local Database** | Expo SQLite | Latest (expo-sqlite) | Local relational database | Fast local queries; reliable offline storage; battle-tested in production apps |
| **Authentication** | Firebase Authentication | Latest | User account management | Drop-in auth solution; secure; integrates with Firestore security rules |
| **Push Notifications** | Expo Notifications | Latest | Foreground push notifications | Expo-managed FCM integration; no custom native code |
| **API Style** | Firebase SDK (JavaScript) | 9.x | Firebase client library | Official SDK; tree-shakeable; TypeScript support |
| **Frontend Testing** | Jest + React Native Testing Library | Latest | Unit and component testing | Standard React Native testing stack |
| **E2E Testing** | Manual (MVP) | N/A | Manual testing on real devices | E2E automation deferred post-MVP; focus on manual multi-user testing |
| **Build Tool** | Expo CLI | Latest | Expo project management | Required for Expo managed workflow, no EAS for MVP |
| **Bundler** | Metro | Latest | React Native bundler | Standard RN bundler; optimized for mobile |
| **CI/CD** | None (MVP) | N/A | Manual testing and deployment | CI/CD and EAS deferred post-MVP |
| **Monitoring** | Firebase Crashlytics (future) | Latest | Crash reporting | Post-MVP; manual testing sufficient for MVP |
| **Logging** | Console + Firebase (future) | N/A | Development logging | Console logging for MVP; structured logging post-MVP |
| **Styling** | StyleSheet (React Native) | Built-in | Component styling | Native RN styling; simple and performant |
| **Date/Time** | date-fns | 2.x | Date formatting and manipulation | Lightweight; tree-shakeable; better than moment.js |
| **Network Detection** | @react-native-community/netinfo | 11.x | Network status monitoring | Detects online/offline state for sync logic |
| **Unique IDs** | uuid | 9.x | Generate unique message IDs | Client-side ID generation for optimistic updates |

---
