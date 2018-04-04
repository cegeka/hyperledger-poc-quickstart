#!/bin/bash

# prepare the explorer build by copying the fabric certificates
rm -rf explorer/crypto-config
cp -r ../server/fabric-tools/fabric-scripts/hlfv11/composer/crypto-config explorer/crypto-config

# build everyting
docker-compose build

# create the backend container and run the deploy script only!
docker-compose up --no-start backend
docker-compose run backend ./deploy.sh

# start the backend & import data
# docker-compose up -d backend
# ./add-data.sh

# initialize the explorer database
docker-compose up -d explorer-db
docker-compose up --no-start explorer
docker-compose run explorer ./initDb.sh
