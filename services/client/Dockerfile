# Build
FROM node:alpine

WORKDIR /cohesion/client

COPY package.json yarn.lock ./
ENV NODE_ENV production
RUN yarn install
COPY public public
COPY src src

RUN yarn build

# SERVE
FROM nginx:alpine

COPY --from=0 /cohesion/client/build /usr/share/nginx/html
COPY cohesion.template /etc/nginx/conf.d/cohesion.template
ENV PORT 80

CMD sh -c "envsubst '\${PORT} \${PROXY_URL}' < /etc/nginx/conf.d/cohesion.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"
