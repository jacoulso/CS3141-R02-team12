FROM node:alpine3.11

# Create parent working dir
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app
COPY package.json /usr/src/app
COPY angular.json /usr/src/app
RUN npm install
COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE 4200

CMD npm run watch
RUN echo Server up!