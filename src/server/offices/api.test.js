/* eslint-env jest */

import App from '../app'
import { testAgent } from '../../util/testHelper'

xdescribe('Offices API', () => {
  const agent = testAgent(() => App({
    logger: false
  }))

  describe('GET /offices', () => {
    it('shows the basic information of each office', async () => {
      const officeData = {
        name: 'New York',
        manager: 'Cool Cat',
        address: '99 Madison Ave, New York, NY 10016'
      }

      //      await createOffice(officeData)

      await agent()
        .get('/offices')
        .expect(200, {
          offices: []
        })
    })
  })
})
