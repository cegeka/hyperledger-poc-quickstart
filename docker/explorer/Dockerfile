FROM node:6-wheezy

RUN apt-get update && apt-get install -y mysql-client gettext-base && apt-get clean

# clone latest code from github
RUN git clone --single-branch -b master --depth 1 https://github.com/hyperledger/blockchain-explorer

WORKDIR /blockchain-explorer
RUN npm install

# copy & overwrite everything - local scripts, crypt-config folder, config.json
COPY . .

# No longer required, since file is copied above
# COPY config.json /blockchain-explorer/config.json

CMD /bin/sh -c "envsubst '\$DB_USER \$DB_PASSWORD \$DB_HOST' < /blockchain-explorer/config.json.env > /blockchain-explorer/config.json && node main.js"
