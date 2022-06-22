FROM node

USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node ./package.json /home/node/app

RUN npm install

ARG DEFAULT_PORT=80
COPY --chown=node:node . /home/node/app/

ENV PORT ${DEFAULT_PORT}
EXPOSE ${PORT}

CMD [ "npm", "start" ]