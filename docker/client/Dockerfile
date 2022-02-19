FROM node:16.14.0-alpine

# Create app directory
WORKDIR /app

RUN yarn global add typescript

COPY ./client/package*.json ./

RUN npm install

ADD . /app/

COPY ./client .

EXPOSE 3000

RUN yarn run build

# For production
CMD ["npm","run","start"]