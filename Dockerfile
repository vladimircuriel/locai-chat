FROM node:22-alpine AS base
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
COPY .npmrc ./
COPY tsconfig.json ./
COPY postcss.config.js ./
COPY .npmrc ./
COPY astro.config.mjs ./
COPY src/ ./src
COPY public/ ./public

RUN pnpm install --prod --frozen-lockfile
RUN pnpm install --frozen-lockfile
RUN pnpm run build && pnpm store prune

ENV HOST="0.0.0.0"
ENV PORT="4321"

USER node

EXPOSE 4321

CMD ["pnpm", "preview", "--host", "--port", "4321"]
