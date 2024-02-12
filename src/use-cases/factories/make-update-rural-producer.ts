import { PrismaRuralProducersRepository } from '@/repositories/prisma/prisma-rural-producers-repository'
import { UpdateRuralProducerUseCase } from '../rural-producers/update-rural-producer'

export function makeUpdateRuralProducersUseCase() {
  const ruralProducersRepository = new PrismaRuralProducersRepository()
  const useCase = new UpdateRuralProducerUseCase(ruralProducersRepository)

  return useCase
}
