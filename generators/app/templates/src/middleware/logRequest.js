const SUCCESS_STATUSES = [200, 201, 302]

// This middleware will log each request
export default () => function logRequest(req, res, next) {
  const { logger } = req.container.cradle

  if (!logger) {
    return
  }

  const { statusCode } = res
  const { method, originalUrl } = req

  if (SUCCESS_STATUSES.indexOf(statusCode) !== -1) {
    logger.info(`${method} ${originalUrl} ${statusCode}`)
  }
  next()
}
