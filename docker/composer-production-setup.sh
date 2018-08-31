#!/bin/bash

#
# Script needs to be run as sudo so the removal of old data works!
#

# make sure everything is down
docker-compose -f docker-compose-prod.yaml down

#remove the old application state (mostly for the monitor database)
rm -rf .data

# prepare the explorer build by copying the fabric certificates
rm -rf explorer/crypto-config
cp -r ./fabric-orchestrator/fabric-tools/fabric-scripts/hlfv11/composer/crypto-config explorer/crypto-config

# only after the above files are copied can we build the containers!
docker-compose -f docker-compose-prod.yaml build

# create the backend container and run the deploy script only!
docker-compose -f docker-compose-prod.yaml up -d orchestrator
# a guess of how long it takes. We can't really make sure the peer servers have started & joined the network
sleep 20

docker-compose -f docker-compose-prod.yaml up --no-start backend
docker-compose -f docker-compose-prod.yaml run backend ./deploy.sh

# start the backend & import data
./add-data.sh

# initialize the explorer database
docker-compose -f docker-compose-prod.yaml up -d explorer-db
docker-compose -f docker-compose-prod.yaml up --no-start explorer
docker-compose -f docker-compose-prod.yaml run explorer ./initDb.sh

# Start everything
docker-compose -f docker-compose-prod.yaml up -d