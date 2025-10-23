# State Management Strategy

## Approach: React Context + Hooks (No Redux/Zustand for MVP)

**Rationale:**
- MVP scope doesn't warrant heavy state management library
- React Context sufficient for auth, network status, and messaging state
- Reduces bundle size and complexity
- Hooks provide clean, functional API for components

## Context Providers

**AuthContext:**
```typescript
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
}
```

**NetworkContext:**
```typescript
interface NetworkContextType {
  isOnline: boolean;
  isReconnecting: boolean;
}
```

**MessagingContext (optional, may be hook-only):**
```typescript
interface MessagingContextType {
  conversations: Conversation[];
  unreadCount: number;
  refreshConversations: () => Promise<void>;
}
```

Components access state via hooks:
```typescript
const { user, signOut } = useAuth();
const { isOnline } = useNetworkStatus();
const { conversations, messages } = useMessages(conversationId);
```

---
