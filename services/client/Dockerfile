# Build
FROM node:alpine

WORKDIR /cohesion/client

COPY package.json yarn.lock ./
# react-helpers depedency is on GitLab, remove when released on NPM
RUN apk add --no-cache --virtual build-deps git
ENV NODE_ENV production
RUN yarn install
# Cleanup L8
RUN apk del build-deps

COPY public public
COPY src src
ENV SKIP_PREFLIGHT_CHECK true
RUN yarn build

# SERVE
FROM nginx:alpine

COPY --from=0 /cohesion/client/build /usr/share/nginx/html
COPY cohesion.template /etc/nginx/conf.d/cohesion.template
ENV PORT 80

CMD sh -c "envsubst '\${PORT} \${PROXY_URL}' < /etc/nginx/conf.d/cohesion.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"
