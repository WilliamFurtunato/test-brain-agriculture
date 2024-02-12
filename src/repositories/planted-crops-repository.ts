import { PlantedCrops, Prisma } from '@prisma/client'

export interface PlantedCropsRepository {
  create(
    ruralProducerId: string,
    data: Prisma.PlantedCropsUncheckedCreateWithoutProducerInput[],
  ): Promise<PlantedCrops[]>
}
