# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

COPY ./frontend/package*.json ./

RUN npm install

COPY ./frontend .

RUN npm run build

# Stage 2: Production
FROM node:18-alpine AS production
WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

ENV NODE_ENV=production
EXPOSE 3001

CMD ["npm", "start"]
