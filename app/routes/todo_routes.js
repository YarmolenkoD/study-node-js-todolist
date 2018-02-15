const _ = require('lodash')
const ObjectID = require('mongodb').ObjectID
const {Todo} = require('../models/todo')

module.exports = function(app, db) {
  app.put ('/todos/:id', (req, res) => {
    const id = req.params.id
    const body = _.pick(req.body, ['text', 'completed'])

    if (!ObjectID.isValid(id)) {
      return res.status(404).send()
    }

    if (_.isBoolean(body.completed) && body.completed) {
      body.completedAt = new Date().getTime()
    } else {
      body.completed = false
      body.completedAt = null
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
      if (!todo) {
        return res.status(404).send()
      }

      res.send({todo})
    }).catch((e) => {
      res.status(400).send()
    })
  })

  app.delete('/todos/:id', (req, res) => {
    const id = req.params.id
    if (!ObjectID.isValid(id)) {
      return res.status(404).send()
    }

    Todo.findByIdAndRemove(id).then((todo) => {
      if (!todo) {
        return res.status(404).send()
      }

      res.send({todo})
    }).catch((e) => {
      res.status(400).send(e)
    })
  })

  app.get('/todos/:id', (req, res) => {
    const id = req.params.id
    if (!ObjectID.isValid(id)) {
      return res.status(404).send()
    }

    Todo.findById(id).then((todo) => {
      if (!todo) {
        return res.status(404).send()
      }
      res.send({todo: todo})
    }).catch((e) => {
      res.status(400).send(e)
    })
  })

  app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
      if (!todos) {
        return res.status(404).send()
      }
      res.send({todos})
    }).catch((e) => {
      res.status(400).send(e)
    })
  })

  app.post('/todos', (req, res) => {
    let newTodo = new Todo({
      description: req.body.description,
      date: req.body.date,
      completed: req.body.completed || false,
      image: req.body.image || ''
    })
    newTodo.save().then((todo) => {
      res.send(todo)
    }, (e) => {
      res.status(400).send(e)
    })
  })
}