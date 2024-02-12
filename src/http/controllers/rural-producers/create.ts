import { FarmWithInsufficientHectares } from '@/use-cases/errors/farm-with-insufficient-hectares'
import { RuralProducerAlreadyExistsError } from '@/use-cases/errors/rural-producer-already-exists-error'
import { makeCreateRuralProducersUseCase } from '@/use-cases/factories/make-create-rural-producer'
import { isValidCNPJ } from '@/utils/isValidCNPJ'
import { isValidCPF } from '@/utils/isValidCPF'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const plantedCropsSchema = z.object({
    name: z.enum(['SOYBEANS', 'CORN', 'COTTON', 'COFFEE', 'SUGARCANE']),
  })

  const createProducersBodySchema = z.object({
    document: z.string().refine((value) => {
      const cleanedDocument = value.replace(/\D/g, '')

      if (cleanedDocument.length === 11) {
        return isValidCPF(value)
      }

      if (cleanedDocument.length === 14) {
        return isValidCNPJ(value)
      }

      return false
    }, 'Invalid Document'),
    name: z.string(),
    farm_name: z.string(),
    city: z.string(),
    state: z.string(),
    total_hectares_farm: z.number().positive(),
    arable_hectares: z.number().positive(),
    vegetation_hectared: z.number().positive(),
    crops: z.array(plantedCropsSchema),
  })

  const createRuralProducer = createProducersBodySchema.parse(request.body)

  try {
    const createRuralProducerUseCase = makeCreateRuralProducersUseCase()

    const { ruralProducer } =
      await createRuralProducerUseCase.execute(createRuralProducer)

    return reply.status(201).send({ ruralProducer })
  } catch (err) {
    if (err instanceof RuralProducerAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    if (err instanceof FarmWithInsufficientHectares) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
