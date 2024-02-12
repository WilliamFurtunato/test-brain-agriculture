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

  async update(id: string, data: Prisma.RuralProducerUpdateInput) {
    const ruralProducer = await prisma.ruralProducer.update({
      where: { id },
      data,
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
}
