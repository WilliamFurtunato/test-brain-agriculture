import { InMemoryRuralProducersRepository } from '@/repositories/in-memory/in-memory-rural-producers-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateRuralProducerUseCase } from './create-rural-producer'

let ruralProducerRepository: InMemoryRuralProducersRepository
let sut: CreateRuralProducerUseCase

describe('Create Producer Use Case', () => {
  beforeEach(() => {
    ruralProducerRepository = new InMemoryRuralProducersRepository()
    sut = new CreateRuralProducerUseCase(ruralProducerRepository)
  })

  it('should be able to create a producer', async () => {
    const { ruralProducer } = await sut.execute({
      document: '12345678910',
      name: 'John Doe',
      farm_name: 'John Farm',
      city: 'Sao Paulo',
      state: 'sp',
      total_hectares_farm: 10,
      arable_hectares: 5,
      vegetation_hectared: 5,
      crops: [
        { name: 'COFFEE' },
        { name: 'CORN' },
        { name: 'COTTON' },
        { name: 'SOYBEANS' },
        { name: 'SUGARCANE' },
      ],
    })
    expect(ruralProducer.id).toEqual(expect.any(String))
  })

  it('should not the sum of the arable area and vegetation must greater than total area of the farm', async () => {
    await expect(() =>
      sut.execute({
        document: '12345678910',
        name: 'John Doe',
        farm_name: 'John Farm',
        city: 'Sao Paulo',
        state: 'sp',
        total_hectares_farm: 10,
        arable_hectares: 6,
        vegetation_hectared: 5,
        crops: [{ name: 'COFFEE' }],
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to create a producer with same document twice', async () => {
    await sut.execute({
      document: '12345678910',
      name: 'John Doe',
      farm_name: 'John Farm',
      city: 'Sao Paulo',
      state: 'sp',
      total_hectares_farm: 10,
      arable_hectares: 5,
      vegetation_hectared: 5,
      crops: [{ name: 'COFFEE' }],
    })

    await expect(() =>
      sut.execute({
        document: '12345678910',
        name: 'John Doe',
        farm_name: 'John Farm',
        city: 'Sao Paulo',
        state: 'sp',
        total_hectares_farm: 10,
        arable_hectares: 5,
        vegetation_hectared: 5,
        crops: [{ name: 'COFFEE' }],
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
