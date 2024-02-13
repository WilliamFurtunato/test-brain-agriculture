import { FastifyInstance } from 'fastify'
import { get } from './get'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function metricsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.addHook('onRequest', verifyUserRole('ADMIN'))

  app.get('/metrics', get)
}
