FROM node:20-slim AS builder

WORKDIR /workspace

COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./
COPY jest.config.ts ./
COPY jest.preset.js ./

COPY scripts/ ./scripts/

COPY apps/products ./apps/products
COPY libs/grpc ./libs/grpc
COPY libs/nestjs ./libs/nestjs

RUN npm install --legacy-peer-deps

RUN apt-get update && apt-get install -y protobuf-compiler

RUN npx nx run-many -t build -p grpc nestjs products

FROM node:20-slim AS runner

WORKDIR /app

COPY --from=builder /workspace/package.json ./
COPY --from=builder /workspace/libs/grpc/package.json ./libs/grpc/package.json
COPY --from=builder /workspace/libs/grpc/src/lib ./libs/grpc/src/lib
COPY --from=builder /workspace/apps/products/drizzle.config.ts ./apps/products/drizzle.config.ts
COPY --from=builder /workspace/apps/products/drizzle ./apps/products/drizzle
COPY --from=builder /workspace/package-lock.json ./

ENV NODE_ENV=production

RUN npm ci --legacy-peer-deps

COPY --from=builder /workspace/dist ./dist

CMD ["node", "dist/apps/products/main"]
