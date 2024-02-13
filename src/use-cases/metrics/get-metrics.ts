import { RuralProducersRepository } from '@/repositories/rural-producers-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetMetricsUseCaseResponse {
  totalFarms: number
  totalHectaresFarms: number
  totalState: { [state: string]: number } // TODO - validar
  totalPlantesCrops: { [plantedCrops: string]: number } // TODO - validar
  totalLandUse: { arable: number; vegetation: number }
}

export class GetMetricsUseCase {
  constructor(private ruralProducersRepository: RuralProducersRepository) {}

  async execute(): Promise<GetMetricsUseCaseResponse> {
    const ruralProducers =
      await this.ruralProducersRepository.fetchRuralProducers()

    if (!ruralProducers) {
      throw new ResourceNotFoundError()
    }

    const totalFarms = ruralProducers.length

    const totalHectaresFarms = ruralProducers.reduce((acc, ruralProducer) => {
      return (acc += ruralProducer.total_hectares_farm)
    }, 0)

    const totalState = ruralProducers.reduce(
      (acc: { [state: string]: number }, curr) => {
        acc[curr.state] = (acc[curr.state] || 0) + 1
        return acc
      },
      {},
    )

    const plantedCrops = await this.ruralProducersRepository.fetchPlantedCrops()

    if (!plantedCrops) {
      throw new ResourceNotFoundError()
    }
    const totalPlantesCrops = plantedCrops.reduce(
      (acc: { [plantedCrop: string]: number }, curr) => {
        acc[curr.name] = (acc[curr.name] || 0) + 1
        return acc
      },
      {},
    )

    const totalLandUse = ruralProducers.reduce(
      (acc: { arable: number; vegetation: number }, ruralProducer) => {
        acc.arable += ruralProducer.arable_hectares
        acc.vegetation += ruralProducer.vegetation_hectared
        return acc
      },
      { arable: 0, vegetation: 0 },
    )

    return {
      totalFarms,
      totalHectaresFarms,
      totalState,
      totalPlantesCrops,
      totalLandUse,
    }
  }
}
