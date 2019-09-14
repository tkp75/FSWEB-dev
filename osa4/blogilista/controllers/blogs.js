const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    await Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
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
        response.status(201).json(result)
      })
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogsRouter