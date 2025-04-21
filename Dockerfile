# Step 1: Build the frontend
FROM node:18 as build

WORKDIR /app

COPY package*.json ./
COPY .env.local .env.local

RUN npm install

COPY . .

RUN npm run build

# Step 2: Serve the frontend using nginx
FROM nginx:alpine

# Use Vite's dist folder instead of build
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Use a custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


