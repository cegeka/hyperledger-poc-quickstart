FROM nginx:alpine

ARG FRONTEND_ENV
ARG PUBLIC_URL
ARG MONITOR_PUBLIC_URL

USER root

# prerequisites
RUN apk add --update alpine-sdk openssh-client git nodejs && rm -rf /var/cache/apk
RUN npm install -g @angular/cli@v1.4.4

WORKDIR /opt/frontend

#build speed improvement. Not used now
#COPY package-base.json package.json
#RUN npm install

# Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf.env

RUN rm -f /etc/nginx/nginx.conf
RUN mkdir -p /etc/nginx/logs/

# continue with normal install of latest sources
COPY . .

# Not sure why but sometimes the build fails because of a missing uglify-es
RUN npm install uglify-es
RUN npm install

# Replace the production configuration values with the build-time args BEFORE building everyting
RUN envsubst '\$PUBLIC_URL \$MONITOR_PUBLIC_URL' < /opt/frontend/src/environments/environment.prod-template.ts > /opt/frontend/src/environments/environment.prod.ts

RUN ng build $FRONTEND_ENV

CMD /bin/sh -c "envsubst '\$SERVER_HOST \$SERVER_PORT' < /etc/nginx/nginx.conf.env > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"