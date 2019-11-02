const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
//const logger = require('../utils/logger')


blogsRouter.get('/', async (request, response, next) => {
  try {
    await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })
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
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id)
      return response.status(401).json({ error: 'invalid or missing token' })
    const user = await User.findById(decodedToken.id)
    if (!user) return response.status(400).json({ error: 'invalid or missing user' })
    blog.user = user._id
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const blog = {
    'title': request.body.title,
    'author': request.body.author,
    'url': request.body.url,
    'likes': request.body.likes
  }
  try {
    await Blog
      .findByIdAndUpdate(request.params.id, blog, { new: true })
      .then(updatedBlog => {
        response.json(updatedBlog.toJSON)
      })
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id)
      return response.status(401).json({ error: 'invalid or missing token' })
    const blog = await Blog.findById(request.params.id)
    if (!blog) return response.status(204).end()
    if ( !blog.user || blog.user.toString() === decodedToken.id.toString() ) {
      const user = await User.findById(decodedToken.id)
      if (user) {
        user.blogs = user.blogs.filter(b => b.toString() !== request.params.id)
        await user.save()
      }
      await Blog
        .findByIdAndRemove(request.params.id)
      return response.status(204).end()
    }
    return response.status(401).json({ error: 'invalid token' })
  } catch(exception) {
    next(exception)
  }
})


module.exports = blogsRouter