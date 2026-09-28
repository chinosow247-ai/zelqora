# Zelqora V6 — Social Video + Chat

Zelqora now follows a short-form social-video interaction pattern without copying another app's branding or code.

## Main experience
- Full-screen vertical video feed with swipe/scroll snapping
- For You and Following feeds
- Engagement-based feed ordering using views, likes, comments, recency and follows
- Autoplay/pause as reels enter/leave the viewport
- Like, comment, save and share
- Creator profiles and follow/unfollow
- Discover/search for people and videos
- Stories
- Inbox, notifications and private chat
- Create/publish video posts and stories by media URL
- Editable profiles
- Creator tools, coins, premium, gifts and test payouts
- PWA install support
- Capacitor configuration for Android/iOS packaging

## Current limitation
Media upload is URL-based in this prototype. Production should add signed uploads to durable storage/CDN, video transcoding, thumbnails, moderation and a real database.

## Start server
`npm install`
`npm start`
Then open `http://localhost:3000`.

## Mobile
See `MOBILE_BUILD.md`.
