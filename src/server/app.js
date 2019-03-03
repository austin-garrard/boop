import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import { Pool } from 'pg'
import config from './config'

const defaultDependencies = {
  logger: logger(),
  db: new Pool(config.db)
}

export default function (dependencies = defaultDependencies) {
  const app = new Koa()

  if (dependencies.logger) {
    app.use(dependencies.logger)
  }

  app.use(bodyParser())

  // response
  app.use(ctx => {
    ctx.body = { message: 'hello' }
  })

  return app
}
