import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import Togglable from '../components/Togglable'
import { createBlog, likeBlog, removeBlog, toggleBlog, createComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

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
  createComment,
  setNotification,
}

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const blogFormRef = React.createRef()

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
const ConnectedBlog = connect(mapStateToProps,mapDispatchToProps)(Blog)

const BlogList = (props) => {
  // eslint-disable-next-line eqeqeq
  if (props.blogs == null) return <div className='blog-list'></div>
  return (
    <div className='blog-list'>
      {props.blogs.sort((a,b) => b.likes - a.likes).map((blog) => { return (
        <div key={blog.id} style={blogStyle} className='blog'>
          <ConnectedBlog blog={blog} />
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
const ConnectedBlogList = connect(mapStateToProps,mapDispatchToProps)(BlogList)

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
const ConnectedCreateBlog = connect(mapStateToProps,mapDispatchToProps)(CreateBlog)

export const TogglableBlogList = () => {
  // eslint-disable-next-line eqeqeq
  return (
    <div>
      <Togglable showLabel='new blog' hideLabel='cancel' ref={blogFormRef}>
        <ConnectedCreateBlog />
      </Togglable>
      <ConnectedBlogList />
    </div>
  )
}

const Comments = (props) => {
  const blogId = props.id
  const comments = props.comments
  const newComment = useField('text')
  const inNewComment = dropReset(newComment)
  const handleClick = async (event) => {
    event.preventDefault()
    if (!newComment.value) {
      props.setNotification('WARNING: no comment to save', 1, 10)
      return
    }
    props.createComment(newComment.value, blogId)
    props.setNotification(`INFO: comment saved\n\tBlog ID: ${blogId}\n\tComment: ${newComment.value}`, 0, 5)
    newComment.reset()
  }

  return (
    <div>
      <h3>Comments</h3>
      <div className='comment-create'>
        <form>
          <div>
            <input {...inNewComment}/>
            <button type="submit" onClick={handleClick} name="Create">create</button>
          </div>
        </form>
      </div>
      <ul>{comments.map((comment,index) => <li key={index}>{comment}</li>)}</ul>
    </div>
  )
}
const ConnectedComments = connect(mapStateToProps,mapDispatchToProps)(Comments)

const SingleBlog = (props) => {
  const { id } = useParams()
  const blog = props.blogs.find(b => b.id === id)
  // eslint-disable-next-line eqeqeq
  if(blog == null) {
    //TODO: Check why props.blogs is empty at first
    return <div className='single-blog'></div>
  }
  return (
    <div style={blogStyle} className='single-blog'>
      <h3>{blog.title} by {blog.author}</h3>
      <a href={blog.url}>{blog.url}</a><br/>
      {blog.likes} likes<button onClick={() => props.likeBlog(blog)}>like</button><br/>
      added by <a href={'/users/'+blog.user.id}>{blog.user.name}</a><br/>
      {props.user.username === blog.user.username ? <button onClick={() => props.removeBlog(blog.id)}>remove</button> : <></>}
      <ConnectedComments id={blog.id} comments={blog.comments}/>
    </div>
  )
}
export const ConnectedSingleBlog = connect(mapStateToProps,mapDispatchToProps)(SingleBlog)

const PlainBlog = (props) => {
  const blog = props.blog
  // eslint-disable-next-line eqeqeq
  if(blog == null) {
    props.setNotification('ERROR: No blog found', 2, 15)
    return <div className='plain-blog'></div>
  }
  return (
    <div style={blogStyle} className='plain-blog'>
      <h3><a href={'/blogs/'+blog.id}>{blog.title} by {blog.author}</a></h3>
      <a href={blog.url}>{blog.url}</a><br/>
      {blog.likes} likes<button onClick={() => props.likeBlog(blog)}>like</button><br/>
      added by <a href={'/users/'+blog.user.id}>{blog.user.name}</a><br/>
      {props.user.username === blog.user.username ? <button onClick={() => props.removeBlog(blog.id)}>remove</button> : <></>}
    </div>
  )
}
const ConnectedPlainBlog = connect(mapStateToProps,mapDispatchToProps)(PlainBlog)

const PlainBlogList = (props) => {
  // eslint-disable-next-line eqeqeq
  if (props.blogs == null) return <div className='plain-blog-list'></div>
  return (
    <div className='plain-blog-list'>
      <Togglable showLabel='new blog' hideLabel='cancel' ref={blogFormRef}>
        <ConnectedCreateBlog />
      </Togglable>
      {props.blogs.sort((a,b) => b.likes - a.likes).map((blog) => ( <ConnectedPlainBlog key={blog.id} blog={blog} /> ))}
    </div>
  )
}
export const ConnectedPlainBlogList = connect(mapStateToProps,mapDispatchToProps)(PlainBlogList)