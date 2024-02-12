import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPlantedCropsRepository } from '@/repositories/in-memory/in-memory-planted-crops-repository'
import { CreatePlantedCropsUseCase } from './create-planted-crops'
import { InMemoryRuralProducersRepository } from '@/repositories/in-memory/in-memory-rural-producers-repository'

let ruralProcuersRepository: InMemoryRuralProducersRepository
let plantedCropsRepository: InMemoryPlantedCropsRepository
let sut: CreatePlantedCropsUseCase

describe('Create Planted Crops Use Case', () => {
  beforeEach(() => {
    plantedCropsRepository = new InMemoryPlantedCropsRepository()
    ruralProcuersRepository = new InMemoryRuralProducersRepository()
    sut = new CreatePlantedCropsUseCase(
      plantedCropsRepository,
      ruralProcuersRepository,
    )
  })

  it('should be able to create a planted crops', async () => {
    const { id } = await ruralProcuersRepository.create({
      document: '12345678910',
      name: 'John Doe',
      farm_name: 'John Farm',
      city: 'Sao Paulo',
      state: 'sp',
      total_hectares_farm: 10,
      arable_hectares: 5,
      vegetation_hectared: 5,
    })

    const { plantedCrops } = await sut.execute({
      ruralProducerId: id,
      crops: [
        { name: 'COFFEE' },
        { name: 'CORN' },
        { name: 'COTTON' },
        { name: 'SOYBEANS' },
        { name: 'SUGARCANE' },
      ],
    })

    expect(plantedCrops).toHaveLength(5)
  })
})
