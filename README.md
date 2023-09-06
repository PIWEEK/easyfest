# easyfest
EasyFest provides a simple and straightforward event/festival webpage building toolkit


## Requirements

strapi
node v18


## First steps

First, run the Strapi back end with `npm run develop`, if in local development, or `npm run build` and `npm run start` in deployments.

Once running, an Strapi admin user will need to visit the Strapi Dashboard and:
- In Content Manager, fill in every required fields in each single type collection, and **publish** them.
- In Settings, grant `find` and `findOne` permissions for each route at (Users & Permissions plugin) Roles > Public

Then, the front end can be started successfully.
Run it with `npm run dev`, if in local development, or `npm run build` and `node build/index.js` in deployments.
[More info](https://kit.svelte.dev/docs/adapter-node#deploying).
