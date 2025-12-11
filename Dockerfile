####
# Multi-stage build for production
####

# ---- Build stage ----
FROM node:22-alpine AS build

# Install build deps for sharp/libvips (required by Strapi upload)
RUN apk update && apk add --no-cache \
  build-base \
  gcc \
  autoconf \
  automake \
  zlib-dev \
  libpng-dev \
  nasm \
  vips-dev \
  git

WORKDIR /opt/app

# Install pnpm globally
RUN npm install -g node-gyp pnpm \
  && npm config set fetch-retry-maxtimeout 600000 -g

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (needed for the build)
RUN pnpm install --frozen-lockfile

# Copy rest of the application
COPY . .

# Build admin panel for production
RUN pnpm run build

# ---- Runtime stage ----
FROM node:22-alpine

# Runtime dependency for sharp/libvips
RUN apk add --no-cache vips-dev

# Install pnpm for runtime scripts and ensure uploads dir exists/writable
RUN npm install -g pnpm \
  && mkdir -p /opt/app/public/uploads \
  && chown -R node:node /opt/app/public

ENV NODE_ENV=production

WORKDIR /opt/app

# Copy production node_modules and built app
COPY --from=build /opt/app/node_modules ./node_modules
COPY --from=build /opt/app ./

ENV PATH="/opt/app/node_modules/.bin:${PATH}"

# Run as non-root
RUN chown -R node:node /opt/app
USER node

EXPOSE 1337

# Start Strapi in production mode
CMD ["pnpm", "run", "start"]
