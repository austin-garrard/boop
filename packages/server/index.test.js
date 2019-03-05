/* eslint-env jest */

import App from './app'
import { testAgent } from './testHelper'

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
})
