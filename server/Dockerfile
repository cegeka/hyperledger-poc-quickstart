FROM node:carbon

USER root

# Hyperledger specific runtime tools
RUN npm install -g --unsafe-perm composer-rest-server@0.19.0 composer-cli@0.19.0

RUN mkdir /src
WORKDIR /src

# Not used - Copy a slow-changing version of package.json so the npm install command doesn't have to always start from zero
# COPY package.json package.json
# RUN npm install

# Copy the source code (including newer package.json)
COPY . .
RUN npm install

CMD npm start
