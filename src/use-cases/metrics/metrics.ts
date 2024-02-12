import { RuralProducersRepository } from '@/repositories/rural-producers-repository'

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
    const totalFarms = await this.ruralProducersRepository.countFarms()

    const totalHectaresFarms =
      await this.ruralProducersRepository.totalHectares()

    const totalState = await this.ruralProducersRepository.fetchStates()

    const totalPlantesCrops =
      await this.ruralProducersRepository.fetchPlantedCrops()

    const totalLandUse =
      await this.ruralProducersRepository.fetchArableAndVegetationHectares()

    return {
      totalFarms,
      totalHectaresFarms,
      totalState,
      totalPlantesCrops,
      totalLandUse,
    }
  }
}
