const mongoose = require('mongoose')

let TodoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: String
  },
  image: {
    type: String
  }
})


let Todo = mongoose.model('Todo', TodoSchema)

module.exports = {Todo}