const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
  let totalLikes=0
  blogs.forEach(blog => {
    totalLikes+=blog.likes
  })
  return totalLikes
}

const favoriteBlog = (blogs) => {
  let favoriteBlog = []
  let maxLikes=-1
  blogs.forEach(blog => {
    if (blog.likes > maxLikes) {
      favoriteBlog=blog
      maxLikes=blog.likes
    }
  })
  return favoriteBlog
}

const mostBlogs = (blogs) => {
  let mostBlogs = {}
  let authors = []
  let current
  let maxBlogs = -1
  blogs.forEach(blog => {
    if (authors[blog.author] === undefined) { current = 0
    } else { current = authors[blog.author] }
    authors[blog.author]=current + 1
    if (current >= maxBlogs) {
      maxBlogs = current
      mostBlogs = { author: blog.author, blogs: current + 1 }
    }
  })
  return mostBlogs
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}