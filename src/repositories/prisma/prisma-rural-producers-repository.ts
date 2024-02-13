import { $Enums, Prisma } from '@prisma/client'
import { RuralProducersRepository } from '../rural-producers-repository'
import { prisma } from '@/lib/prisma'

export class PrismaRuralProducersRepository
  implements RuralProducersRepository
{
  async create(
    data: Prisma.RuralProducerCreateInput,
    crops: { name: $Enums.Crops }[],
  ) {
    const producer = await prisma.ruralProducer.create({
      data: {
        ...data,
        plantedCrops: {
          createMany: {
            data: crops,
          },
        },
      },
      include: { plantedCrops: true },
    })

    return producer
  }

  async delete(id: string) {
    await prisma.ruralProducer.delete({
      where: {
        id,
      },
    })

    return id
  }

  async update(
    id: string,
    data: Prisma.RuralProducerUpdateInput,
    crops?: { name: $Enums.Crops }[],
  ) {
    let plantedCropsToAdd: { name: $Enums.Crops }[] = []

    if (crops) {
      const currentPlantedCrops = await prisma.ruralProducer.findUnique({
        where: { id },
        select: { plantedCrops: true },
      })

      //  **  remove init **
      const plantedCropsToRemove = currentPlantedCrops?.plantedCrops.filter(
        (plantedCrop) => {
          return !crops.some((crop) => crop.name === plantedCrop.name)
        },
      )
      plantedCropsToRemove &&
        (await Promise.all(
          plantedCropsToRemove.map(async (plantedCrop) => {
            await prisma.plantedCrops.delete({
              where: { id: plantedCrop.id },
            })
          }),
        ))

      //  **  remove end **

      plantedCropsToAdd = crops.filter((crop) => {
        return !currentPlantedCrops?.plantedCrops.some(
          (plantedCrop) => plantedCrop.name === crop.name,
        )
      })
    }

    const ruralProducer = await prisma.ruralProducer.update({
      where: { id },
      data: {
        ...data,
        plantedCrops: {
          createMany: {
            data: plantedCropsToAdd,
          },
        },
      },
      include: { plantedCrops: true },
    })

    return ruralProducer
  }

  async findByDocument(document: string) {
    const ruralProducer = await prisma.ruralProducer.findUnique({
      where: { document },
    })

    return ruralProducer
  }

  async findById(id: string) {
    const ruralProducer = await prisma.ruralProducer.findUnique({
      where: { id },
    })

    return ruralProducer
  }

  async countFarms() {
    const farms = await prisma.ruralProducer.count()

    return farms
  }

  async fetchStates() {
    const sta
  }
}
