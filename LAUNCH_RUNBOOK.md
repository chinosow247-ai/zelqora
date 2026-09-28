# Zelqora launch runbook (payments intentionally excluded)

## 1. Server
- Node.js 22+
- `npm ci`
- Set `NODE_ENV=production`, `JWT_SECRET`, `CORS_ORIGINS`, `ADMIN_EMAIL`.
- Run `npm run smoke` before deployment.
- Put the server behind HTTPS.

## 2. Data
- Current JSON persistence is suitable for development/small tests.
- Before public scale, run `DATABASE_SCHEMA.sql` on PostgreSQL and replace JSON persistence with a database adapter.
- Back up user/content data and test restoration.

## 3. Media
- Current upload endpoint stores files locally.
- Before scale, move media to S3-compatible/object storage and serve through a CDN.
- Add virus scanning/transcoding and thumbnail generation.

## 4. Notifications
- Register device tokens through `/api/devices`.
- Connect those tokens to FCM (Android/web) and APNs (iOS) in the production notification worker.

## 5. Moderation
- Review `/api/admin/reports` regularly.
- Add copyright/takedown workflow and age/safety enforcement before public launch.

## 6. Mobile
- `npx cap sync`
- Android: open Android Studio, configure signing, test release build, then Play Console.
- iOS: open Xcode on macOS, configure signing, TestFlight, then App Store Connect.

## 7. Payments
- Intentionally not included in this release; connect later.
