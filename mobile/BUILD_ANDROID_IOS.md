# Zelqora Android + iPhone build

## Android
Requirements: Node.js 22+, Android Studio, Android SDK, JDK 21.

From this `mobile` directory:

```bash
npm install
npx cap add android
npx cap sync android
npx cap open android
```

In Android Studio, create a signed APK for testing or a signed AAB for Google Play.

## iPhone
Requirements: macOS, Xcode 26+, Node.js 22+.

```bash
npm install
npx cap add ios
npx cap sync ios
npx cap open ios
```

In Xcode, select a signing team, configure the bundle identifier `com.zelqora.app`, archive, then distribute through App Store Connect.

## Direct phone installation without an app store
Zelqora also has a PWA manifest and service worker. Host the `public/` folder over HTTPS and users can use **Add to Home Screen** on Android and iPhone.

## Production requirements
Before public release: use a real database, durable video/image storage, HTTPS, push notifications, moderation, age/safety controls, privacy policy, terms, account deletion, crash monitoring, rate limits, secure JWT secrets, and platform-compliant payment billing.
