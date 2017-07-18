import cleanTrace from '../utils/cleanTrace'

const DEFAULT_STATUS_CODE = 500

// This middleware will log each error
export default () => function logError(err, req, res, next) {
  const { logger } = req.container.cradle

  if (!logger) {
    return
  }

  const status = err.status || DEFAULT_STATUS_CODE
  const { method, originalUrl } = req
  const stackTrace = cleanTrace(err.stack)

  logger.error(`${method} ${originalUrl} ${status} (${err.message}):`, `\n${stackTrace}`)
  next(err)
}
