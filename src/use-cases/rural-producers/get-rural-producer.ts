import { RuralProducersRepository } from '@/repositories/rural-producers-repository'
import { RuralProducer } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetRuralProducerUseCaseRequest {
  document: string
}
interface GetRuralProducerUseCaseResponse {
  ruralProducer: RuralProducer
}

export class GetRuralProducerUseCase {
  constructor(private ruralProducersRepository: RuralProducersRepository) {}

  async execute({
    document,
  }: GetRuralProducerUseCaseRequest): Promise<GetRuralProducerUseCaseResponse> {
    const ruralProducer = await this.ruralProducersRepository.findByDocument(
      document.replace(/\D/g, ''),
    )

    if (!ruralProducer) {
      throw new ResourceNotFoundError()
    }

    return { ruralProducer }
  }
}
