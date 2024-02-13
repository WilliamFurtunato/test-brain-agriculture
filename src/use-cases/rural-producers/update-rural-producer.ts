import { RuralProducersRepository } from '@/repositories/rural-producers-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { $Enums, RuralProducer } from '@prisma/client'
import { FarmWithInsufficientHectares } from '../errors/farm-with-insufficient-hectares'

interface UpdateRuralProducerUseCaseRequest {
  id: string
  name?: string
  farm_name?: string
  city?: string
  state?: string
  total_hectares_farm?: number
  arable_hectares?: number
  vegetation_hectared?: number
  crops?: { name: $Enums.Crops }[]
}

interface UpdateRuralProducerUseCaseResponse {
  ruralProducer: RuralProducer
}

export class UpdateRuralProducerUseCase {
  constructor(private ruralProducersRepository: RuralProducersRepository) {}
  async execute({
    id,
    crops,
    ...data
  }: UpdateRuralProducerUseCaseRequest): Promise<UpdateRuralProducerUseCaseResponse> {
    const producerExists = await this.ruralProducersRepository.findById(id)

    if (!producerExists) {
      throw new ResourceNotFoundError()
    }

    const arableHectares =
      data.arable_hectares ?? producerExists.arable_hectares
    const vegetationHectares =
      data.vegetation_hectared ?? producerExists.vegetation_hectared
    const totalHectares =
      data.total_hectares_farm ?? producerExists.total_hectares_farm

    const isSumArableAndVegetationGreaterThanTotal =
      arableHectares + vegetationHectares > totalHectares
    if (isSumArableAndVegetationGreaterThanTotal) {
      throw new FarmWithInsufficientHectares()
    }

    const ruralProducer = await this.ruralProducersRepository.update(
      id,
      data,
      crops,
    )

    return { ruralProducer }
  }
}
