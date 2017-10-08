FROM nginx:alpine
#create the server and location configuration
COPY default.conf /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html
EXPOSE 80
