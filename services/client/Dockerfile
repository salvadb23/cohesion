# Build
FROM node:11.13.0-alpine

WORKDIR /src/client
ENV NODE_ENV=production SKIP_PREFLIGHT_CHECK=true

COPY package.json yarn.lock ./
RUN yarn install

COPY public public
COPY src src
RUN yarn build

# Serve
FROM nginx:1.15.11-alpine

COPY --from=0 /src/client/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
