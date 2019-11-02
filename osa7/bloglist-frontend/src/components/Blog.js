import React from 'react'
import PropTypes from 'prop-types'
import  { useField } from '../hooks'
import blogService from '../services/blogs'

const dropReset = (obj) => {
  // eslint-disable-next-line no-unused-vars
  const { reset, ...newObj } = obj
  return newObj
}

const Blog = ({ blog, handleBlogClick, handleLikeClick }) => {
  const showFull = { display: blog.full ? '' : 'none' }
  return (
    <>
      <div onClick={() => handleBlogClick(blog)}>
        {blog.title} {blog.author}
      </div>
      <div className='blog-details' style={showFull}>
        <a href={blog.url}>{blog.url}</a><br/>
        {blog.likes} likes<button onClick={() => handleLikeClick(blog)}>like</button><br/>
        added by {blog.user.name}
      </div>
    </>
  )
}

const BlogList = ({ blogs, username, handleBlogClick, handleLikeClick, handleRemoveClick }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div className='blog-list'>
      {blogs.sort((a,b) => b.likes - a.likes).map((blog) => { return (
        <div key={blog.id} style={blogStyle} className='blog'>
          <Blog blog={blog} handleBlogClick={handleBlogClick} handleLikeClick={handleLikeClick}/>
          {username === blog.user.username ? <button onClick={() => handleRemoveClick(blog)}>remove</button> : <></>}
        </div>
      )})}
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  handleBlogClick: PropTypes.func.isRequired,
  handleLikeClick: PropTypes.func.isRequired,
  handleRemoveClick: PropTypes.func.isRequired
}

const CreateBlog = ({ handleCreateBlogCallback, handleNotificationCallback }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('url')
  const handleClick = async (event) => {
    event.preventDefault()
    if (!title.value && !author.value && !url.value) {
      handleNotificationCallback('WARNING: no blog to save', 1, 10000)
      return
    }
    try {
      const createResponse = await blogService.create({ title: title.value, author: author.value, url: url.value })
      if (!createResponse || createResponse.error) {
        handleNotificationCallback(`ERROR: creating a blog failed\n${createResponse}`, 2, 15000)
        return
      }
      handleCreateBlogCallback(createResponse)
      title.reset()
      author.reset()
      url.reset()
      handleNotificationCallback(`INFO: blog saved\n\tTitle: ${title.value}\n\tAuthor: ${author.value}`, 0, 5000)
    } catch (exception) {
      handleNotificationCallback(`ERROR: creating a blog failed\n${exception}`, 2, 15000)
    }
  }
  const inTitle = dropReset(title)
  const inAuthor = dropReset(author)
  const inUrl = dropReset(url)
  return (
    <div className='blog-create'>
      <h2>create new</h2>
      <form>
        <div>
          title:<input {...inTitle}/>
        </div>
        <div>
          author:<input {...inAuthor}/>
        </div>
        <div>
          url:<input {...inUrl}/>
        </div>
        <div>
          <button type="submit" onClick={handleClick} name="Create">create</button>
        </div>
      </form>
    </div>
  )
}

export { Blog, BlogList, CreateBlog }
