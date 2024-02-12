import { $Enums, Prisma, RuralProducer } from '@prisma/client'

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
  countFarms(): Promise<number>
  totalHectares(): Promise<number>
  fetchStates(): Promise<{ [state: string]: number }>
  fetchPlantedCrops(): Promise<{ [plantedCrop: string]: number }>
  fetchArableAndVegetationHectares(): Promise<{
    arable: number
    vegetation: number
  }>
}
