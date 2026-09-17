FROM node:20-alpine AS build
WORKDIR /app
ENV VITE_API_BASE_URL=http://localhost:4000
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
