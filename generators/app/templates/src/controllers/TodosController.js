import createError from 'http-errors'

export default class TodosController {
  constructor({ todoService }) {
    this.todoService = todoService
  }

  list = async (req, res, next) => {
    try {
      const todos = await this.todoService.find()

      res.json(todos)
    } catch (err) { next(err) }
  }

  getById = async (req, res, next) => {
    try {
      const todo = await this.todoService.findById(req.params.id)
      if (!todo) {
        return next(new createError.NotFound('Todo not found.'))
      }

      res.json(todo)
    } catch (err) { next(err) }
  }

  create = async (req, res, next) => {
    try {
      const { title, isCompleted } = req.body
      const todo = await this.todoService.create({ title, isCompleted })

      res.status(201).json(todo)
    } catch (err) { next(err) }
  }

  updateById = async (req, res, next) => {
    try {
      const todo = await this.todoService.findById(req.params.id)
      if (!todo) {
        return next(new createError.NotFound('Todo not found.'))
      }

      const { title, isCompleted } = req.body
      if (typeof title === 'string') {
        todo.title = title
      }
      if (typeof isCompleted === 'boolean') {
        todo.isCompleted = isCompleted
      }

      const updatedTodo = await this.todoService.update(todo)
      res.json(updatedTodo)
    } catch (err) { next(err) }
  }

  removeById = async (req, res, next) => {
    try {
      const todo = await this.todoService.findById(req.params.id)
      if (!todo) {
        return next(new createError.NotFound('Todo not found.'))
      }

      await this.todoService.remove(todo)
      res.json(todo)
    } catch (err) { next(err) }
  }
}
