import http from 'http'
import path from 'path'

// Awilix imports
import { createContainer, asValue, asFunction, asClass } from 'awilix'
import { scopePerRequest, inject } from 'awilix-express'

// Express and middleware imports
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import socketIo from 'socket.io'

// Database imports
import mongoose from 'mongoose'

// Timing and logging imports
import Promise from 'bluebird'
import moment from 'moment'
import winston from 'winston'

// API data models
import todoSchema from './models/todo'

// API stores
import TodoStore from './stores/TodoStore'

// API controllers

// API routes

// Custom middleware
import errorToJson from './middleware/errorToJson'
import logRequest from './middleware/logRequest'
import logError from './middleware/logError'

// Utils
import cleanTrace from './utils/cleanTrace'

const TIMESTAMP_FORMAT = 'HH:mm:ss.SSS'
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

// Replace mongoose Promise with Bluebird library
mongoose.Promise = require('bluebird')

// Initialize the shared logger
const logger = new winston.Logger()
  .add(winston.transports.Console, {
    timestamp: () => `[${moment().format(TIMESTAMP_FORMAT)}]`,
    colorize: true,
    prettyPrint: true,
    level: IS_PRODUCTION ? 'info' : 'debug'
  })

// Initialize the Express app and server
const app = express()
const server = http.createServer(app)

// Initialize the Mongo DB connection
const db = mongoose.createConnection(process.env.DB_CONNECTION_STRING)

// Initialize the Socket.io service
const io = socketIo(server)

// Set app properties
app.set('port', process.env.PORT || 3000)
app.set('host', process.env.HOST || null)
app.set('env', process.env.NODE_ENV || 'development')

// Create dependency injection container, this is passed to every object's constructor
const container = createContainer()
  // Register constants
  .register({
    DB_CONNECTION_STRING: asValue(process.env.DB_CONNECTION_STRING),
    HOST: asValue(process.env.HOST),
    PORT: asValue(process.env.PORT)
  })
  // Register app, db, and logger instances
  .register({
    app: asValue(app),
    db: asValue(db),
    io: asValue(io),
    logger: asValue(logger)
  })
  // Register models
  .register({
    todoSchema: asValue(todoSchema)
  })
  // Register stores
  .register({
    todoStore: asClass(TodoStore).scoped()
  })
  // Register controllers
  .register({

  })
  // Register routes
  .register({

  })

// Attach a scoped container to each request
// THIS SHOULD BE BEFORE *ANY* OTHER MIDDLEWARE!
app.use(scopePerRequest(container))

// Add CORS, body parsing, and cookie parsing middleware
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

// Add custom middleware for logging requests and errors
app.use(logRequest())

// Initialize API routes

// Add error logging and handling middleware
app.use(logError())
app.use(errorToJson())

// Log DB events
db.on('connected', () => {
  logger.info(`Connected to database (${db.name}).`)
})
db.on('disconnected', () => {
  logger.warn('Disconnected from database.')
})
db.on('error', (err) => {
  logger.error('Database error:', err)
})

// Log socket.io clients
io.on('connect', (client) => {
  logger.debug(`Socket client '${client.id}' connected.`)
  client.on('disconnect', (reason) => {
    logger.debug(`Socket client '${client.id}' disconnected. (${reason})`)
  })
  client.on('error', (err) => {
    logger.error(`Socket client '${client.id}' error:`, err)
  })
})

// TODO: Enable HTTPS with proper SSL cert/key support
server.listen(app.get('port'), app.get('host'), () => {
  logger.info(`Web server listening on port ${server.address().port}...`)
})
