# Development Setup

## Quick Start

### Start Development Environment
```bash
docker compose -f docker-compose.dev.yml up -d --build
```

### Stop Development Environment
```bash
docker compose -f docker-compose.dev.yml down
```

### View Logs
```bash
docker compose -f docker-compose.dev.yml logs -f strapi
```

## Development Features

- **Hot Reload**: Source code changes automatically reload
- **Local Database**: PostgreSQL runs in a container
- **Dev Dependencies**: All dev dependencies installed for development tools
- **Volume Mounts**: Source code mounted for live editing
- **Development Mode**: Runs `pnpm run develop` for auto-reload

## Environment Variables

Edit `.env.dev` file with your development settings:

```env
NODE_ENV=development
DATABASE_CLIENT=postgres
DATABASE_HOST=strapiDB
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi
# ... etc
```

## Access

- **Strapi Admin**: http://localhost:1337/admin
- **API**: http://localhost:1337/api
- **Database**: localhost:5432

---

# Production Setup

For production deployment, use the main `Dockerfile` with an external database.

See `COOLIFY_DEPLOYMENT.md` for production deployment instructions.



