import { FastifyInstance } from 'fastify'
import { create } from './create'
import { remove } from './remove'

export async function ruralProducersRoutes(app: FastifyInstance) {
  app.post('/producer', create)
  app.delete('/producer/:id', remove)
}
