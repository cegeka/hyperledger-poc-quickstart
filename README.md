# composer-startup-poc

This template is meant as a quick-start for Hyperldger composer projects. It contains a basic backend (`server`) built on top of the standard `composer-rest-server` npm package with additional scripts to build & deploy the composer network, a quickstart front-end application (`client`) with basic user management & transaction monitoring.

The projects containts a fully self-contained Docker-compose deployment environment that can be used for production servers. For setting up a development environment, see the section below in this document.

## Customize Hyperledger composer quickstart template

### Add the Hyperledger composer code

The following Hyperledger composer files must be updated with the proper business definition:

- Data model: `server/models/com.cegeka.cto`
- Access control rules: `server/permissions.acl`
- Transaction logic: `server/lib/logic.js`
- Named Queries: `server/queries.qry`

### Change composer data initialization script

The script in `server/setup/setup.js` is meant to be ran after the composer network is started. It will create all pre-registed composer entities, like user accounts & initial assets.
Customize the javascript file to create all entities by calling the `createComposerObject()` method with the following parameters:

- objectName: Name of hyperledger composer DTO class to create
- jsonBody: Json object fully describing the properties specified in the DTO class
- logDescription: optional text to log upon successfull/failed oject creation

### Customize Frontend application

When customizing the frontend application, you can start from the following list:

- Add a custom application logo in file `client/src/styles.css` (class banner.background)
- Edit the `UserRole` enum in `client/src/app/services/user.service.ts` and add the roles used by the application. The string value of the role must match the Hyperledger Composer object name in the DTO. Also edit the `getUserRole()` method to infer the role based on user names, or replace with a different mechanism
- Create any needed home pages for the new roles and add them to the routes list (`client/src/app.routes.rs`) and modules list (`client/src/app/app.modules.ts`)
- Alter the way login redirects work, based on user roles. Change the method `login()` in the `client/src/app/pages/login/login.components.ts` class to perform redirect to the correct user-role specific routes. The other place where redirection happens automatically is in the `client/src/app/components/banner/banner.component.ts` file
- Add a new service for each Composer object specified in the DTO (except for obejcts that represent user identities) by extending the BaseResourceService class (take a look at `client/src/app/services/user.service.ts` and  `client/src/app/services/history.service.ts`). Register these services in the `client/src/app/app.modules.ts` class.
- Implement custom transaction monitoring. The `client/src/app/pages/tx-detail/tx-detail.component.ts` class is used to display details about specific transactions. This class (and the underlying `history.service.ts` file) can be customized to retrieve additional bussiness information for specific transaction types and present this to the user.

## Setup development environment

See <https://hyperledger.github.io/composer/installing/development-tools.html> as well.

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

Before running the script, comment out the `./createAdminCard.sh` line in the deploy.sh file. This is meant to execute in the Dockers only (it will replace the hyperledger rest server connection information from localhost to Docker container names)

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
npm start
```

In the `server` folder

```bash
npm start
```

6. One-time initialisation of the fabric assets. Run this in the `server` folder

```bash
npm run setup
```
