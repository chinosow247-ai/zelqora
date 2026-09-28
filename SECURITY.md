# Zelqora security checklist

- Use a unique 32+ byte JWT_SECRET in production.
- Set CORS_ORIGINS to the exact production origins; never use `*`.
- Put Zelqora behind HTTPS/TLS and a reverse proxy.
- Keep uploads on durable object storage/CDN before large-scale launch.
- Run dependency audits (`npm audit`) before each release.
- Rotate secrets and revoke compromised device tokens.
- Keep admin accounts separate from ordinary users.
- Review reports daily and document moderation decisions.
- Add automated backups and test restoring them.
- Never place payment provider secret keys in client code.
- Do not store raw passwords; Zelqora stores bcrypt password hashes.
