FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache curl
COPY services/history/package*.json ./
RUN npm ci --only=production
COPY services/history/src ./src
EXPOSE 3003
CMD ["node","src/index.js"]
