FROM node:18-alpine AS builder
WORKDIR /app

COPY ./backend/package*.json ./
RUN npm install

COPY ./backend .

RUN npm run build

FROM node:18-alpine AS production
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/main"]
