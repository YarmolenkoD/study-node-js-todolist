const express = require('express')
const bodyParser = require('body-parser')

const routes = require('./routes/index')
const {mongoose} = require('./db/mongoose')

const app = express()
const port = 8000

app.use(bodyParser.urlencoded({ extended: true }))

routes(app, mongoose)

app.listen(port, () => {
  console.log('Start server :' + port)
})