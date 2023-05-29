FROM node:16-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app


# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* prisma ./
RUN yarn --frozen-lockfile



# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

ENV ELASTIC_SEARCH_USERNAME=elastic
ENV ELASTIC_SEARCH_PASSWORD=password
ENV ELASTIC_SEARCH_URL=https://sd.sgi-italia.org:8881
ENV ELASTIC_SEARCH_INDEX=bibliotecawpsgiitaliaorgsite-post-1
ENV REVALIDATE_SECRET=''

RUN --mount=type=secret,id=SENTRY_SECRET,dst=./.sentryclirc --mount=type=secret,id=ENV_WITH_SECRETS,required \
  source /run/secrets/ENV_WITH_SECRETS && \
  DATABASE_URL=$DATABASE_URL yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV DATABASE_URL ''

CMD ["node", "server.js"]