import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetMetricsUseCase } from '@/use-cases/factories/make-get-metrics'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getMetricsUseCase = makeGetMetricsUseCase()

    const metrics = await getMetricsUseCase.execute()

    return reply.status(200).send({ metrics })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
