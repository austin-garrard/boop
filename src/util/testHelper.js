/* eslint-env jest */

import request from 'supertest'

export function testAgent (createApp, config = {
  persistent: false,
}) {
  const setup = config.persistent ? beforeAll : beforeEach
  const teardown = config.persistent ? afterAll : afterEach

  let server

  setup(() => {
    server = createApp().listen()
  })

  teardown(done => {
    server.close(() => done())
  })

  return () => request(server)
}
