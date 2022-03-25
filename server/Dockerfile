FROM node:alpine3.11

# Create parent working dir
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app
COPY package.json /usr/src/app
RUN npm install
COPY . .
COPY .env .
# Expose the port the server runs in
EXPOSE 3000
CMD npm start
RUN echo Server up!