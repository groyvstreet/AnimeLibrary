FROM node:18.0-alpine

WORKDIR /frontend

ENV PATH /frontend/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN apk update && apk add python3 make g++
RUN npm install

USER node

COPY . .