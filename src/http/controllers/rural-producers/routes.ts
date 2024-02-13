import { FastifyInstance } from 'fastify'
import { create } from './create'
import { remove } from './remove'
import { update } from './update'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function ruralProducersRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.addHook('onRequest', verifyUserRole('ADMIN'))

  app.post('/producer', create)
  app.delete('/producer/:id', remove)
  app.put('/producer/:id', update)
}
