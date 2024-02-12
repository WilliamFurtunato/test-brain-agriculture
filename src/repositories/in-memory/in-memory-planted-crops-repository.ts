import { Prisma, PlantedCrops } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PlantedCropsRepository } from '../planted-crops-repository'

export class InMemoryPlantedCropsRepository implements PlantedCropsRepository {
  public items: PlantedCrops[] = []

  async create(
    ruralProducerId: string,
    data: Prisma.PlantedCropsUncheckedCreateWithoutProducerInput[],
  ) {
    const crops = data.map((crop) => {
      const plantedCrops = {
        id: randomUUID(),
        name: crop.name,
        ruralProducerId,
      }

      return plantedCrops
    })

    this.items.push(...crops)

    return crops
  }
}
