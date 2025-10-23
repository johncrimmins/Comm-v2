# Epic 1: Foundation & Authentication

**Epic Goal:** Establish the project foundation with Expo + Firebase integration, implement user authentication, and create basic navigation structure. This epic delivers a working authentication flow and sets up the core infrastructure for messaging features.

## Story 1.1: Project Setup & Firebase Configuration

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

## Story 1.2: User Registration Flow

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

## Story 1.3: User Login Flow

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

## Story 1.4: Basic Navigation Structure

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

## Story 1.5: Firestore Security Rules (Basic)

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
