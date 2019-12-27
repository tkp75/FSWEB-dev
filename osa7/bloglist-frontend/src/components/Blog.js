import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import  { useField } from '../hooks'
import { createBlog, likeBlog, removeBlog, toggleBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const dropReset = (obj) => {
  // eslint-disable-next-line no-unused-vars
  const { reset, ...newObj } = obj
  return newObj
}

const Blog = (props) => {
  const blog = props.blog
  const showFull = { display: blog.full ? '' : 'none' }
  return (
    <>
      <div onClick={() => props.toggleBlog(blog)}>
        {blog.title} {blog.author}
      </div>
      <div className='blog-details' style={showFull}>
        <a href={blog.url}>{blog.url}</a><br/>
        {blog.likes} likes<button onClick={() => props.likeBlog(blog)}>like</button><br/>
        added by {blog.user.name}
      </div>
    </>
  )
}

const BlogList = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  // eslint-disable-next-line eqeqeq
  if (props.blogs == null) return <div className='blog-list'></div>
  return (
    <div className='blog-list'>
      {props.blogs.sort((a,b) => b.likes - a.likes).map((blog) => { return (
        <div key={blog.id} style={blogStyle} className='blog'>
          <Blog blog={blog} toggleBlog={props.toggleBlog} likeBlog={props.likeBlog}/>
          {props.user.username === blog.user.username ? <button onClick={() => props.removeBlog(blog.id)}>remove</button> : <></>}
        </div>
      )})}
    </div>
  )
}
BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
}

const CreateBlog = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('url')

  const handleClick = async (event) => {
    event.preventDefault()
    if (!title.value && !author.value && !url.value) {
      props.setNotification('WARNING: no blog to save', 1, 10)
      return
    }
    props.createBlog({ title: title.value, author: author.value, url: url.value }, props.user)
    props.setNotification(`INFO: blog saved\n\tTitle: ${title.value}\n\tAuthor: ${author.value}`, 0, 5)
    title.reset()
    author.reset()
    url.reset()
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

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.login,
  }
}
const mapDispatchToProps = {
  createBlog,
  likeBlog,
  removeBlog,
  toggleBlog,
  setNotification,
}
const ConnectedBlogList = connect(mapStateToProps,mapDispatchToProps)(BlogList)
export default ConnectedBlogList
export const ConnectedCreateBlog = connect(mapStateToProps,mapDispatchToProps)(CreateBlog)