FROM node:10

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "node", "src/server/index.js" ]
