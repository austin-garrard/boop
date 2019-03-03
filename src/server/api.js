import Router from 'koa-router'

export {
  BaseApi, Api, success, failure, error
}

const BaseApi = Api('/', builder => {
  builder.get('/', () => success({ message: 'this should prolly be swagger docs' }))
})

function Api(basePath, configure) {
  const builder = RouterBuilder(basePath)

  configure(builder)

  return builder.build()
}

function RouterBuilder (basePath) {
  const koaRouter = new Router({
    prefix: basePath
  })

  return {
    get: function (path, logic) {
      koaRouter.get(path, getMiddleware(logic))
    },

    post: function (path, logic) {
      koaRouter.post(path, postMiddleware(logic))
    },

    build: function() {
      return koaRouter.routes()
    }
  }
}

// TODO extract common middleware function
function getMiddleware (logic) {
  return async function (ctx, next) {
    const pathParams = ctx.params // from koa-router
    const queryParams = ctx.request.query // from koa

    const [status, responseBody] = await logic(pathParams, queryParams, ctx)

    ctx.status = status
    ctx.body = responseBody

    await next()
  }
}

function postMiddleware (logic) {
  return async function (ctx, next) {
    const pathParams = ctx.params // from koa-router
    const queryParams = ctx.request.query // from koa
    const requestBody = ctx.request.body // from koa-bodyparser

    const [status, responseBody] = await logic(requestBody, pathParams, queryParams, ctx)

    ctx.status = status
    ctx.body = responseBody

    await next()
  }
}

function success (body) {
  return [200, body]
}

function failure (body) {
  return [400, body]
}

function error (body) {
  return [500, body]
}
