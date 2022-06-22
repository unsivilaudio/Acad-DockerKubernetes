FROM node:alpine

USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node package.json /home/node/app
RUN npm install

COPY --chown=node:node . /home/node/app

EXPOSE 3000

CMD [ "npm", "start" ]