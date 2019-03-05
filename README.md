# boop
Messing around with nodejs project boilerplate & configuration. WIP

## Usage
```bash
yarn install

# Server
yarn workspace server setup
yarn workspace server build
yarn workspace server start
```

## Environment variables
`NODE_ENV` determines:
  * which application configuration is exported from `packages/server/config.js`
`PORT` determines:
  * which port `server start` will run on (default 3000)
