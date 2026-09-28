# Zelqora production data plan

Payments are intentionally excluded.

## Before public launch
1. Replace JSON persistence with PostgreSQL using `DATABASE_SCHEMA.sql`.
2. Use object storage (S3-compatible) for videos, images and thumbnails; do not rely on local disk for user media.
3. Put a CDN in front of public media.
4. Add background jobs for video transcoding, thumbnail generation, notification delivery and cleanup.
5. Encrypt backups and test restoration regularly.
6. Keep only the minimum personal data needed and document retention/deletion periods.

## Current build
The V10 server remains usable for development/small tests. Its JSON file and local upload directory are not a substitute for the production architecture above.
