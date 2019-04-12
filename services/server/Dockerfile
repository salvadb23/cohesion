FROM node:11.13.0-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
ENV NODE_ENV=production
RUN yarn install

COPY . ./

CMD PORT=80 yarn start
