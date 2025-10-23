# Comm - Real-Time Messaging App

A cross-platform messaging application built with React Native, Expo, and Firebase.

## Features

- One-on-one messaging
- Group chat
- Real-time message synchronization
- Offline support with local SQLite storage
- Firebase Authentication

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or later)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g expo-cli`)
- **iOS Simulator** (Mac only) or **Android Emulator**
- **Firebase Project** (see Firebase Setup below)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd comm
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project named "Comm"
3. Enable **Firestore Database** in test mode
4. Enable **Authentication** with Email/Password provider
5. Go to Project Settings > General > Your apps
6. Add a Web app and copy the Firebase configuration

### 4. Configure Environment Variables

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Firebase credentials:
   ```
   EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

### 5. Run the App

```bash
npx expo start
```

Then:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your phone

## Project Structure

```
comm/
├── app/                    # Expo Router screens
├── components/             # Reusable UI components
├── hooks/                  # Custom React hooks
├── services/              # Business logic
│   ├── auth/              # Authentication service
│   ├── firebase/          # Firebase configuration
│   ├── messaging/         # Messaging operations
│   ├── sync/              # Sync engine
│   ├── sqlite/            # Local database
│   ├── notifications/     # Push notifications
│   └── presence/          # User presence
├── store/                 # Global state management
├── types/                 # TypeScript definitions
├── utils/                 # Utility functions
├── constants/             # App constants
└── assets/                # Images and fonts
```

## Tech Stack

- **Frontend**: React Native 0.73.x with TypeScript 5.x
- **Framework**: Expo SDK 50.x
- **Navigation**: Expo Router 3.x
- **Backend**: Firebase (Firestore + Authentication)
- **Local Storage**: Expo SQLite
- **State Management**: React Context + Hooks

## Development

### Testing

Manual testing on device/simulator is the primary testing method for MVP.

### Hot Reload

The app supports hot reload during development. Changes to code will automatically refresh the app.

## Firebase Configuration Notes

- This app uses **Firebase JS SDK 9.x** for Expo compatibility
- Environment variables must use the `EXPO_PUBLIC_` prefix
- The `.env` file is gitignored - never commit Firebase credentials
- Firestore is initially in test mode; security rules will be added in future stories

## License

MIT
