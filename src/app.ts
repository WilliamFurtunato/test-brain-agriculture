import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { ruralProducersRoutes } from './http/controllers/rural-producers/routes'
import { metricsRoutes } from './http/controllers/metrics/routes'

export const app = fastify()

app.register(ruralProducersRoutes)
app.register(metricsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry etc.
  }
  return reply.status(500).send({ message: 'Internal server error.' })
})
