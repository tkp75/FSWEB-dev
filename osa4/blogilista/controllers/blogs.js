const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
//const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response, next) => {
  try {
    await Blog
      .find({})
      .then(blogs => {
        response.json(blogs.map(blog => blog.toJSON()))
      })
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  try {
    await blog
      .save()
      .then(result => {
        //logger.inspect('inspect result',result)
        response.status(201).json(result.toJSON())
      })
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter