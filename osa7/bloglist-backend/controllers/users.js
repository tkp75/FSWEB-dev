const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({})
      .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    response.json(users.map(u => u.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/:id', async(request, response, next) => {
  try {
    const user = await User
      .findById(request.params.id)
      .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    if(user) { response.json(user.toJSON()) } else { response.json({}) }
  } catch (exception) {
    next(exception)
  }
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    if (!body.password || body.password.length < 3) {
      return response.status(400).json({ error: 'invalid or missing password' })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      passwordHash,
      name: body.name,
      blogs: [],
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const user = new User({
    username: body.username,
    passwordHash: body.passwordHash,
    name: body.name,
    blogs: body.blogs,
  })
  try {
    await user
      .findByIdAndUpdate(request.params.id, user, { new: true })
      .then(updatedUser => {
        response.json(updatedUser.toJSON)
      })
  } catch(exception) {
    next(exception)
  }
})

module.exports = usersRouter