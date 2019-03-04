/* eslint-env jest */

import OfficesDao from './dao'
import config from '../config'
import { testDb } from '../../util/testHelper'

describe('OfficesDao', () => {
  const db = testDb(config.db)
  
  let dao

  beforeEach(async () => {
    dao = await OfficesDao(db())
    await dao.clear()
  })

  it('stores whatever you put in lol', async () => {
    await dao.create({beep: 'boop'})

    const result = await db().query('SELECT * FROM offices')
    expect(result.rows).toEqual([{
      id: 1,
      data: { beep: 'boop' }
    }])
  })

  it('returns the new record', async () => {
    const newRecord = await dao.create({beep: 'boop'})

    expect(newRecord).toEqual({
      id: 1,
      beep: 'boop'
    })
  })

  it('updates an existing record', async () => {
    const newRecord = await dao.create({beep: 'boop'})

    await dao.update(newRecord.id, {flim: 'flam'})

    const result = await db().query('SELECT * FROM offices')
    expect(result.rows).toEqual([{
      id: 1,
      data: {
        flim: 'flam'
      }
    }])
  })
})
