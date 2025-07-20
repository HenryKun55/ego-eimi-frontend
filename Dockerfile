FROM oven/bun AS builder

WORKDIR /app
COPY .env.docker .env
COPY . .
RUN bun i 
RUN bun run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist /app/dist

EXPOSE 4173
CMD ["serve", "-s", "dist", "-l", "4173"]
