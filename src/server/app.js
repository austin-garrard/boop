import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import { Pool } from 'pg'
import config from './config'
import { BaseApi } from './api'
import OfficesApi from './offices/api'

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

  app.use(BaseApi)
  app.use(OfficesApi)

  return app
}
