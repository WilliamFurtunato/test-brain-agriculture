import { Prisma, RuralProducer } from '@prisma/client'

export interface RuralProducersRepository {
  create(data: Prisma.RuralProducerCreateInput): Promise<RuralProducer>
  findByDocument(document: string): Promise<RuralProducer | null>
  findById(id: string): Promise<RuralProducer | null>
  delete(id: string): Promise<string>
}
