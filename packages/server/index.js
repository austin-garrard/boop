import KoaLogger from 'koa-logger'
import config from './config'
import { Pool } from 'pg'
import OfficesDao from './offices/dao'

import App from './app'

async function createDependencies () {
  const logger = KoaLogger()
  const officesDao = await OfficesDao(new Pool(config.db))

  return {
    logger,
    officesDao
  }
}
const port = process.env.PORT || 3000

createDependencies()
  .then(deps => App(deps))
  .then(app => app.listen(port, () => {
    console.log(`Listening on ${port}`)
  }))
