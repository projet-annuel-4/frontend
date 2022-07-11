#
# Build stage
#
FROM node:12.8-alpine AS builder

WORKDIR /usr/src/app
COPY . .
RUN yarn && yarn build

#
# Package stage
#
FROM nginx:stable-alpine
LABEL version="1.0"

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY --from=builder /usr/src/app/dist/my-angular-app/ .
