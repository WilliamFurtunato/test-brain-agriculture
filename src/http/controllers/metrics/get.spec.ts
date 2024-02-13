import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Metrics (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to get metrics', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await prisma.ruralProducer.create({
      data: {
        document: '154.876.820-03',
        name: 'John Doe One',
        farm_name: 'xpto farm one',
        city: 'sao paulo',
        state: 'SP',
        total_hectares_farm: 10,
        arable_hectares: 5,
        vegetation_hectared: 5,
        plantedCrops: {
          createMany: {
            data: [{ name: 'COFFEE' }, { name: 'CORN' }],
          },
        },
      },
      include: { plantedCrops: true },
    })
    await prisma.ruralProducer.create({
      data: {
        document: '43.848.884/0001-41',
        name: 'John Doe Two',
        farm_name: 'xpto farm Two',
        city: 'rio de janeiro',
        state: 'RJ',
        total_hectares_farm: 18,
        arable_hectares: 12,
        vegetation_hectared: 6,
        plantedCrops: {
          createMany: {
            data: [
              { name: 'COFFEE' },
              { name: 'COTTON' },
              { name: 'SOYBEANS' },
              { name: 'SUGARCANE' },
            ],
          },
        },
      },
      include: { plantedCrops: true },
    })

    const response = await request(app.server)
      .get('/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()
    expect(response.statusCode).toEqual(200)
    expect(response.body.metrics).toEqual(
      expect.objectContaining({
        totalFarms: 2,
        totalHectaresFarms: 10 + 18,
        totalState: { SP: 1, RJ: 1 },
        totalPlantesCrops: {
          COFFEE: 2,
          CORN: 1,
          SOYBEANS: 1,
          COTTON: 1,
          SUGARCANE: 1,
        },
        totalLandUse: { arable: 5 + 12, vegetation: 5 + 6 },
      }),
    )
  })
})
