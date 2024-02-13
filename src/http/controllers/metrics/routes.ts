import { FastifyInstance } from 'fastify'
import { get } from './get'

export async function metricsRoutes(app: FastifyInstance) {
  app.get('/metrics', get)
}
