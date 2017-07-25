const SUCCESS_STATUSES = [200, 201, 302]

// This middleware will log each request
export default ({ logger }) => function logRequest(req, res, next) {
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
