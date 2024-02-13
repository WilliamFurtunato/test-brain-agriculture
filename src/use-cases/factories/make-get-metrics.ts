import { PrismaRuralProducersRepository } from '@/repositories/prisma/prisma-rural-producers-repository'
import { GetMetricsUseCase } from '../metrics/get-metrics'

export function makeGetMetricsUseCase() {
  const ruralProducersRepository = new PrismaRuralProducersRepository()
  const useCase = new GetMetricsUseCase(ruralProducersRepository)

  return useCase
}
