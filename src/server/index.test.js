/* eslint-env jest */

import App from './app'
import { testAgent } from '../util/testHelper'

describe('server', () => {
  const agent = testAgent(() => App({
    logger: false
  }))

  it('works', () => {
    return agent()
      .get('/')
      .expect(200, {
        message: 'this should prolly be swagger docs'
      })
  })

  it('has an offices api', () => {
    return agent()
      .get('/offices/blah')
      .query({beep: 'boop'})
      .expect(200, {
        pathParams: { meep: 'blah' },
        queryParams: { beep: 'boop' }
      })
  })

  it('has an offices api 2', () => {
    return agent()
      .post('/offices/moop')
      .send({blorp: 'morp'})
      .query({beep: 'boop'})
      .expect(200, {
        requestBody: { blorp: 'morp' },
        pathParams: { meep: 'moop' },
        queryParams: { beep: 'boop' }
      })
  })
})
