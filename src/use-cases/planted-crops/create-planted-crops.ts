import { $Enums, PlantedCrops } from '@prisma/client'
import { PlantedCropsRepository } from '@/repositories/planted-crops-repository'
import { RuralProducersRepository } from '@/repositories/rural-producers-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface CreatePlantedCropsUseCaseRequest {
  ruralProducerId: string
  crops: { name: $Enums.Crops }[]
}
interface CreatePlantedCropsUseCaseResponse {
  plantedCrops: PlantedCrops[]
}

export class CreatePlantedCropsUseCase {
  constructor(
    private plantedCropsRepository: PlantedCropsRepository,
    private ruralProducerRepository: RuralProducersRepository,
  ) {}

  async execute({
    crops,
    ruralProducerId,
  }: CreatePlantedCropsUseCaseRequest): Promise<CreatePlantedCropsUseCaseResponse> {
    const ruralProducerExists =
      await this.ruralProducerRepository.findById(ruralProducerId)

    if (!ruralProducerExists) {
      throw new ResourceNotFoundError()
    }

    const plantedCrops = await this.plantedCropsRepository.create(
      ruralProducerId,
      crops,
    )

    return { plantedCrops }
  }
}
