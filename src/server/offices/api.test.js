/* eslint-env jest */

import config from '../config'
import App from '../app'
import { testAgent, testDao } from '../../util/testHelper'
import OfficesDao from './dao'

describe('Offices API', () => {
  const officesDao = testDao(config.db, OfficesDao)

  const agent = testAgent(() => App({
    logger: false,
    officesDao: officesDao()
  }))

  describe('GET /offices', () => {
    it('shows the basic information of each office', async () => {
      const officeData = {
        name: 'New York',
        manager: 'Cool Cat',
        address: '99 Madison Ave, New York, NY 10016'
      }

      await officesDao().create(officeData)

      await agent()
        .get('/offices')
        .expect(200, {
          offices: [{
            id: 1,
            ...officeData
          }]
        })
    })
  })
})
