FROM node:11.13.0-alpine

WORKDIR /src/server
ENV NODE_ENV=production PORT=80

COPY package.json package-lock.json ./
RUN npm install

COPY . ./

EXPOSE 80

CMD npm start
