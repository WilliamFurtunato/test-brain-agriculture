import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Rural Producers (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a rural producer', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/producer')
      .set('Authorization', `Bearer ${token}`)
      .send({
        document: '95.775.315/0001-17',
        name: 'John Doe',
        farm_name: 'xpto farm',
        city: 'diadema',
        state: 'SP',
        total_hectares_farm: 10,
        arable_hectares: 5,
        vegetation_hectared: 3,
        crops: [
          {
            name: 'SOYBEANS',
          },
          {
            name: 'CORN',
          },
          {
            name: 'COTTON',
          },
          {
            name: 'COFFEE',
          },
          {
            name: 'SUGARCANE',
          },
        ],
      })
    expect(response.statusCode).toEqual(201)
  })
})
