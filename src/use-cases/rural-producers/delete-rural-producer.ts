import { RuralProducersRepository } from '@/repositories/rural-producers-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface DeleteRuralProducerUseCaseRequest {
  id: string
}
interface DeleteRuralProducerUseCaseResponse {
  id: string
}

export class DeleteRuralProducerUseCase {
  constructor(private ruralProducersRepository: RuralProducersRepository) {}
  async execute({
    id,
  }: DeleteRuralProducerUseCaseRequest): Promise<DeleteRuralProducerUseCaseResponse> {
    const producerExists = await this.ruralProducersRepository.findById(id)

    if (!producerExists) {
      throw new ResourceNotFoundError()
    }

    await this.ruralProducersRepository.delete(id)

    return { id }
  }
}
