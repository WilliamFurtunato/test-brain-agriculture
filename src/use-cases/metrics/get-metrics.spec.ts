import { InMemoryRuralProducersRepository } from '@/repositories/in-memory/in-memory-rural-producers-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { GetMetricsUseCase } from './get-metrics'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let ruralProducerRepository: InMemoryRuralProducersRepository
let sut: GetMetricsUseCase

describe('Get Metrics Use Case', () => {
  beforeEach(() => {
    ruralProducerRepository = new InMemoryRuralProducersRepository()
    sut = new GetMetricsUseCase(ruralProducerRepository)
  })

  it('should be able to get metrics', async () => {
    await ruralProducerRepository.create(
      {
        document: '12345678910',
        name: 'John Doe Sao Paulo',
        farm_name: 'John Farm ',
        city: 'Sao Paulo',
        state: 'SP',
        total_hectares_farm: 10,
        arable_hectares: 7,
        vegetation_hectared: 3,
      },
      [{ name: 'COFFEE' }, { name: 'CORN' }],
    )
    await ruralProducerRepository.create(
      {
        document: '12345678911',
        name: 'John Doe Rio',
        farm_name: 'John Farm',
        city: 'Rio de Janeiro',
        state: 'RJ',
        total_hectares_farm: 22,
        arable_hectares: 15,
        vegetation_hectared: 7,
      },
      [{ name: 'CORN' }, { name: 'SOYBEANS' }],
    )
    await ruralProducerRepository.create(
      {
        document: '12345678910',
        name: 'John Doe Guarulhos',
        farm_name: 'John Farm',
        city: 'Guarulhos',
        state: 'SP',
        total_hectares_farm: 15,
        arable_hectares: 5,
        vegetation_hectared: 10,
      },
      [{ name: 'COTTON' }, { name: 'SUGARCANE' }],
    )

    const metrics = await sut.execute()

    expect(metrics).toEqual(
      expect.objectContaining({
        totalFarms: 3,
        totalHectaresFarms: 10 + 22 + 15,
        totalState: { SP: 2, RJ: 1 },
        totalPlantesCrops: {
          COFFEE: 1,
          CORN: 2,
          SOYBEANS: 1,
          COTTON: 1,
          SUGARCANE: 1,
        },
        totalLandUse: { arable: 7 + 15 + 5, vegetation: 3 + 7 + 10 },
      }),
    )
  })

  it('should not be able to get metrics without rural producers registered', async () => {
    await expect(() => sut.execute()).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
