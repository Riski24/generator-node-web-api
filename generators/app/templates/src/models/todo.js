import mongoose from 'mongoose'
import paginate from 'mongoose-paginate'

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' },
  versionKey: false
})

todoSchema.plugin(paginate)

export default todoSchema
