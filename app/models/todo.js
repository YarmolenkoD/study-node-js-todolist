const mongoose = require('mongoose')

let Todo = mongoose.model('Todo', {
  description: {
    type: String,
    // required: true,
    minlength: 2,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  date: {
    type: String
    // required: true
  },
  image: {
    type: String
  }
})

module.exports = {Todo}