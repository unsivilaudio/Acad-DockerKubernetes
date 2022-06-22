FROM node

USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package.json /home/node/app/

RUN npm install

EXPOSE 3000

COPY . /home/node/app/

CMD ["node", "app.js"]