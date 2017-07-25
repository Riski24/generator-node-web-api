
export default class TodoService {
  constructor({ db, todoSchema }) {
    this.todos = db.model('Todo', todoSchema)
  }

  find = criteria => this.todos.find(criteria).exec()

  findById = id => this.todos.findById(id).exec()

  create = data => this.todos.create(data)

  update = todo => todo.save()

  remove = todo => todo.remove()

  removeById = id => this.todos.removeById(id)
}
