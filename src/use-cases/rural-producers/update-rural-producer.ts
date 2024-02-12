import { RuralProducersRepository } from '@/repositories/rural-producers-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { $Enums, RuralProducer } from '@prisma/client'

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

    const ruralProducer = await this.ruralProducersRepository.update(
      id,
      data,
      crops,
    )

    return { ruralProducer }
  }
}
