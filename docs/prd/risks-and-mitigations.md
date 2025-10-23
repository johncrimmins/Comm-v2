# Risks and Mitigations

## Risk 1: Firestore Costs Exceed Free Tier

**Impact:** High  
**Likelihood:** Medium  
**Mitigation:**
- Monitor Firestore usage in Firebase Console dashboard
- Implement read/write optimizations (pagination, debouncing)
- Set up Firebase usage alerts
- If approaching limits, optimize queries or consider caching strategies

## Risk 2: Offline Sync Conflicts

**Impact:** Medium  
**Likelihood:** Low  
**Mitigation:**
- Firestore's built-in conflict resolution handles most cases (last-write-wins)
- Test edge cases: Two users offline, edit same conversation, both come online
- Message IDs generated client-side prevent duplicates
- Implement conflict detection and user notification if needed

## Risk 3: Expo Go Limitations

**Impact:** Medium  
**Likelihood:** Low  
**Mitigation:**
- Design around Expo Go constraints (no custom native modules)
- Fallback to iOS simulator if Expo Go issues arise
- Document any Expo Go-specific bugs
- Consider native build post-MVP if limitations are blocking

## Risk 4: Performance Degradation with Large Message History

**Impact:** Medium  
**Likelihood:** Medium  
**Mitigation:**
- Implement pagination from day one (load 50 messages at a time)
- Test with 1000+ messages to validate performance
- Monitor SQLite query performance
- Consider archiving old messages post-MVP

## Risk 5: Push Notification Reliability

**Impact:** Low (MVP only requires foreground)  
**Likelihood:** Medium  
**Mitigation:**
- Expo Notifications tested extensively for foreground notifications
- Document any delivery quirks
- Background notifications deferred to post-MVP
- Fallback: Real-time listeners keep messages in sync when app open

---
