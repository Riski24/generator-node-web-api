import createError from 'http-errors'

export default class TodosController {

  constructor({ todoStore }) {
    this.todoStore = todoStore
  }

  // Gets a list of all Todo items
  list = async (req, res, next) => {
    try {
      const todos = await this.todoStore.find()
      res.json(todos)
    } catch (err) { next(err) }
  }

  // Gets a single Todo item by ID
  getById = async (req, res, next) => {
    try {
      const id = req.params.id
      const todo = await this.todoStore.findById(id)

      // Ensure Todo item exists
      if (!todo) {
        return next(new createError.NotFound('Todo not found.'))
      }

      res.json(todo)
    } catch (err) { next(err) }
  }

  // Creates a new Todo item
  create = async (req, res, next) => {
    try {
      const { title } = req.body

      // Ensure title exists and is not blank
      if (typeof title !== 'string' || !title.trim()) {
        return next(new createError.BadRequest('Title is required.'))
      }

      const todo = await this.todoStore.create({ title })
      res.status(201).json(todo)
    } catch (err) { next(err) }
  }

  // Updates an existing Todo item by ID
  updateById = async (req, res, next) => {
    try {
      const id = req.params.id
      const todo = await this.todoStore.findById(id)

      // Ensure Todo item exists
      if (!todo) {
        return next(new createError.NotFound('Todo not found.'))
      }

      const { title, isCompleted } = req.body

      // Update the title
      if (typeof title === 'string') {
        todo.title = title
      }

      // Update the completed status
      if (typeof isCompleted === 'boolean') {
        todo.isCompleted = isCompleted
      }

      const updatedTodo = await this.todoStore.update(todo)
      res.json(updatedTodo)
    } catch (err) { next(err) }
  }

  // Removes an existing Todo item by ID
  removeById = async (req, res, next) => {
    try {
      const id = req.params.id
      const todo = await this.todoStore.findById(id)

      // Ensure Todo item exists
      if (!todo) {
        return next(new createError.NotFound('Todo not found.'))
      }

      const removedTodo = await this.todoStore.remove(todo)
      res.json(removedTodo)
    } catch (err) { next(err) }
  }
}
