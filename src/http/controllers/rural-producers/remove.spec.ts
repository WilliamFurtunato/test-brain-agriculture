import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Remove Producers (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to remove a producer', async () => {
    const { token } = await createAndAuthenticateUser(app, true)
    const createProducerResponse = await request(app.server)
      .post('/producer')
      .set('Authorization', `Bearer ${token}`)
      .send({
        document: '154.876.820-03',
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
    expect(createProducerResponse.statusCode).toEqual(201)

    const response = await request(app.server)
      .delete(`/producer/${createProducerResponse.body.ruralProducer.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
  })
})
