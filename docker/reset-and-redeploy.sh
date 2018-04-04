#!/bin/bash

docker-compose down

cd ../server/fabric-tools
./teardownFabric.sh
./startFabric.sh

cd ../../docker

docker-compose build backend
./composer-setup.sh
