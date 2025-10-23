# Error Handling & Retry Logic

## Error Categories

1. **Network Errors:** Temporary connectivity issues
   - **Strategy:** Retry with exponential backoff
   - **User Feedback:** "Connection lost. Retrying..."

2. **Firestore Errors:** Permission denied, quota exceeded
   - **Strategy:** Log error, show user-friendly message
   - **User Feedback:** "Unable to send message. Please try again."

3. **SQLite Errors:** Database corruption, disk full
   - **Strategy:** Attempt recovery, fallback to Firestore-only mode
   - **User Feedback:** "Local storage error. Some features may be limited."

4. **Auth Errors:** Invalid credentials, token expired
   - **Strategy:** Force re-authentication
   - **User Feedback:** "Session expired. Please log in again."

## Retry Logic Implementation

```typescript
async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 5
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry auth errors or permission errors
      if (error.code === 'permission-denied' || error.code === 'unauthenticated') {
        throw error;
      }
      
      // Exponential backoff: 1s, 2s, 4s, 8s, 16s
      const delay = Math.min(1000 * Math.pow(2, attempt), 16000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
}
```

---
