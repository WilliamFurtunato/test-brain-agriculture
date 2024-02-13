import { $Enums, PlantedCrops, Prisma, RuralProducer } from '@prisma/client'

export interface RuralProducersRepository {
  create(
    data: Prisma.RuralProducerCreateWithoutPlantedCropsInput,
    crops: { name: $Enums.Crops }[],
  ): Promise<RuralProducer>
  findByDocument(document: string): Promise<RuralProducer | null>
  findById(id: string): Promise<RuralProducer | null>
  delete(id: string): Promise<string>
  update(
    id: string,
    data: Prisma.RuralProducerUpdateInput,
    crops?: { name: $Enums.Crops }[],
  ): Promise<RuralProducer>
  fetchPlantedCrops(): Promise<PlantedCrops[] | null>
  fetchRuralProducers(): Promise<RuralProducer[] | null>
}
