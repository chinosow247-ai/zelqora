# Zelqora production readiness

This release is a stronger development/staging build. It is **not yet a production launch**.

## Included in V7
- TikTok-style full-screen vertical feed
- For You / Following feeds
- Engagement-based feed ordering
- Views, likes, saves and comments
- Stories
- Creator profiles and follows
- Search / Discover
- Private messaging
- WebSocket realtime message events at `/ws?token=...`
- Notifications
- Blocking and reporting APIs
- Account deletion endpoint
- Wallet / creator tools remain test-only
- Capacitor Android/iOS configuration

## Before public launch
1. Replace JSON storage with PostgreSQL (or another managed database).
2. Store videos/images in object storage/CDN; do not store user media on the app server.
3. Add HTTPS, secure cookies/token rotation, rate limiting and abuse protection.
4. Add content moderation, age/safety controls, copyright/takedown workflow and admin tools.
5. Add push notifications with Firebase/APNs.
6. Add analytics, crash reporting, backups and monitoring.
7. Complete payment-provider/store billing integration and KYC/creator payout rules.
8. Configure Google Play and Apple App Store signing/release accounts.
