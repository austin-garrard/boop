/* eslint-env jest */

import request from 'supertest'

export function testAgent (createApp, config = {
  persistent: false
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

import { Client } from 'pg'

export function testDb (dbConfig) {
  let db

  beforeAll(async () => {
    db = new Client(dbConfig)
    await db.connect()
  })

  afterAll(async () => {
    await db.end()
  })

  return () => db
}

export function testDao (dbConfig, createDao) {
  const db = testDb(dbConfig)
  let dao

  beforeAll(async () => {
    dao = await createDao(db())
  })

  beforeEach(async () => {
    await dao.clear()
  })

  return () => dao
}
