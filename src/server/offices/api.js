import { Api, success } from '../api'

export default function (dao) {
  return Api('/offices', builder => {
    builder.get('/', () => {
      return dao.getAll()
        .then(offices => success({ offices }))
    })

    builder.post('/', requestBody => {
      return dao.create(requestBody)
        .then(office => success({ office }))
    })
  })
}
