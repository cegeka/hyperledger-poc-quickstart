# Server - setup for Development environments

Setup based on <https://hyperledger.github.io/composer/tutorials/developer-tutorial>

## Start the network

`./fabric-tools/downloadFabric.sh`
`./fabric-tools/startFabric.sh`
`./fabric-tools/createPeerAdminCard.sh`

## Deploying

Run this:
`./deploy.sh`

When re-deploying recreating the admin card will fail.
Also remember to teardown the network with the script from `./fabric-tools` in order to be able to redeploy under the same chaincode name.

## Redeploy

Rebuild the archive with:
`npm run rebuild`

Redeploy to HL with:
`npm run redeploy`

## Teardown

`./fabric-tools/teardownAllDocker.sh`

## REST Server

`npm start`
