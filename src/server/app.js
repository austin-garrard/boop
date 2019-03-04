import Koa from 'koa'
import logger from 'koa-logger'
import { Pool } from 'pg'
import config from './config'
import { RestEasy, Api, success } from './api'
import OfficesApi from './offices/api'

const BaseApi = Api('/', builder => {
  builder.get('/', () => success({
    message: 'this should prolly be swagger docs'
  }))
})

export default function (dependencies = {
  logger: logger(),
  db: null
}) {
  const app = new Koa()

  if (dependencies.logger) {
    app.use(dependencies.logger)
  }

  app.use(RestEasy(
    BaseApi,
    OfficesApi
  ))

  return app
}
