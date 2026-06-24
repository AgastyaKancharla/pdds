FROM node:20-alpine AS base
WORKDIR /app
COPY package.json ./
RUN npm ci --only=production
COPY src/ ./src/

FROM base AS production
ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "src/index.js"]
