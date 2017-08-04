
export default class TodoService {
  constructor(<% if (includeMongoDb) { %>{ db, todoSchema }<% } %>) {<% if (includeMongoDb) { %>
    this.todos = db.model('Todo', todoSchema)
  <% } %>}

  <% if (includeMongoDb) { %>find = criteria => this.todos.find(criteria).exec()

  findById = id => this.todos.findById(id).exec()

  create = data => this.todos.create(data)

  update = todo => todo.save()

  remove = todo => todo.remove()

  removeById = id => this.todos.removeById(id)<% } %>
}
