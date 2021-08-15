FROM node:12
WORKDIR /app/clean-node-api
COPY ./package.json .
RUN npm install --only=prod
