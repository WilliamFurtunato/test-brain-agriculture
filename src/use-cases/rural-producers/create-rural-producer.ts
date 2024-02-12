import { RuralProducersRepository } from '@/repositories/rural-producers-repository'
import { RuralProducer } from '@prisma/client'
import { FarmWithInsufficientHectares } from '../errors/farm-with-insufficient-hectares'
import { RuralProducerAlreadyExistsError } from '../errors/rural-producer-already-exists-error'

interface CreateRuralProducerUseCaseRequest {
  document: string
  name: string
  farm_name: string
  city: string
  state: string
  total_hectares_farm: number
  arable_hectares: number
  vegetation_hectared: number
}
interface CreateRuralProducerUseCaseResponse {
  ruralProducer: RuralProducer
}

export class CreateRuralProducerUseCase {
  constructor(private ruralProducersRepository: RuralProducersRepository) {}
  async execute({
    document,
    name,
    farm_name,
    city,
    state,
    total_hectares_farm,
    arable_hectares,
    vegetation_hectared,
  }: CreateRuralProducerUseCaseRequest): Promise<CreateRuralProducerUseCaseResponse> {
    const producerWithSameDocument =
      await this.ruralProducersRepository.findByDocument(document)

    if (producerWithSameDocument) {
      throw new RuralProducerAlreadyExistsError()
    }

    const isSumArableAndVegetationGreaterThanTotal =
      arable_hectares + vegetation_hectared > total_hectares_farm
    if (isSumArableAndVegetationGreaterThanTotal) {
      throw new FarmWithInsufficientHectares()
    }
    const ruralProducer = await this.ruralProducersRepository.create({
      document,
      name,
      farm_name,
      city,
      state,
      total_hectares_farm,
      arable_hectares,
      vegetation_hectared,
    })

    return { ruralProducer }
  }
}
