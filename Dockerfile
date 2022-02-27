FROM node:alpine3.11
WORKDIR /usr/code
COPY package*.json ./
COPY angular*.json ./
RUN npm install
COPY . .

RUN npm run build
COPY .env ./dist/
WORKDIR ./dist

EXPOSE 3000
CMD node ./src/login.html

RUN echo Server up!