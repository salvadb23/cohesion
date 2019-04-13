# Build
FROM node:11.13.0-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --production

COPY public public
COPY src src
RUN SKIP_PREFLIGHT_CHECK=true yarn build

# Serve
FROM nginx:1.15.11-alpine

COPY --from=0 /usr/src/app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
