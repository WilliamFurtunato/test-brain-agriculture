import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Update Producers (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to update a producer', async () => {
    const createProducerResponse = await request(app.server)
      .post('/producer')
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
        ],
      })
    expect(createProducerResponse.statusCode).toEqual(201)

    const response = await request(app.server)
      .put(`/producer/${createProducerResponse.body.ruralProducer.id}`)
      .send({
        name: 'John Doe Second',
        crops: [
          {
            name: 'SOYBEANS',
          },
          {
            name: 'CORN',
          },
        ],
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.ruralProducer.plantedCrops).toHaveLength(2)
    expect(response.body.ruralProducer.plantedCrops).toEqual([
      expect.objectContaining({ name: 'SOYBEANS' }),
      expect.objectContaining({ name: 'CORN' }),
    ])
  })
})
