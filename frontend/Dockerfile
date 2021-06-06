FROM node:alpine as build

WORKDIR /app
COPY package.json yarn.lock ./
RUN npm install  && mv ./node_modules ./
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx","-g","daemon off;"]