import Koa from 'koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import route from 'koa-route'

const app = new Koa()

app.use(logger())
app.use(bodyParser())

// response
app.use(ctx => {
  console.log(ctx.request.body)
  ctx.body = 'Hello Koa'
})

app.listen(3000)
