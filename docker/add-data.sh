#!/bin/bash

docker-compose up -d backend

docker exec -it hyper-backend npm run setup