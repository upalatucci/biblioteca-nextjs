

#### Requirements

- Install [Node](https://nodejs.org/it/download/)
- Install [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)


#### Configuration
------------

- Create a file `.env.local` with the following info

```bash
ELASTIC_SEARCH_USERNAME=elastic
ELASTIC_SEARCH_PASSWORD=password
ELASTIC_SEARCH_URL=https://sd.sgi-italia.org:8881
ELASTIC_SEARCH_INDEX=bibliotecasgiitaliaorgsite-post-1
WORDPRESS_API_ENDPOINT=https://biblioteca.sgi-italia.org/wp-json/wp/v2
```

#### Development
------------------

- Install dependencies with `yarn install`


- Run the server with `yarn dev`


#### Build for production
---------------------

```bash
yarn install
yarn build
```
