# EasyFest

EasyFest provides a simple and straightforward event/festival webpage building toolkit.

## How it's made

EasyFest consists of three parts:
- [a back end](./backend/) Node.js server that acts as the content management system (CMS)
- [a front end](./frontend/) Node.js server that pre-builds the website to make it fast
- [a design file](./easyfest-design-template.penpot) made with [Penpot](https://penpot.app/) whose design tokens can be synchronized using [`penpot-export`](https://github.com/penpot/penpot-export)

Both servers run at the same time.

## Requirements & getting started

[Clone this code repository](https://docs.github.com/repositories/creating-and-managing-repositories/cloning-a-repository#about-cloning-a-repository) to your computer using git:

```sh
git clone https://github.com/PIWEEK/easyfest.git
```

Next, you need to install the Node.js JavaScript runtime. Supported Node.js versions are documented in the `package.json` file of the [back end](./backend/package.json) and the [front end](./frontend/package.json).

The expected version to be used during development is in the `.node-version` files; it's also symlinked to `.nvmrc` files for compatibility purposes.

If you're using a Node.js version manager like [nvm](https://github.com/nvm-sh/nvm) or [n](https://github.com/tj/n), you may install the expected version running `nvm use` or `n auto` in a terminal. Otherwise, check your node version manager software documentation to know how to install it.

### Bootstraping the back end

First, install the dependencies running in a terminal:

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

Then, build the Strapi back end with `npm run build` and run it with `npm run start`. This will be similar in deployments. [More info about deployments](https://docs.strapi.io/dev-docs/deployment).

Alternatively, if you want to [develop further the CMS](https://docs.strapi.io/dev-docs/quick-start) locally, run `npm run develop` instead. Note that doing so can cause changes in the code that could deviate your site code from what EasyFest provides. You're free to do it, although if anything breaks, you get to keep both pieces.

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
# (you may leave the ones starting with `PENPOT_*` as they are for now)
$EDITOR .env
```

Then, the front end can be started successfully.

Run it with `npm run dev`, if in local development, or `npm run build` and `node build/index.js` in deployments.
[More info about deployments](https://kit.svelte.dev/docs/adapter-node#deploying).

## Using EasyFest

### Filling in the content

EasyFest provides sane defaults for quickly getting the site up and running.

You can go through the CMS and edit whatever you want, but it will probably come in handy to know the most relevant parts.

In the [site single type](http://localhost:1337/admin/content-manager/singleType/api::site.site), you'll be able to edit the status of your event, and whether registrations are open.

In the [settings single type](http://localhost:1337/admin/content-manager/singleType/api::setting.setting), you can provide some global properties for the site, like the `title`, the logo of your event (`logo_horiz`), or your `social_media_links`. Switches starting with `show_*` will control the visibility of such pages; e.g. disable the Streaming page with the `show_streaming` switch if your event is face-to-face.

Use the [homepage single type](http://localhost:1337/admin/content-manager/singleType/api::homepage.homepage) to customize the homepage contents. You'll find some default texts to help you along. For `activities_section` and `speakers_section`, you'll need to fill some contents in the [activity collection type](http://localhost:1337/admin/content-manager/collectionType/api::activity.activity) and the [public-profile collection type](http://localhost:1337/admin/content-manager/collectionType/api::public-profile.public-profile).

Just make sure you click the `Save` and `Publish` buttons at the top right and refresh your browser to see the changes!

### Customizing EasyFest styles

Currently, EasyFest allows you to comfortably theme colors and typographies of your site using Penpot. To do so:

1. First, download the design template `.penpot` file from [here](./easyfest-design-template.penpot).
2. Then, open up [your Penpot instance](https://help.penpot.app/user-guide/introduction/quickstart/) in a browser and [import the file](https://help.penpot.app/user-guide/import-export/#importing-import) to your workspace.
3. Follow the guide within by navigating to the "👋 How it works" page.

When you're done, copy the URL reflected in your browser. We will use it to tell the code where to take the new tokens from. Run in a terminal:

```sh
npx penpot-export inspect <PASTE YOUR FILE URL HERE>
```

It'll output something similar to this:

```
The following details are the result of inspecting the provided URL:
    Penpot instance: https://design.penpot.app/
    Workspace id: f542b13d-6fc1-8116-8002-fc0aaa3627ae
    File id: 52961d58-0a92-80c2-8003-2fc8ab8b34dd
    Page id: 38f1e350-296d-80f1-8002-fd390f93b03d
```

Copy the indicated file id, and replace the one at your [environment variables](`.env`) with it (if you're curious, that value will end up being read by the [`penpot-export` config](./frontend/penpot-export.config.cjs)).

Finally, run `npm run sync-penpot`: the EasyFest [design tokens files](frontend/src/design-system/) for the front end will be updated.

If you were running the front end locally, you'll see the new styles right away in your browser. Ta-da!

## License

EasyFest is provided under the [Apache 2.0 license](./LICENSE), which is an open source license [approved by the Open Source Initiative](https://opensource.org/license/).
