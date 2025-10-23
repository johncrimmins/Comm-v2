# Testing Strategy

## Manual Testing (MVP Priority)

**Multi-User Scenarios:**
1. Two users: Send messages back and forth, measure latency
2. Offline test: User A offline, User B sends messages, User A reconnects
3. Force-quit test: Force quit app, reopen, verify message history intact
4. Group chat test: 3+ users in group, all receive messages
5. Performance test: Load conversation with 200+ messages, verify smooth scrolling

**Testing Checklist:**
- [ ] Message delivery < 300ms when online
- [ ] Optimistic updates feel instant
- [ ] Messages persist across app restarts
- [ ] Offline messages send on reconnect
- [ ] Read receipts update correctly
- [ ] Group messages delivered to all participants
- [ ] Foreground notifications appear
- [ ] Connection status indicator accurate
- [ ] App launches in < 5 seconds
- [ ] No crashes during testing session

## Unit Testing (Recommended)

**Priority areas:**
- `utils/` folder: Date formatters, validators, error handlers
- `services/sqlite/` folder: Database operations
- Message status logic
- Sync conflict resolution

**Example test:**
```typescript
describe('dateFormatters', () => {
  it('formats recent timestamp as "Just now"', () => {
    const now = Date.now();
    expect(formatTimestamp(now)).toBe('Just now');
  });
  
  it('formats timestamp from 5 minutes ago as "5m ago"', () => {
    const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
    expect(formatTimestamp(fiveMinutesAgo)).toBe('5m ago');
  });
});
```

## Integration Testing (Post-MVP)

Deferred until post-MVP. Focus on manual testing for MVP validation.

---
