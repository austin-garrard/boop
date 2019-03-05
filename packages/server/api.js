import KoaRouter from 'koa-router'
import KoaBodyParser from 'koa-bodyparser'
import KoaCompose from 'koa-compose'

export {
  RestEasy, Api, success, failure, error
}

function RestEasy (...apis) {
  return KoaCompose([
    KoaBodyParser(),
    ...apis
  ])
}

function Api (basePath, configure) {
  const builder = RouterBuilder(basePath)

  configure(builder)

  return builder.build()
}

function RouterBuilder (basePath) {
  const koaRouter = new KoaRouter({
    prefix: basePath
  })

  return {
    get: function (path, logic) {
      koaRouter.get(path, getMiddleware(logic))
    },

    post: function (path, logic) {
      koaRouter.post(path, postMiddleware(logic))
    },

    build: function () {
      return koaRouter.routes()
    }
  }
}

function getMiddleware (logic) {
  return endpointMiddleware(logic, false)
}

function postMiddleware (logic) {
  return endpointMiddleware(logic, true)
}

function endpointMiddleware (logic, provideRequestBody) {
  return async function (ctx, next) {
    const pathParams = ctx.params // from koa-router
    const queryParams = ctx.request.query // from koa
    const requestBody = ctx.request.body // from koa-bodyparser

    const params = provideRequestBody
      ? [requestBody, pathParams, queryParams, ctx]
      : [pathParams, queryParams, ctx]

    const [status, responseBody, headers] = await logic(...params)

    ctx.status = status
    ctx.body = responseBody
    ctx.set(headers)

    await next()
  }
}

function success (body, headers) {
  return response(200, body, headers)
}

function failure (body, headers) {
  return response(400, body, headers)
}

function error (body, headers) {
  return response(500, body, headers)
}

function response (statusCode, body = {}, headers = {}) {
  return [statusCode, body, headers]
}
