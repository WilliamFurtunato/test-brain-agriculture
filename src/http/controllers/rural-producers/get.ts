import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetRuralProducersUseCase } from '@/use-cases/factories/make-get-rural-producer'
import { isValidCNPJ } from '@/utils/isValidCNPJ'
import { isValidCPF } from '@/utils/isValidCPF'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const getProducersParamsSchema = z.object({
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
  })

  const { document } = getProducersParamsSchema.parse(request.params)

  try {
    const getProducerUseCase = makeGetRuralProducersUseCase()

    const producer = await getProducerUseCase.execute({ document })

    return reply.status(200).send({ producer })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
