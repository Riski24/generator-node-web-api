import mongoose from 'mongoose'
import paginate from 'mongoose-paginate'

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: true
  }
}, {
  createdAt: 'createdDate', updatedAt: 'updatedDate'
})

todoSchema.plugin(paginate)

export default function makeTodoSchema() {
  return todoSchema
}
