FROM node:alpine

WORKDIR /cohesion/server

# steam-wrapper depedency is on GitLab, remove when released on NPM
RUN apk add --no-cache --virtual build-deps git
COPY package.json package-lock.json ./
ENV NODE_ENV production
RUN npm install
# Cleanup L6
RUN apk del build-deps

COPY . ./

CMD npm start
