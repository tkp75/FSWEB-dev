const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const blogsRouter = require('./controllers/blogs')
//const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

const app = express()

console.log('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error while connecting to MongoDB:', error.message)
  })

app.use(cors())
//app.use(express.static('build'))
app.use(bodyParser.json())
//app.use(middleware.requestLogger)
app.use('/api/blogs',blogsRouter)
//app.use(middleware.unknownEndpoint)
//app.use(middleware.errorHandler)

module.exports = app