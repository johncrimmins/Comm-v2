# Frontend Architecture

## Project Folder Structure

```
comm/
├── app/                           # Expo Router file-based routing
│   ├── _layout.tsx               # Root layout with auth check
│   ├── (auth)/                   # Auth flow group
│   │   ├── _layout.tsx          # Auth layout
│   │   └── index.tsx            # Single auth screen (sign in/sign up toggle)
│   ├── (tabs)/                   # Main app tabs group
│   │   ├── _layout.tsx          # Tab layout
│   │   ├── index.tsx            # Conversations list (home)
│   │   └── settings.tsx         # Settings screen
│   ├── chat/[id].tsx            # Dynamic chat screen
│   ├── new-conversation.tsx     # User selection screen
│   └── new-group.tsx            # Group creation screen
│
├── components/                    # Reusable components
│   ├── ui/                       # Basic UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Avatar.tsx
│   │   └── LoadingSpinner.tsx
│   ├── chat/                     # Chat-specific components
│   │   ├── Message.tsx          # Single message component
│   │   ├── MessageList.tsx      # Message list with FlatList
│   │   ├── MessageInput.tsx     # Message composition
│   │   └── TypingIndicator.tsx  # (Post-MVP)
│   ├── conversation/             # Conversation components
│   │   ├── ConversationItem.tsx # Conversation list item
│   │   └── ConversationList.tsx # Conversation list
│   └── ConnectionBanner.tsx      # Offline/reconnecting banner
│
├── services/                     # Business logic services
│   ├── auth/
│   │   └── authService.ts       # Authentication service
│   ├── messaging/
│   │   └── messagingService.ts  # Messaging operations
│   ├── sync/
│   │   └── syncEngine.ts        # Sync between SQLite and Firestore
│   ├── sqlite/
│   │   └── sqliteService.ts     # Local database operations
│   ├── notifications/
│   │   └── notificationService.ts # Push notification handling
│   ├── presence/
│   │   └── presenceService.ts   # Online/offline status
│   └── firebase/
│       └── firebaseConfig.ts    # Firebase initialization
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts               # Auth state and operations
│   ├── useConversations.ts      # Conversation list with real-time updates
│   ├── useMessages.ts           # Messages for specific conversation
│   ├── usePresence.ts           # User presence status
│   ├── useNetworkStatus.ts      # Network online/offline detection
│   └── useKeyboard.ts           # Keyboard state management
│
├── store/                        # Global state management
│   ├── AuthContext.tsx          # Auth state provider
│   ├── MessagingContext.tsx     # Messaging state provider
│   └── NetworkContext.tsx       # Network status provider
│
├── types/                        # TypeScript definitions
│   ├── models.ts                # Data model interfaces (User, Message, Conversation)
│   ├── services.ts              # Service interface types
│   └── navigation.ts            # Navigation type definitions
│
├── utils/                        # Utility functions
│   ├── dateFormatters.ts        # Date/time formatting (using date-fns)
│   ├── validation.ts            # Input validation helpers
│   ├── uuidGenerator.ts         # UUID generation for message IDs
│   └── errorHandlers.ts         # Error handling utilities
│
├── constants/                    # App constants
│   ├── Colors.ts                # Color palette
│   ├── Config.ts                # App configuration
│   └── Layout.ts                # Layout constants (spacing, etc.)
│
├── assets/                       # Static assets
│   ├── images/
│   └── fonts/
│
├── docs/                         # Project documentation
│   ├── project-brief.md
│   ├── prd.md
│   └── architecture.md (this file)
│
├── .env                          # Environment variables (Firebase config)
├── .gitignore
├── app.json                      # Expo configuration
├── package.json
├── tsconfig.json
└── README.md
```

---
