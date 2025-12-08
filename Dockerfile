FROM node:22-alpine

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

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy rest of the application
COPY . .

# Build the admin panel (required for production)
RUN pnpm run build

# Change ownership to node user
RUN chown -R node:node /opt/app
USER node

ENV PATH="/opt/app/node_modules/.bin:${PATH}"

EXPOSE 1337
CMD ["pnpm", "run", "start"]
