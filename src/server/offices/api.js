import { Api, success } from '../api'

export default function (dao) {
  return Api('/offices', builder => {
    builder.get('/', (pathParams, queryParams) => {
      return dao.getAll()
        .then(offices => success({ offices }))
    })
  })
}
