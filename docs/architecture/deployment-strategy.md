# Deployment Strategy

## MVP Deployment: Expo Go Only

**Process:**
1. Configure Firebase project in production mode
2. Add Firebase config to `.env` file
3. Run app locally: `npx expo start`
4. Generate QR code (automatically shown in terminal)
5. Team members scan QR code with Expo Go app
6. App loads directly from development server

**Expo Go Limitations:**
- No custom native modules (acceptable for MVP - we don't need any)
- Performance slightly lower than native build (acceptable for MVP testing)
- Requires Expo Go app installed on device
- Requires development server running (laptop must be on same network)

**Deployment Checklist:**
- [ ] Firebase project in production mode
- [ ] Security Rules deployed
- [ ] API keys in environment variables (`.env` file)
- [ ] Development server running (`npx expo start`)
- [ ] QR code visible in terminal
- [ ] Testing devices can scan and load app
- [ ] All team members on same WiFi network

**No EAS, No Publishing, No Builds for MVP:**
- NO `expo publish` - not needed
- NO EAS Update - deferred to post-MVP
- NO EAS Build - deferred to post-MVP
- NO standalone builds - use Expo Go only

## Post-MVP Deployment: Native Builds (Future)

**Future strategy (post-MVP only):**
- Use Expo EAS Build for production iOS/Android builds
- Submit to App Store / Play Store
- Implement over-the-air updates with EAS Update
- Add CI/CD pipeline (GitHub Actions + EAS)
- Create standalone apps that don't require Expo Go

---
