# API Specification

**API Style:** Firebase SDK (JavaScript Client Library) - No custom REST API

Since we're using Firebase as Backend-as-a-Service, there is no custom REST API. All backend interactions happen through the Firebase JavaScript SDK:

## Firebase SDK Operations

**Authentication:**
```typescript
// Sign up
createUserWithEmailAndPassword(auth, email, password);

// Sign in
signInWithEmailAndPassword(auth, email, password);

// Sign out
signOut(auth);

// Auth state listener
onAuthStateChanged(auth, (user) => { ... });
```

**Firestore Operations:**
```typescript
// Create user profile
setDoc(doc(firestore, 'users', uid), userData);

// Create conversation
addDoc(collection(firestore, 'conversations'), conversationData);

// Send message
addDoc(collection(firestore, `conversations/${conversationId}/messages`), messageData);

// Real-time listeners
onSnapshot(collection(firestore, 'conversations'), (snapshot) => { ... });
onSnapshot(collection(firestore, `conversations/${conversationId}/messages`), (snapshot) => { ... });

// Query conversations
query(collection(firestore, 'conversations'), 
  where('participants', 'array-contains', currentUserUid),
  orderBy('lastMessageTimestamp', 'desc')
);
```

**Local SQLite Operations:**
```typescript
// Service layer abstracts SQL queries
sqliteService.saveMessage(message);
sqliteService.getMessages(conversationId);
sqliteService.updateMessageStatus(messageId, status);
```

All API access is authenticated via Firebase Auth tokens (handled automatically by Firebase SDK).

---
