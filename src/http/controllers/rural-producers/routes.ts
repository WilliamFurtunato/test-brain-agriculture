import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function ruralProducersRoutes(app: FastifyInstance) {
  app.post('/producer', create)
}
