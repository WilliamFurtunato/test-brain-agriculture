import { expect, describe, it, beforeEach } from 'vitest'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InMemoryRuralProducersRepository } from '@/repositories/in-memory/in-memory-rural-producers-repository'
import { UpdateRuralProducerUseCase } from './update-rural-producer'

let producersRepository: InMemoryRuralProducersRepository
let sut: UpdateRuralProducerUseCase

describe('Update Producer Use Case', () => {
  beforeEach(() => {
    producersRepository = new InMemoryRuralProducersRepository()
    sut = new UpdateRuralProducerUseCase(producersRepository)
  })

  it('should be able to update a producer', async () => {
    const producerCreateResponse = await producersRepository.create({
      document: '12345678910',
      name: 'John Doe',
      farm_name: 'John Farm',
      city: 'Sao Paulo',
      state: 'sp',
      total_hectares_farm: 10,
      arable_hectares: 7,
      vegetation_hectared: 3,
    })

    const { ruralProducer } = await sut.execute({
      ...producerCreateResponse,
      name: 'Updated John',
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
})
