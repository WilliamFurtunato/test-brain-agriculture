import { FarmWithInsufficientHectares } from '@/use-cases/errors/farm-with-insufficient-hectares'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { RuralProducerAlreadyExistsError } from '@/use-cases/errors/rural-producer-already-exists-error'
import { makeUpdateRuralProducersUseCase } from '@/use-cases/factories/make-update-rural-producer'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const plantedCropsSchema = z.object({
    name: z.enum(['SOYBEANS', 'CORN', 'COTTON', 'COFFEE', 'SUGARCANE']),
  })
  const updateProducersBodySchema = z.object({
    name: z.string().optional(),
    farm_name: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    total_hectares_farm: z.number().positive().optional(),
    arable_hectares: z.number().positive().optional(),
    vegetation_hectared: z.number().positive().optional(),
    crops: z.array(plantedCropsSchema).optional(),
  })

  const updateProducersParamsSchema = z.object({
    id: z.string(),
  })
  const { id } = updateProducersParamsSchema.parse(request.params)

  const updateProducer = updateProducersBodySchema.parse(request.body)

  try {
    const updateProducerUseCase = makeUpdateRuralProducersUseCase()

    const { ruralProducer } = await updateProducerUseCase.execute({
      id,
      ...updateProducer,
    })

    return reply.status(200).send({ ruralProducer })
  } catch (err) {
    if (err instanceof RuralProducerAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    if (err instanceof FarmWithInsufficientHectares) {
      return reply.status(400).send({ message: err.message })
    }

    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
