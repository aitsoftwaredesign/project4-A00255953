# build environment
FROM node:13.12.0-alpine as builder
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY Client/booking-ally/package.json ./
COPY Client/booking-ally/package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g --silent
COPY Client/booking-ally .
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY Client/booking-ally/production/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
