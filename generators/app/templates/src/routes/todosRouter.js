import { Router } from 'express'

// import ensureLoggedIn from '../middleware/ensureLoggedIn'

export default function makeTodosRouter({ todosController }) {
  const router = new Router()

  // If you want to ensure user authentication, uncomment import and the next line
  // router.use(ensureLoggedIn)

  router.get('/api/todos', todosController.list)
  router.get('/api/todos/:id', todosController.getById)

  router.post('/api/todos', todosController.create)
  router.put('/api/todos/:id', todosController.updateById)

  router.delete('/api/todos/:id', todosController.removeById)

  return router
}
