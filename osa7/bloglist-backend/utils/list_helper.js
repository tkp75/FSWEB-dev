// eslint-disable-next-line no-unused-vars
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
    if (authors[blog.author] === undefined) { current = 1
    } else { current = authors[blog.author] + 1 }
    authors[blog.author]=current
    if (current > maxBlogs) {
      maxBlogs = current
      mostBlogs = { author: blog.author, blogs: current }
    }
  })
  return mostBlogs
}

const mostLikes = (blogs) => {
  let mostLikes = {}
  let likes = []
  let current
  let maxLikes = -1
  blogs.forEach(blog => {
    if (likes[blog.author] === undefined) {
      current = blog.likes
    } else {
      current = likes[blog.author] + blog.likes
    }
    likes[blog.author] = current
    if (current > maxLikes) {
      maxLikes = current
      mostLikes = { author: blog.author, likes: current }
    }
  })
  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}