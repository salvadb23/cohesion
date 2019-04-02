FROM node:alpine

WORKDIR /cohesion/server

COPY package.json package-lock.json ./
ENV NODE_ENV production
RUN npm install

COPY . ./

CMD npm start
