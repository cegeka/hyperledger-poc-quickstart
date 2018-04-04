#!/bin/bash

docker-compose up -d backend

sleep 5

docker exec -it hyper-backend npm run setup