FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache curl
COPY services/gateway/package*.json ./
RUN npm ci --only=production
COPY services/gateway/src ./src
RUN mkdir -p logs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
CMD ["node","src/index.js"]
