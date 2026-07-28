FROM node:20-alpine AS base
ARG NPM_MIN_PACKAGE_AGE_DAYS=14
RUN npm install -g npm@latest

FROM base AS builder
ARG NPM_MIN_PACKAGE_AGE_DAYS=14
WORKDIR /app
COPY cms/package.json cms/package-lock.json ./
RUN NPM_BEFORE_DATE="$(node -e "const days=Number(process.env.NPM_MIN_PACKAGE_AGE_DAYS || 14); const d=new Date(Date.now() - days * 24 * 60 * 60 * 1000); console.log(d.toISOString())")" \
  && npm ci --before="$NPM_BEFORE_DATE"
COPY cms/ ./
RUN npm run build

FROM base AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/media ./media
COPY --from=builder /app /cms
EXPOSE 3000
CMD ["sh", "-c", "cd /cms && npx payload migrate || true; cd /app && node server.js"]
