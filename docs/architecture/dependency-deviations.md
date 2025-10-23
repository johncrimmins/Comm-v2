# Dependency Deviations from Original Plan

**Document Version**: 1.0
**Last Updated**: 2025-10-22
**Status**: Living Document - Updated as dependencies evolve

---

## Overview

This document tracks differences between originally planned package versions and actual installed versions. It serves as a reference for understanding why certain dependencies differ from the initial architecture plan and provides guidance for future dependency decisions.

## Critical Version Deviations

### 1. Expo SDK: 50.x → ~54.0.19

**Deviation Type**: Major version upgrade
**Reason**: Latest stable release with critical bug fixes and improved compatibility

**Impact**:
- Requires React Native 0.81.5 (up from planned 0.73.x)
- Requires Expo Router 6.x (up from planned 3.x)
- Includes improved Metro bundler performance
- Better TypeScript support across Expo packages

**Compatibility Notes**:
- Expo 54 is fully compatible with React 19.x
- All expo-* packages must match SDK version (e.g., expo-constants ~18.x for SDK 54)
- Breaking changes from Expo 50→54 are minimal for basic usage

**References**:
- [Expo SDK 54 Release Notes](https://expo.dev/changelog/2024/11-12-sdk-54)

---

### 2. React Native: 0.73.x → 0.81.5

**Deviation Type**: Minor version upgrade (required by Expo 54)
**Reason**: Compatibility requirement for Expo SDK 54

**Impact**:
- Improved performance and stability
- Better React 19 integration
- New Architecture enabled by default (controlled via app.json)
- Minor API changes in native modules (not affecting our MVP scope)

**Compatibility Notes**:
- React Native 0.81 requires React 19.x
- Compatible with all planned Expo packages
- Metro bundler version automatically aligned

**Known Issues**: None for our use case

---

### 3. Firebase SDK: 9.x → ^12.4.0

**Deviation Type**: Major version upgrade
**Reason**: Latest SDK with improved TypeScript support and tree-shaking

**Impact**:
- Better TypeScript type definitions (fewer `any` types)
- Improved tree-shaking reduces bundle size
- Modular API remains compatible (no breaking changes to our usage)
- Enhanced error messages and debugging

**API Compatibility**:
```typescript
// Firebase 9.x and 12.x both use modular API (same syntax)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
```

**Migration Notes**:
- No code changes needed when upgrading from 9.x to 12.x if using modular imports
- Avoid legacy `firebase.app()` syntax

**Bundle Size Comparison**:
- Firebase 9.x: ~250KB (minified + gzipped, with auth + firestore)
- Firebase 12.x: ~230KB (minified + gzipped, with auth + firestore)
- **Savings**: ~20KB due to improved tree-shaking

---

### 4. Expo Router: 3.x → ^6.0.13

**Deviation Type**: Major version upgrade (required by Expo SDK 54)
**Reason**: Required by Expo SDK 54; improved stability and features

**Impact**:
- Built on React Navigation 6 (improved performance)
- Better TypeScript support for route params
- Enhanced deep linking capabilities
- Improved error boundaries and error handling

**Breaking Changes from 3.x**:
- Layout route syntax unchanged (minimal migration needed)
- `useRouter()` hook API remains compatible
- File-based routing conventions unchanged

**Compatibility Notes**:
- Requires Expo SDK 54+
- Fully compatible with React 19 and React Native 0.81

---

### 5. React: Not Specified → 19.1.0

**Deviation Type**: Version specification
**Reason**: Latest stable React version with performance improvements

**Impact**:
- React Server Components support (not used in MVP)
- Improved Suspense and concurrent rendering
- Better TypeScript support
- Performance improvements for list rendering (benefits message lists)

**Compatibility Notes**:
- React 19 is fully compatible with React Native 0.81.5
- No breaking changes affecting React Native usage
- Hooks API unchanged

---

## Additional Installed Dependencies

These packages were added beyond the original plan:

### expo-status-bar (~3.0.8)
**Reason**: Standard Expo package for status bar management
**Usage**: Cross-platform status bar styling (light/dark modes)
**Required By**: Expo SDK best practices

### react-dom (19.1.0)
**Reason**: Required for Expo web builds
**Usage**: Enables running the app in browsers via `npx expo start --web`
**Required By**: expo-router web support

### react-native-web (^0.21.0)
**Reason**: Translates React Native components to web equivalents
**Usage**: Powers web builds alongside react-dom
**Required By**: Expo web support

### @types/react (~19.1.10)
**Reason**: TypeScript definitions for React 19
**Usage**: Provides type safety for React components and hooks
**Required By**: TypeScript development

---

## Deferred Dependencies

These packages were in the original plan but have been deferred to future stories:

### date-fns (2.x)
**Status**: Not yet installed
**Reason**: Not needed until implementing message timestamps
**Install In**: Story 2.x (Messaging Implementation)

### @react-native-community/netinfo (11.x)
**Status**: Not yet installed
**Reason**: Not needed until implementing offline sync
**Install In**: Story 2.x (Sync Engine Implementation)

### uuid (9.x)
**Status**: Not yet installed
**Reason**: Not needed until generating message IDs
**Install In**: Story 2.x (Messaging Implementation)

### React Native Elements (4.x)
**Status**: Not yet installed
**Reason**: Not needed until building UI components
**Install In**: Story 1.4+ (UI Implementation)

### expo-sqlite
**Status**: Not yet installed
**Reason**: Not needed until implementing local database
**Install In**: Story 2.x (Offline Storage Implementation)

### Jest + React Native Testing Library
**Status**: Not yet installed
**Reason**: Deferred per testing strategy (manual testing for MVP)
**Install In**: Post-MVP

---

## Dependency Compatibility Matrix

| Package | Version | Compatible With | Notes |
|---------|---------|-----------------|-------|
| expo | ~54.0.19 | RN 0.81.5, React 19.1.0 | ✅ Fully compatible |
| react-native | 0.81.5 | Expo 54, React 19 | ✅ Fully compatible |
| firebase | ^12.4.0 | All modern browsers, RN 0.73+ | ✅ Fully compatible |
| expo-router | ^6.0.13 | Expo 54+, React Navigation 6 | ✅ Fully compatible |
| typescript | ~5.9.2 | React 19, all packages | ✅ Fully compatible |

---

## Lessons Learned

### 1. Always Use Latest Stable Expo SDK
**Learning**: Starting with Expo SDK 54 instead of 50 avoided future migration work
**Recommendation**: For new projects, use latest stable SDK unless specific version constraints exist

### 2. Firebase Version Flexibility
**Learning**: Firebase 12.x maintains API compatibility with 9.x (modular imports)
**Recommendation**: Use latest Firebase SDK for better TypeScript and bundle size

### 3. Expo Manages React Native Version
**Learning**: Expo SDK determines compatible React Native version
**Recommendation**: Don't manually specify React Native version; let Expo manage it

### 4. Defer Non-Critical Dependencies
**Learning**: Installing dependencies only when needed reduces initial complexity
**Recommendation**: Add packages incrementally as features are implemented

---

## Future Dependency Considerations

### When Adding New Dependencies:

1. **Check Expo Compatibility**: Verify package works with Expo managed workflow
2. **Avoid Native Modules**: Prefer Expo-wrapped packages over @react-native-community/* when possible
3. **TypeScript Support**: Ensure package has TypeScript definitions (@types/* or built-in)
4. **Bundle Size**: Check package size via [Bundlephobia](https://bundlephobia.com/)
5. **Maintenance Status**: Verify package is actively maintained (GitHub activity, npm downloads)

### Recommended Approval Process:

1. Developer proposes dependency in story or RFC
2. Architect reviews compatibility and bundle impact
3. Add to `package.json` with specific version constraint (e.g., `^12.0.0`)
4. Update this document with rationale
5. Update `tech-stack.md` with status change

---

## Document Maintenance

**Update Triggers**:
- New dependency added to package.json
- Major version upgrade of existing dependency
- Dependency removed or replaced
- Compatibility issue discovered

**Owners**: Development Team + Architect

**Review Cadence**: Every story completion or major milestone

---

## References

- [Expo SDK 54 Documentation](https://docs.expo.dev/)
- [React Native 0.81 Release Notes](https://reactnative.dev/blog)
- [Firebase JS SDK Release Notes](https://firebase.google.com/support/release-notes/js)
- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
