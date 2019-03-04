import { Api, success } from '../api'

export default Api('/offices', builder => {
  builder.get('/:meep', (pathParams, queryParams) => {
    return success({ pathParams, queryParams })
  })

  builder.post('/:meep', (requestBody, pathParams, queryParams) => {
    return Promise.resolve()
      .then(() => success({ requestBody, pathParams, queryParams }))
  })
})
