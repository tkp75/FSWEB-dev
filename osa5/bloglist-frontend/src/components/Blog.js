import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
)

const BlogList = ({ blogs }) => (
  <div>
    {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
  </div>
)

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
      const createResponse = await blogService.create({title: title, author: author, url: url})
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
          title:<input type="text" onChange={handleTitleChange} name="Title" value={props.title}/>
        </div>
        <div>
          author:<input type="text" onChange={handleAuthorChange} name="Author" value={props.author}/>
        </div>
        <div>
          url:<input type="text" onChange={handleUrlChange} name="Url" value={props.url}/>
        </div>
        <div>
          <button type="submit" onClick={handleClick} name="Create">create</button>
        </div>
      </form>
    </div>
  )
}

export { Blog, BlogList, CreateBlog }