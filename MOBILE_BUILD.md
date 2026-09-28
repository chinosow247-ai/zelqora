# Zelqora mobile build

The web application is packaged with Capacitor so one codebase can target Android and iOS.

## Development
1. Install Node.js 22+.
2. In this folder, run `npm install` using the dependencies in `mobile-package.json` (rename it to package.json for the mobile build workspace).
3. Run `npx cap add android` and/or `npx cap add ios` once.
4. Run `npx cap sync`.
5. Android: `npx cap open android` then build a signed AAB/APK in Android Studio.
6. iOS: `npx cap open ios` then build/archive in Xcode and upload through App Store Connect.

## Important production work before store submission
- Replace development JWT secret with a strong environment secret.
- Move JSON storage to a real database.
- Put videos/images in durable object storage/CDN.
- Add moderation, blocking, reporting, copyright handling and age/safety controls.
- Add WebSocket/push notifications for true realtime chat.
- Add camera/microphone/media permissions and native upload/capture flows.
- Connect real payment/store billing according to the distribution platform's rules.
- Configure privacy policy, terms, account deletion and store metadata.
- Add analytics/crash reporting and load testing.
