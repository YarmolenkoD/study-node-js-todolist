var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db) {

  app.put ('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) }
    const todo = { text: req.body.body, title: req.body.title }
    db.collection('todos').update(details, todo, (err, result) => {
      if (err) {
        res.send({'error': 'An error has occurred'})
      } else {
        res.send(todo)
      }
    })
  })

  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id
    const details = { '_id': new ObjectID(id) }
    db.collection('todos').remove(details, (err, item) => {
      if (err) {
        res.send({'error': 'An error has occurred'})
      } else {
        res.send(`Note ${item.title} deleted!`)
      }
    })
  })

  app.get('/todo/:id', (req, res) => {
    const id = req.params.id
    const details = { '_id': new ObjectID(id)}
    db.collection('todos').findOne(details, (err, item) => {
      if (err) {
        res.send({'error': 'An error has occurred'})
      } else {
        res.send(item)
      }
    })
  })


  app.get('/todo', (req, res) => {
    const allTodos = db.collection('todos').find({}, (err, items) => {
      return items
    })
    let result = []
    console.log(1111, allTodos)
    allTodos.forEach((err, item) => {
      if (item) {
        result.push(item)
      } else {
        res.end()
      }
    })
    res.json(result)
  })

  app.post('/todo', (req, res) => {
    const todo = { text: req.body.body, title: req.body.title }
    db.collection('todos').insert(todo, (err, result) => {
      console.log(req.body)
      if (err) {
        res.send({'error': 'An error has occurred'})
      } else {
        res.send(result.ops[0])
      }
    })
  })

}