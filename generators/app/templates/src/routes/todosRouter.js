import { Router } from 'express'

// Uncomment this line to enforce the user is logged in
// import ensureLoggedIn from '../middleware/ensureLoggedIn'

export default function makeTodosRouter({ todosController }) {
  const router = new Router()

  // Uncomment this line to enforce the user is logged in
  // router.use(ensureLoggedIn)

  // Gets all of the Todo items
  router.get('/', todosController.list)

  // Gets a single Todo item by ID
  router.get('/:id', todosController.getById)

  // Creates a new Todo item
  router.post('/', todosController.create)

  // Updates an existing Todo item by ID
  router.put('/:id', todosController.updateById)

  // Removes an existing Todo item by ID
  router.delete('/:id', todosController.removeById)
  
  return router
}
