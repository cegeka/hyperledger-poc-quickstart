# composer-startup-poc

## Environment

See <https://hyperledger.github.io/composer/installing/development-tools.html>

## Setup development environment

1. Install tools

```bash
npm install -g composer-cli
npm install -g composer-rest-server
npm install -g generator-hyperledger-composer
```

2. Start Hyperledger

In the `server/fabric-tools/` folder, run the following scripts:

```bash
./downloadFabric.sh
./startFabric.sh
./createPeerAdminCard.sh
```

3. Setup backend on development machine. Run this in the `server` folder

```bash
npm install
./deploy.sh
```

4. Install frontend application dependencies. Run this in the `client` folder

```bash
npm install
```

5. Start the backend & frontend

In the `client` folder

```bash
ng serve
```

In the `server` folder

```bash
npm start
```

6. One-time initialisation of the fabric assets. Run this in the `server` folder

```bash
npm run setup
```
