import http from 'http'
// import https from 'https'

import { createContainer, Lifetime } from 'awilix'

import dotenvExtended from 'dotenv-extended'
import dotenvExpand from 'dotenv-expand'
import dotenvParseVariables from 'dotenv-parse-variables'

// Parse .env files (schema, default, and local)
let env = dotenvExtended.load({
  silent: false,
  errorOnMissing: true,
  erroronExtra: true
})
env = dotenvExpand(env)
env = dotenvParseVariables(env)

// Create dependency injection container, this is passed to every object's constructor
const container = createContainer()
  // Register constants (from .env)
  .registerValue({ ...env })
  // Autoload moduels
  .loadModules([
    'controllers/**/*.js',<% if (includeMongoDb) { %>
    'models/**/*.js',<% } %>
    'routes/**/*.js',
    'services/**/*.js',
    ['app.js', Lifetime.SINGLETON],<% if (includeMongoDb) { %>
    ['db.js', Lifetime.SINGLETON],<% } %><% if (includeSocketIo) { %>
    ['io.js', Lifetime.SINGLETON],<% } %>
    ['logger.js', Lifetime.SINGLETON],
  ], {
    cwd: __dirname,
    formatName: 'camelCase',
    registrationOptions: {
      lifetime: Lifetime.SCOPED
    }
  })

// Make container self-aware
container.registerValue({ container })

// Resolve the components from the container
const { app, logger } = container.cradle

// Create web server
// TODO: Enable HTTPS with proper SSL cert/key support
// const server = https.createServer({ key, cert }, app)
const server = http.createServer(app)

<% if (includeMongoDb) { %>const { db } = container.cradle

// Log on DB events
db.on('connected', () => { logger.info(`Connected to database (${db.name}).`) })
db.on('disconnected', () => { logger.warn(`Disconnected from database. (${db.name})`) })
db.on('error', (err) => { logger.error('Database error:', err) })<% } %>

<% if (includeSocketIo) { %>const { io } = container.cradle

// Log on Socket.io events
io.on('connect', (client) => {
  logger.debug(`Socket client '${client.id}' connected.`)
  client.on('disconnect', (reason) => {
    logger.debug(`Socket client '${client.id}' disconnected. (${reason})`)
  })
  client.on('error', (err) => {
    logger.error(`Socket client '${client.id}' error:`, err)
  })
})

// Attach Socket.io to HTTP server
io.attach(server)<% } %>

server.listen(app.get('port'), app.get('host'), () => {
  logger.info(`API server listening on port ${server.address().port}...`)<% if (includeSocketIo) { %>
  logger.info('Socket.io is enabled.')<% } %>
})
