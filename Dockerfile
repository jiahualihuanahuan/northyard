FROM node:22-bookworm-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENV NITRO_PRESET=node-server
RUN npm run build

FROM node:22-bookworm-slim

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1206

COPY --from=build /app/.output ./.output

EXPOSE 1206

CMD ["node", ".output/server/index.mjs"]
