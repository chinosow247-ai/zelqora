# Zelqora V7

Zelqora is a social video + chat platform with a TikTok-inspired interaction pattern and its own Zelqora branding.

## Main experience
- Full-screen vertical video feed
- For You / Following
- Stories
- Discover/search
- Profiles, followers and following
- Likes, comments, saves and views
- Private chat + realtime WebSocket events
- Notifications
- Creator tools, gifts, coins and Premium test mode
- Blocking, reporting and account deletion APIs
- PWA + Capacitor mobile packaging setup

## Run locally
```bash
npm install
JWT_SECRET="use-a-long-random-secret" npm start
```
Open `http://localhost:3000`.

## Mobile packaging
See `MOBILE_BUILD.md`. The repository contains Capacitor configuration for Android and iOS. Native projects are generated with Capacitor CLI on a machine with the required Android/iOS toolchains.

## Important
This is a development/staging build. Real payments, production database, object storage/CDN, push notifications, moderation operations, app-store signing and security hardening still need to be completed before a public launch.
