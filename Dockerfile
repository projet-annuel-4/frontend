FROM node:lts as node
WORKDIR /app
COPY . .
RUN npm install -g npm@8.14.0
RUN npm install -g @angular/cli
RUN npm install --legacy-peer-deps
RUN npm run build --prod

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/
COPY --from=node /app/dist/frontend /usr/share/nginx/html
EXPOSE 80
