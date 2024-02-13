import { $Enums, PlantedCrops, Prisma, RuralProducer } from '@prisma/client'
import { RuralProducersRepository } from '../rural-producers-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryRuralProducersRepository
  implements RuralProducersRepository
{
  public items: RuralProducer[] = []
  public plantedCrops: PlantedCrops[] = []

  async create(
    data: Prisma.RuralProducerCreateWithoutPlantedCropsInput,
    crops: { name: $Enums.Crops }[],
  ) {
    const producer: RuralProducer = {
      id: randomUUID(),
      name: data.name,
      farm_name: data.farm_name,
      document: data.document,
      state: data.state,
      arable_hectares: data.arable_hectares,
      city: data.city,
      total_hectares_farm: data.total_hectares_farm,
      vegetation_hectared: data.vegetation_hectared,
      created_at: new Date(),
      updated_at: data.updated_at ? new Date(data.updated_at) : null,
    }

    this.items.push(producer)

    const plantedCrops = crops?.map((crop) => {
      const plantedCrop = {
        id: randomUUID(),
        name: crop.name,
        ruralProducerId: producer.id,
      }
      return plantedCrop
    })

    plantedCrops && this.plantedCrops.push(...plantedCrops)

    return { ...producer, plantedCrops }
  }

  async findByDocument(document: string) {
    const ruralProducer = this.items.find((item) => item.document === document)

    if (!ruralProducer) {
      return null
    }

    return ruralProducer
  }

  async findById(id: string) {
    const ruralProducer = this.items.find((item) => item.id === id)

    if (!ruralProducer) {
      return null
    }

    return ruralProducer
  }

  async delete(id: string) {
    const index = this.items.findIndex((item) => item.id === id)

    if (index >= 0) {
      this.items.splice(index, 1)
    }

    const crops = this.plantedCrops.filter(
      (crop) => crop.ruralProducerId !== id,
    )

    this.plantedCrops = crops

    return id
  }

  async update(
    id: string,
    data: Prisma.RuralProducerUpdateInput,
    crops?: { name: $Enums.Crops }[],
  ) {
    const index = this.items.findIndex((item) => item.id === id)

    if (index >= 0) {
      this.items[index] = {
        id,
        name: data.name?.toString() ?? this.items[index].name,
        farm_name: data.farm_name?.toString() ?? this.items[index].farm_name,
        document: data.document?.toString() ?? this.items[index].document,
        state: data.state?.toString() ?? this.items[index].state,
        arable_hectares:
          Number(data.arable_hectares?.toString()) ??
          this.items[index].arable_hectares,
        city: data.city?.toString() ?? this.items[index].city,
        total_hectares_farm:
          Number(data.total_hectares_farm?.toString()) ??
          this.items[index].total_hectares_farm,
        vegetation_hectared:
          Number(data.vegetation_hectared?.toString()) ??
          this.items[index].vegetation_hectared,
        created_at: this.items[index].created_at,
        updated_at: data.updated_at
          ? new Date(data.updated_at.toString())
          : null,
      }
    }

    if (crops) {
      this.plantedCrops = this.plantedCrops.filter(
        (plantedCrop) => plantedCrop.ruralProducerId !== id,
      )

      const updatedPlantedCrops = crops.map((crop) => {
        const plantedCrop = {
          id: randomUUID(),
          name: crop.name,
          ruralProducerId: id,
        }
        return plantedCrop
      })

      updatedPlantedCrops && this.plantedCrops.push(...updatedPlantedCrops)
    }

    const plantedCrops = this.plantedCrops.filter(
      (plantedCrop) => plantedCrop.ruralProducerId === id,
    )

    return {
      ...this.items[index],
      plantedCrops,
    }
  }

  async fetchPlantedCrops() {
    const plantedCrops = this.plantedCrops

    return plantedCrops
  }

  async fetchArableAndVegetationHectares() {
    return this.items.reduce(
      (acc: { arable: number; vegetation: number }, ruralProducer) => {
        acc.arable += ruralProducer.arable_hectares
        acc.vegetation += ruralProducer.vegetation_hectared
        return acc
      },
      { arable: 0, vegetation: 0 },
    )
  }

  async fetchRuralProducers() {
    const ruralProducers = this.items.map((item) => {
      const ruralProducer = {
        ...item,
        plantedCrops: this.plantedCrops.filter(
          (plantedCrop) => plantedCrop.ruralProducerId === item.id,
        ),
      }

      return ruralProducer
    })

    if (ruralProducers.length <= 0) {
      return null
    }

    return ruralProducers
  }
}
