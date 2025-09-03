# --- Etapa 1: Build ---
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build  

FROM node:22-alpine AS runtime
WORKDIR /app

COPY package*.json ./
COPY docs ./dist/docs
RUN npm ci --only=production

COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/src/app.js"]
