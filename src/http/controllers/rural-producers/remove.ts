import { FarmWithInsufficientHectares } from '@/use-cases/errors/farm-with-insufficient-hectares'
import { RuralProducerAlreadyExistsError } from '@/use-cases/errors/rural-producer-already-exists-error'
import { makeDeleteRuralProducersUseCase } from '@/use-cases/factories/make-delete-rural-producer'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const createProducersParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = createProducersParamsSchema.parse(request.params)

  try {
    const deleteProducerUseCase = makeDeleteRuralProducersUseCase()

    const producer = await deleteProducerUseCase.execute({ id })

    return reply.status(200).send({ producer })
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
