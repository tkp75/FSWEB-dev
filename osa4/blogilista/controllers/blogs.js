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
  if (!blog.likes) blog.likes = 0
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

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog
      .findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})


module.exports = blogsRouter