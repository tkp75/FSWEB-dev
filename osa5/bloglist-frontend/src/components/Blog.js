import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>
)

const CreateBlog = (props) => {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')
  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleAuthorChange = (event) => setAuthor(event.target.value)
  const handleUrlChange = (event) => setUrl(event.target.value)
  const handleCreateClick = async (event) => {
    event.preventDefault()
    if (!title && !author && !url) {
      alert('Error, nothing to save')
      return
    }
    try {
      const createResponse = await blogService.create({title: title, author: author, url: url})
      if (!createResponse || createResponse.error) {
        alert(`Error, creating blog failed\n${createResponse}`)
        return
      }
      props.blogCallback(createResponse)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      alert(`Error, blog creation failed\n${exception}`)
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
          <button type="submit" onClick={handleCreateClick} name="Create">create</button>
        </div>
      </form>
    </div>
  )
  }

export { Blog, CreateBlog }