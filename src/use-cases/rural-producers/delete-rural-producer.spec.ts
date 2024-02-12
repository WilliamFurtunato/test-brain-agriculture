import { expect, describe, it, beforeEach } from 'vitest'

import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { InMemoryRuralProducersRepository } from '@/repositories/in-memory/in-memory-rural-producers-repository'
import { DeleteRuralProducerUseCase } from './delete-rural-producer'

let producersRepository: InMemoryRuralProducersRepository
let sut: DeleteRuralProducerUseCase

describe('Delete Producer Use Case', () => {
  beforeEach(() => {
    producersRepository = new InMemoryRuralProducersRepository()
    sut = new DeleteRuralProducerUseCase(producersRepository)
  })

  it('should be able to delete a producer', async () => {
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

    const { id } = await sut.execute({ id: producerCreateResponse.id })

    expect(id).toEqual(producerCreateResponse.id)
  })

  it('should not be able to delete an invalid producer', async () => {
    await expect(() =>
      sut.execute({ id: 'invalid id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
