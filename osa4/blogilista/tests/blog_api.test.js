const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  //const promiseArray = await Blog.insertMany(helper.initialBlogs)
  //await Promise.all(promiseArray)
})


describe('getBlogs', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('there is a blog from specific author', async () => {
    const response = await api.get('/api/blogs')
    const author = response.body.map(r => r.author)
    expect(author).toContain('Kirjailija')
  })

  /* API functions not implemented yet
  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(resultBlog.body).toEqual(blogToView)
  })
  */

})


describe('setBlogs', () => {

  test('a valid blog can be added ', async () => {
    const newBlog = {
      'title': 'Blog Title',
      'author': 'Blog Author',
      'url': 'http://inter.net/blog?id=1',
      'likes': 1,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('Blog Title')
  })

  test('blog only with likes is not added', async () => {
    const newBlog = {
      likes: 0
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })
})

/* API functions not implemented yet
describe('modifyBlogs', () => {

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

})
*/

afterAll(() => {
  mongoose.connection.close()
})
