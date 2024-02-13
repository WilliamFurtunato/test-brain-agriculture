import { PrismaRuralProducersRepository } from '@/repositories/prisma/prisma-rural-producers-repository'
import { GetRuralProducerUseCase } from '../rural-producers/get-rural-producer'

export function makeGetRuralProducersUseCase() {
  const ruralProducersRepository = new PrismaRuralProducersRepository()
  const useCase = new GetRuralProducerUseCase(ruralProducersRepository)

  return useCase
}
