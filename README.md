
#### Configuration
------------

- Create a file `.env.local` with the following info

```bash
ELASTIC_SEARCH_USERNAME=elastic-username
ELASTIC_SEARCH_PASSWORD=elastic-password
ELASTIC_SEARCH_URL=elastic-base-username
ELASTIC_SEARCH_INDEX=ereditadellavitaitlibrary-post-1
WORDPRESS_API_ENDPOINT=https://ereditadellavita.it/library/wp-json/wp/v2
```

#### Development
------------------

- Install dependencies with `yarn install`


- Run the server with `yarn start`


#### Build for production
---------------------

```bash
yarn install
yarn build
```
