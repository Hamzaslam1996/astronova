# Build static site
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
# Allow peer-dependency mismatches (typescript-eslint vs typescript)
RUN npm config set legacy-peer-deps true
RUN npm ci
COPY . .
RUN npm run build  # outputs to /app/dist

# Serve with Nginx on Cloud Run port
FROM nginx:1.27-alpine
EXPOSE 8080
# Make Nginx listen on 8080 (Cloud Run sets $PORT=8080)
RUN sed -i 's/listen       80;/listen       8080;/' /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
