const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    'title': 'Otsikko',
    'author': 'Kirjailija',
    'url': 'http://inter.net/kirja?id=1',
    'likes': 0,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'Schrödinger\'s blog', author: 'Erwin Schrödinger' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}
