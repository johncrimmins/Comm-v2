# Security Implementation

## Firebase Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isUser(uid) {
      return isAuthenticated() && request.auth.uid == uid;
    }
    
    // Users collection
    match /users/{uid} {
      // Anyone can read user profiles (for display names)
      allow read: if isAuthenticated();
      
      // Users can only create/update their own profile
      allow create, update: if isUser(uid);
      
      // No one can delete users
      allow delete: if false;
    }
    
    // Conversations collection
    match /conversations/{conversationId} {
      // Users can read conversations they participate in
      allow read: if isAuthenticated() && 
                     request.auth.uid in resource.data.participants;
      
      // Users can create new conversations
      allow create: if isAuthenticated() &&
                       request.auth.uid in request.resource.data.participants;
      
      // Users can update conversations they participate in
      allow update: if isAuthenticated() &&
                       request.auth.uid in resource.data.participants;
      
      // No one can delete conversations (MVP - can add later)
      allow delete: if false;
      
      // Messages subcollection
      match /messages/{messageId} {
        // Users can read messages in conversations they participate in
        allow read: if isAuthenticated() &&
                       request.auth.uid in get(/databases/$(database)/documents/conversations/$(conversationId)).data.participants;
        
        // Users can create messages in conversations they participate in
        allow create: if isAuthenticated() &&
                         request.auth.uid in get(/databases/$(database)/documents/conversations/$(conversationId)).data.participants &&
                         request.auth.uid == request.resource.data.senderId;
        
        // Users can update messages (for read receipts)
        allow update: if isAuthenticated() &&
                         request.auth.uid in get(/databases/$(database)/documents/conversations/$(conversationId)).data.participants;
        
        // No one can delete messages (MVP)
        allow delete: if false;
      }
    }
  }
}
```

## Client-Side Security

- **API Keys in Environment Variables:** Firebase config stored in `.env`, loaded via `expo-constants`, never committed to git
- **Auth Token Management:** Firebase SDK handles token refresh automatically
- **Input Validation:** All user inputs sanitized before storage
- **SQL Injection Prevention:** Using parameterized queries in SQLite
- **No Sensitive Data in SQLite:** Passwords never stored locally (handled by Firebase Auth)

---
