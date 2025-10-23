# Risk Mitigation

## Risk 1: Firestore Costs

**Mitigation:**
- Monitor usage in Firebase Console dashboard
- Implement pagination (limit queries to 50 items)
- Use Firestore offline persistence to reduce redundant reads
- Debounce presence updates (every 30s, not per action)
- Set up Firebase budget alerts

## Risk 2: Sync Conflicts

**Mitigation:**
- Firestore's last-write-wins handles most conflicts
- Client-side message IDs (UUID) prevent duplicates
- Test edge cases: Two offline users, both send messages, both reconnect

## Risk 3: SQLite Performance with Large History

**Mitigation:**
- Pagination (load 50 messages at a time)
- Indexes on frequently queried columns
- Test with 10,000+ messages to validate
- Consider archiving old messages post-MVP

## Risk 4: Expo Go Limitations

**Mitigation:**
- Design around Expo constraints (no custom native modules)
- Test on iOS simulator as fallback
- Plan for native build post-MVP if needed

---
