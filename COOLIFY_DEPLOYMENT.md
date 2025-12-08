# Coolify Deployment Guide

## Changes Made for Coolify

### 1. Fixed `docker-compose.yml`
- Removed problematic file mounts (`package.json`, `pnpm-lock.yaml`) that were causing mount errors
- Removed directory mounts (`config`, `src`) - code is now baked into the Docker image
- Changed to use named volumes for uploads persistence (`strapi-uploads`)
- Removed obsolete `version: "3"` declaration
- Changed `env_file` for strapiDB to use `.env` instead of `docker.env`

### 2. Updated `Dockerfile`
- Added admin panel build step (`pnpm run build`) during image build
- Changed CMD from `develop` to `start` for production mode

## Environment Variables Required in Coolify

Set these in your Coolify application's environment variables:

### Required Variables:
- `DATABASE_CLIENT=postgres`
- `DATABASE_HOST=strapiDB` (service name from docker-compose)
- `DATABASE_PORT=5432`
- `DATABASE_NAME=strapi` (or your preferred DB name)
- `DATABASE_USERNAME=strapi` (or your preferred username)
- `DATABASE_PASSWORD=<your-secure-password>`
- `DATABASE_SSL=false` (set to `true` if using SSL)

### Strapi Security Variables:
- `APP_KEYS=<comma-separated-keys>` (e.g., `key1,key2,key3,key4`)
- `API_TOKEN_SALT=<random-string>`
- `ADMIN_JWT_SECRET=<random-string>`
- `JWT_SECRET=<random-string>`
- `TRANSFER_TOKEN_SALT=<random-string>`
- `ENCRYPTION_KEY=<random-string>`

### Application Settings:
- `NODE_ENV=production` (for production deployments)
- `HOST=0.0.0.0`
- `PORT=1337`

## Deploy Keys Setup

1. **Generate SSH Key Pair** (if you haven't already):
   ```bash
   ssh-keygen -t rsa -b 4096 -C "coolify-deploy" -f ~/.ssh/coolify_deploy_key
   ```

2. **Add Public Key to GitHub**:
   - Go to your repository: `https://github.com/net2mulu/macro-cms`
   - Settings → Deploy keys → Add deploy key
   - Paste the **public key** (`coolify_deploy_key.pub`)
   - Give it a name (e.g., "Coolify Deploy")
   - ✅ Check "Allow write access" if you need it (usually not needed for deployments)

3. **Add Private Key to Coolify**:
   - In Coolify, go to your application settings
   - Find "Deploy Keys" or "SSH Keys" section
   - Add the **private key** (`coolify_deploy_key`)
   - Coolify will use this to clone your repository

## Deployment Steps

1. **Push your changes** to the repository (the fixed docker-compose.yml and Dockerfile)

2. **In Coolify**:
   - Go to your application
   - Ensure all environment variables are set
   - Click "Deploy" or trigger a new deployment

3. **Verify Deployment**:
   - Check logs in Coolify for any errors
   - Access your Strapi admin at `https://cms.macrogc.com/admin`
   - Database should be automatically created by the healthcheck

## Troubleshooting

### If deployment fails:
1. Check that all environment variables are set correctly
2. Verify deploy key has access to the repository
3. Check Coolify logs for specific error messages
4. Ensure database credentials match between strapi and strapiDB services

### If database connection fails:
- Verify `DATABASE_HOST=strapiDB` matches the service name
- Check that strapiDB container is healthy before strapi starts
- Verify database credentials are correct

### If uploads don't persist:
- Check that the `strapi-uploads` volume is created
- Verify volume mounts in docker-compose.yml

## Notes

- The admin panel is built during Docker image creation, so first deployment may take longer
- Uploads are persisted in a Docker volume (`strapi-uploads`)
- Database data is persisted in a Docker volume (`strapi-data`)
- For production, ensure all security keys are strong and unique

