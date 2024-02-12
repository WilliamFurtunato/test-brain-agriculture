import { PrismaRuralProducersRepository } from '@/repositories/prisma/prisma-rural-producers-repository'
import { DeleteRuralProducerUseCase } from '../rural-producers/delete-rural-producer'

export function makeDeleteRuralProducersUseCase() {
  const ruralProducersRepository = new PrismaRuralProducersRepository()
  const useCase = new DeleteRuralProducerUseCase(ruralProducersRepository)

  return useCase
}
