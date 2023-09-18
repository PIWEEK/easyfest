# easyfest

EasyFest provides a simple and straightforward event/festival webpage building toolkit

## Requirements

strapi
node v18

## First steps

EasyFest consists of two sides: [a back end](./backend/) that acts as the content management system (CMS),
and [a front end](./frontend/) that pre-builds and serves the code. **Both servers need to run at the same time.**

Supported Node.js versions are documented in each `package.json` file ([back end](./backend/package.json)
and [front end](./frontend/package.json)).

The expected version to be used during development is in the `.node-version` file; it's also symlinked to
a [`.nvmrc`](.nvmrc) file for compatibility purposes. May be used like so:

```sh
# if using nvm
nvm use

# if using n
n auto
```

Otherwise, check your node version manager software documentation to know how to use it.

### Bootstraping the back end

First, install the dependencies:

```sh
cd backend/
npm ci
```

Second, specify the [environment variables](./backend/.env.example):

```sh
# copy `.env.example` to a file called `.env`.
cp .env.example .env

# use your preferred editor to populate it according to the steps defined within
$EDITOR .env
```

Then, run the Strapi back end with `npm run develop`, if in local development, or `npm run build` and `npm run start` in deployments.

Once running, an Strapi admin user will need to visit the Strapi Dashboard and:
- In Content Manager, fill in every required fields in each single type collection, and **publish** them.
- In Settings, grant `find` and `findOne` permissions for each route at (Users & Permissions plugin) Roles > Public

> ⚠️ This will need to be re-done on each deployment.

### Starting the front end

First, install the dependencies:

```sh
cd frontend/
npm ci
```

Second, specify the [environment variables](./frontend/.env.example):

```sh
# copy `.env.example` to a file called `.env`.
cp .env.example .env

# use your preferred editor to populate it according to the steps defined within
$EDITOR .env
```

Then, the front end can be started successfully.

Run it with `npm run dev`, if in local development, or `npm run build` and `node build/index.js` in deployments.
[More info](https://kit.svelte.dev/docs/adapter-node#deploying).
