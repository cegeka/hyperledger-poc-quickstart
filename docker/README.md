# Setting up a demo Production environment

## Configure server address

In the docker folder, make sure to update the PUBLIC_URL & MONITOR_PUBLIC_URL variables in the `docker-compose.yaml` file to point to the publicly visible URL of the webserver. Anytime these 2 variables are changed, the frontend docker needs to be rebuilt (`docker-compose build frontend`) and restarted (`docker-compose down && docker-compose up -d frontend backend`).

An additional nginx can be installed locally to enable HTTPs communication on top of the http stream. If this is done, the 2 environment variables above need to be updated to use https URLs as well.

## Setup Hyperledger composer

1. Start Hyperledger Fabric

In the `server/fabric-tools/` folder, run the following scripts:

```bash
./downloadFabric.sh
./startFabric.sh
```

2. Initialize & Deploy Hyperledger Composer in Fabric

Deployment is automated via a docker-compose container. Run the following command in the `docker` folder:

```bash
./composer-setup.sh
```

The Docker container will start & auto-close once deployment is done. It will take care of registering a Peer Admin card (within the docker containers only), build the .bna file and deploy it on the Fabric network.
This will also start the monitor MySQL database and the monitoring server to initialize the database tables. 

3. Start all containers

Run the following script in the `docker` folder

```bash
docker-compose up -d
```

or just run the `./start.sh` script

4. Setup initial accounts & fabric data

Run the following script in the `docker` folder. Make sure the backend container is running

```bash
docker exec -it hyper-backend npm run setup
```

or run the `add-data.sh` script in the same folder.

## HTTPS connections

An Nginx proxy should be installed on the local machine to wrap the http port exposed by the docker compose into https.

## Exposed webservice

The NginX Docker setup exposes the following services:

* main website = `<root URL>`
* api = `<root URL>/api/`
* Api explorer = `<root URL>/explorer/` (including trailing slash!)
* Hyperledger monitor = `<root URL>:8080`
