FROM node:alpine

WORKDIR /cohesion/server

RUN apk add --no-cache --virtual build-deps git
COPY package.json package-lock.json ./
ENV NODE_ENV production
RUN npm install
RUN apk del build-deps

COPY . ./

CMD npm start
