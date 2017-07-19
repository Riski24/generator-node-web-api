import createError from 'http-errors'

export default () => function ensureLoggedIn(req, res, next) {
  const { user } = req.user

  if (!user) {
    return next(new createError.Forbidden('Not logged in.'))
  }
  next()
}
