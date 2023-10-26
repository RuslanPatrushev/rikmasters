# stage 1
FROM node:18 as node

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build --prod

# stage 2
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=node /app/dist/rikmasters ./usr/share/nginx/html/

ARG API_URL="__API_URL__"
ENV API_URL="${API_URL}"
RUN sed -i "s|__API_URL__|${API_URL}|"  /usr/share/nginx/html/index.html

COPY ./.nginx/nginx.conf ./etc/nginx/nginx.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]

