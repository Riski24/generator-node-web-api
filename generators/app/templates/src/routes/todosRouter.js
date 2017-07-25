import { Router } from 'express'

export default function makeTodosRouter({ todosController }) {
  const router = new Router()

  // If you want to ensure user authentication, uncomment import and the next line
  // router.use(authenticate)

  router.get('/todos', todosController.list)
  router.get('/todos/:id', todosController.getById)

  router.post('/todos', todosController.create)
  router.put('/todos/:id', todosController.updateById)

  router.delete('/todos/:id', todosController.removeById)

  return router
}
