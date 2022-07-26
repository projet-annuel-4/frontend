#
# Build stage
#
FROM node:16-alpine

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN npm install

# Copying source files
COPY . .

# Building app
RUN npm install -g npm@8.14.0
RUN npm install -g @angular/cli
RUN npm install --legacy-peer-deps
RUN npm run build --prod

EXPOSE 4200
# Running the app
CMD [ "npm", "start" ]

