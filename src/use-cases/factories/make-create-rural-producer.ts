import { PrismaRuralProducersRepository } from '@/repositories/prisma/prisma-rural-producers-repository'
import { CreateRuralProducerUseCase } from '../rural-producers/create-rural-producer'

export function makeCreateRuralProducersUseCase() {
  const ruralProducersRepository = new PrismaRuralProducersRepository()
  const useCase = new CreateRuralProducerUseCase(ruralProducersRepository)

  return useCase
}
