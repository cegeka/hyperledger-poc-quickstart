#!/bin/bash

# Set Fabric version
export FABRIC_VERSION=hlfv11

# Create the admin certificate card, adapted for Dockerized Fabric use
./createAdminCard.sh

# Make sure dependencies are here
npm install

# Creates .bna archive and installs deps
npm run build-bna

# Installs composer runtime
npm run runtime-install

# Deploy chaincode
npm run deploy

# Import admin card
npm run admin-card

# Check connection
npm run ping
