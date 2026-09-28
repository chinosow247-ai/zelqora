FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
ENV NODE_ENV=production PORT=3000
RUN mkdir -p uploads
EXPOSE 3000
CMD ["node","server.js"]
