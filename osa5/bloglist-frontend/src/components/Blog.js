import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleBlogClick, handleLikeClick }) => {
  const showFull = { display: blog.full ? '' : 'none' }
  return (
    <>
      <div onClick={() => handleBlogClick(blog)}>
        {blog.title} {blog.author}
      </div>
      <div className='blogDetails' style={showFull}>
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
    <>
      {blogs.sort((a,b) => b.likes - a.likes).map((blog) => { return (
        <div key={blog.id} style={blogStyle}>
          <Blog blog={blog} handleBlogClick={handleBlogClick} handleLikeClick={handleLikeClick}/>
          {username === blog.user.username ? <button onClick={() => handleRemoveClick(blog)}>remove</button> : <></>}
        </div>
      )})}
    </>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  handleBlogClick: PropTypes.func.isRequired,
  handleLikeClick: PropTypes.func.isRequired,
  handleRemoveClick: PropTypes.func.isRequired
}

const CreateBlog = (props) => {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')
  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleAuthorChange = (event) => setAuthor(event.target.value)
  const handleUrlChange = (event) => setUrl(event.target.value)
  const handleClick = async (event) => {
    event.preventDefault()
    if (!title && !author && !url) {
      props.handleNotificationCallback('WARNING: no blog to save', 1, 10000)
      return
    }
    try {
      const createResponse = await blogService.create({ title: title, author: author, url: url })
      if (!createResponse || createResponse.error) {
        props.handleNotificationCallback(`ERROR: creating a blog failed\n${createResponse}`, 2, 15000)
        return
      }
      props.handleCreateBlogCallback(createResponse)
      setTitle('')
      setAuthor('')
      setUrl('')
      props.handleNotificationCallback(`INFO: blog saved\n\tTitle: ${title}\n\tAuthor: ${author}`, 0, 5000)
    } catch (exception) {
      props.handleNotificationCallback(`ERROR: creating a blog failed\n${exception}`, 2, 15000)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form>
        <div>
          title:<input type="text" onChange={handleTitleChange} name="Title" value={title}/>
        </div>
        <div>
          author:<input type="text" onChange={handleAuthorChange} name="Author" value={author}/>
        </div>
        <div>
          url:<input type="text" onChange={handleUrlChange} name="Url" value={url}/>
        </div>
        <div>
          <button type="submit" onClick={handleClick} name="Create">create</button>
        </div>
      </form>
    </div>
  )
}

export { Blog, BlogList, CreateBlog }
