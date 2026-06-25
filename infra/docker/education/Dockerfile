FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache curl
COPY services/education/package*.json ./
RUN npm ci --only=production
COPY services/education/src ./src
EXPOSE 3002
CMD ["node","src/index.js"]
