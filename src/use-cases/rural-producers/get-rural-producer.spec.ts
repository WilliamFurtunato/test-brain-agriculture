import { expect, describe, it, beforeEach } from 'vitest'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InMemoryRuralProducersRepository } from '@/repositories/in-memory/in-memory-rural-producers-repository'
import { GetRuralProducerUseCase } from './get-rural-producer'

let producersRepository: InMemoryRuralProducersRepository
let sut: GetRuralProducerUseCase

describe('Get Producer Use Case', () => {
  beforeEach(() => {
    producersRepository = new InMemoryRuralProducersRepository()
    sut = new GetRuralProducerUseCase(producersRepository)
  })

  it('should be able to get a producer', async () => {
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
      document: producerCreateResponse.document,
    })

    expect(ruralProducer.id).toEqual(expect.any(String))
  })

  it('should not be able to get an invalid producer', async () => {
    await expect(() =>
      sut.execute({ document: 'invalid doc' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
