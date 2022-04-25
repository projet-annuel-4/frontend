# pull official base image
FROM node:13.12.0-alpine

WORKDIR /usr/src/app/ui

COPY package*.json ./
RUN npm cache clean --force
RUN npm install --silent
RUN npm install react-scripts@3.4.0 -g --silent

COPY . ./

EXPOSE 4200

CMD ["npm", "start"]

