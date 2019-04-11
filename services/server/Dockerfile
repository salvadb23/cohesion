FROM node:11.13.0-alpine

WORKDIR /src/server
ENV NODE_ENV production

COPY package.json package-lock.json ./
RUN npm install

COPY . ./

CMD npm start
