import { listModules } from 'awilix'
import { scopePerRequest } from 'awilix-express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import createRequest from 'http-errors'

// Custom middleware
import errorToJson from './middleware/errorToJson'
import logRequest from './middleware/logRequest'
import logError from './middleware/logError'

export default function App({ container, logger, API_HOST, API_PORT, API_PREFIX, NODE_ENV }) {
  const app = express()

  // Set app properties
  app.set('port', API_PORT || 3000)
  app.set('host', API_HOST || null)
  app.set('env', NODE_ENV || 'development')

  // Attach a scoped container to each request
  // THIS SHOULD BE BEFORE *ANY* OTHER MIDDLEWARE!
  app.use(scopePerRequest(container))

  // Add CORS, body parsing, and cookie parsing middleware
  app.use(cors())
  app.use(bodyParser.json())
  app.use(cookieParser())

  // Add custom middleware for logging requests and errors
  app.use(logRequest({ logger }))

  // Add routes - will be prefixed with /api
  const apiRoutes = listModules(['routes/**/*.js'], { cwd: __dirname })
  for (const route of apiRoutes) {
    const router = container.resolve(route.name)
    app.use(API_PREFIX, router)
  }

  // Catch-all route, defaults to a 404
  app.use((req, res, next) => {
    next(new createRequest.NotFound('Invalid API endpoint.'))
  })

  // Add error logging and handling middleware
  app.use(logError({ logger }))
  app.use(errorToJson())

  // Place any additional initialization code here

  return app
}
