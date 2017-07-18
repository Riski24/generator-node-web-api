import cleanTrace from '../utils/cleanTrace'

const DEFAULT_STATUS_CODE = 500

// This error middleware will serialize errors into JSON
// eslint-disable-next-line no-unused-vars
export default () => function errorToJson(err, req, res, next) {
  res.status(err.status || DEFAULT_STATUS_CODE)
  res.json({
    method: req.method,
    endpoint: req.originalUrl,
    statusCode: res.statusCode,
    errorCode: err.code,
    reason: err.reason,
    message: err.message,
    stack: process.env.NODE_ENV !== 'production' ? cleanTrace(err.stack) : undefined
  })
}
