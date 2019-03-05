import Koa from 'koa'
import { RestEasy, Api, success } from './api'
import OfficesApi from './offices/api'

const BaseApi = Api('/', builder => {
  builder.get('/', () => success({
    message: 'this should prolly be swagger docs'
  }))
})

// TODO required vs optional deps
export default function (dependencies = {
  logger: null,
  officesDao: null
}) {
  const app = new Koa()

  if (dependencies.logger) {
    app.use(dependencies.logger)
  }

  app.use(RestEasy(
    BaseApi,
    OfficesApi(dependencies.officesDao)
  ))

  return app
}
