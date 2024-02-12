import { Prisma, RuralProducer } from '@prisma/client'
import { RuralProducersRepository } from '../rural-producers-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryRuralProducersRepository
  implements RuralProducersRepository
{
  public items: RuralProducer[] = []

  async create(data: Prisma.RuralProducerCreateInput) {
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

    return producer
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
    this.items.splice(index, 1)

    return id
  }
}
