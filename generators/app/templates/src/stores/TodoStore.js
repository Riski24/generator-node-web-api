
export default class TodoStore {

  constructor({ db, todoSchema }) {
    this.todos = db.model('Todo', todoSchema)
  }

  find(criteria, options) {
    return this.todos.find(criteria, options).exec()
  }

  findPaginated(criteria, options) {
    return this.todos.paginate(criteria, options)
  }

  findOne(criteria, options) {
    return this.todos.findOne(criteria, options).exec()
  }

  findById(id) {
    return this.todos.findById(id).exec()
  }

  create(data) {
    return this.todos.create(data)
  }

  update(todo) {
    return todo.save()
  }

  remove(todo) {
    return todo.remove()
  }

  removeById(id) {
    return this.todos.removeById(id)
  }
}
