import { expect, describe, it, beforeEach } from 'vitest'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InMemoryRuralProducersRepository } from '@/repositories/in-memory/in-memory-rural-producers-repository'
import { UpdateRuralProducerUseCase } from './update-rural-producer'
import { FarmWithInsufficientHectares } from '../errors/farm-with-insufficient-hectares'

let producersRepository: InMemoryRuralProducersRepository
let sut: UpdateRuralProducerUseCase

describe('Update Producer Use Case', () => {
  beforeEach(() => {
    producersRepository = new InMemoryRuralProducersRepository()
    sut = new UpdateRuralProducerUseCase(producersRepository)
  })

  it('should be able to update a producer', async () => {
    const producerCreateResponse = await producersRepository.create(
      {
        document: '12345678910',
        name: 'John Doe',
        farm_name: 'John Farm',
        city: 'Sao Paulo',
        state: 'sp',
        total_hectares_farm: 10,
        arable_hectares: 7,
        vegetation_hectared: 3,
      },
      [{ name: 'COFFEE' }],
    )

    const { ruralProducer } = await sut.execute({
      ...producerCreateResponse,
      name: 'Updated John',
      crops: [{ name: 'COTTON' }],
    })

    expect(ruralProducer.id).toEqual(expect.any(String))
    expect(ruralProducer.name).toEqual('Updated John')
  })

  it('should not be able to update an invalid producer', async () => {
    const producer = {
      id: 'invalid id',
      document: '12345678910',
      name: 'John Doe',
      farm_name: 'John Farm',
      city: 'Sao Paulo',
      state: 'sp',
      total_hectares_farm: 10,
      arable_hectares: 7,
      vegetation_hectared: 3,
    }

    await expect(() => sut.execute(producer)).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })

  it('should be able to update crops on rural producer', async () => {
    const producerCreateResponse = await producersRepository.create(
      {
        document: '12345678910',
        name: 'John Doe',
        farm_name: 'John Farm',
        city: 'Sao Paulo',
        state: 'sp',
        total_hectares_farm: 10,
        arable_hectares: 7,
        vegetation_hectared: 3,
      },
      [{ name: 'COFFEE' }],
    )

    const { ruralProducer } = await sut.execute({
      ...producerCreateResponse,
      name: 'Updated John',
      crops: [{ name: 'COTTON' }, { name: 'COFFEE' }],
    })

    expect(ruralProducer.id).toEqual(expect.any(String))
    expect(ruralProducer.name).toEqual('Updated John')
    expect(ruralProducer.plantedCrops).toHaveLength(2)
    expect(ruralProducer.plantedCrops).toEqual([
      expect.objectContaining({ name: 'COTTON' }),
      expect.objectContaining({ name: 'COFFEE' }),
    ])
  })

  it('should not be able to update a producer with insufficient farm area', async () => {
    const producerCreateResponse = await producersRepository.create(
      {
        document: '12345678910',
        name: 'John Doe',
        farm_name: 'John Farm',
        city: 'Sao Paulo',
        state: 'sp',
        total_hectares_farm: 10,
        arable_hectares: 7,
        vegetation_hectared: 3,
      },
      [{ name: 'COFFEE' }],
    )

    await expect(() =>
      sut.execute({
        ...producerCreateResponse,
        arable_hectares: 8,
      }),
    ).rejects.toBeInstanceOf(FarmWithInsufficientHectares)

    await expect(() =>
      sut.execute({
        ...producerCreateResponse,
        vegetation_hectared: 8,
      }),
    ).rejects.toBeInstanceOf(FarmWithInsufficientHectares)
    await expect(() =>
      sut.execute({
        ...producerCreateResponse,
        total_hectares_farm: 2,
      }),
    ).rejects.toBeInstanceOf(FarmWithInsufficientHectares)
    await expect(() =>
      sut.execute({
        ...producerCreateResponse,
        total_hectares_farm: 10,
        arable_hectares: 8,
        vegetation_hectared: 8,
      }),
    ).rejects.toBeInstanceOf(FarmWithInsufficientHectares)
  })
})
