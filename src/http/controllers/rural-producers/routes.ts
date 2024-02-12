import { FastifyInstance } from 'fastify'
import { create } from './create'
import { remove } from './remove'
import { update } from './update'

export async function ruralProducersRoutes(app: FastifyInstance) {
  app.post('/producer', create)
  app.delete('/producer/:id', remove)
  app.put('/producer/:id', update)
}
