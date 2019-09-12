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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}