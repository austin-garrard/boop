import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'

const defaultConfig = {
  logger: logger()
}

export default function (config = defaultConfig) {
  const app = new Koa()

  if (config.logger) {
    app.use(config.logger)
  }

  app.use(bodyParser())

  // response
  app.use(ctx => {
    ctx.body = { message: 'hello' }
  })

  return app
}
