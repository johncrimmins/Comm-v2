# Performance Optimization Strategies

## 1. FlatList Virtualization

```typescript
<FlatList
  data={messages}
  renderItem={({ item }) => <Message message={item} />}
  keyExtractor={(item) => item.id}
  initialNumToRender={50}        // Load 50 messages initially
  maxToRenderPerBatch={10}       // Render 10 at a time on scroll
  windowSize={21}                // Keep 21 screens worth in memory
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,         // Fixed height for performance
    offset: ITEM_HEIGHT * index,
    index,
  })}
  inverted                       // Chat-style reverse scrolling
  onEndReached={loadMoreMessages} // Pagination
  onEndReachedThreshold={0.5}
/>
```

## 2. Message Pagination

- Initial load: 50 most recent messages
- Load more: 25 messages at a time on scroll up
- SQLite query: `LIMIT 50 OFFSET 0` → `LIMIT 25 OFFSET 50`, etc.
- Stop loading when no more messages available

## 3. Firestore Query Optimization

```typescript
// Efficient conversation query with composite index
const conversationsQuery = query(
  collection(firestore, 'conversations'),
  where('participants', 'array-contains', currentUserUid),
  orderBy('lastMessageTimestamp', 'desc'),
  limit(20) // Only fetch most recent 20 conversations
);

// Efficient message query
const messagesQuery = query(
  collection(firestore, `conversations/${conversationId}/messages`),
  orderBy('timestamp', 'desc'),
  limit(50)
);
```

## 4. Component Memoization

```typescript
// Prevent unnecessary re-renders
const Message = React.memo(({ message }) => {
  // Component implementation
}, (prevProps, nextProps) => {
  return prevProps.message.id === nextProps.message.id &&
         prevProps.message.status === nextProps.message.status;
});
```

## 5. Debouncing Presence Updates

```typescript
// Update presence every 30 seconds (not on every action)
const updatePresence = debounce(() => {
  presenceService.updatePresence('online');
}, 30000);
```

## 6. SQLite Indexes

- Index on `(conversationId, timestamp)` for message queries
- Index on `lastMessageTimestamp` for conversation sorting
- Index on `(localOnly, status)` for queued message queries

## 7. Image Loading (Post-MVP)

- Lazy load images with placeholder
- Image compression before upload
- CDN caching via Firebase Storage

---
