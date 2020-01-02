import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import { List, Form, Button, Icon, Label } from 'semantic-ui-react'
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

const blogFormRef = React.createRef()

const dropReset = (obj) => {
  // eslint-disable-next-line no-unused-vars
  const { reset, ...newObj } = obj
  return newObj
}

const LikeButton = (props) => (
  <Button  compact as='div' labelPosition='right' onClick={() => props.likeBlog(props.blog)}>
    <Button icon><Icon color='red' name='heart' />like</Button>
    <Label as='a' basic pointing='left'>{props.blog.likes}</Label>
  </Button>
)
const ConnectedLikeButton = connect(mapStateToProps,mapDispatchToProps)(LikeButton)

const Blog = (props) => {
  const blog = props.blog
  const showFull = { display: blog.full ? '' : 'none' }
  return (
    <List.Content>
      <List.Header>
        <div onClick={() => props.toggleBlog(blog)}>
          {blog.title} {blog.author}
        </div>
      </List.Header>
      <List.Description>
        <div style={showFull}>
          <a href={blog.url}>{blog.url}</a><br/>
          <ConnectedLikeButton blog={blog}/>
          added by {blog.user.name}
        </div>
      </List.Description>
      {props.user.username === blog.user.username ? <Button compact negative onClick={() => props.removeBlog(blog.id)}>remove</Button> : <></>}
    </List.Content>
  )
}
const ConnectedBlog = connect(mapStateToProps,mapDispatchToProps)(Blog)

const BlogList = (props) => {
  // eslint-disable-next-line eqeqeq
  if (props.blogs == null) return <></>
  return (
    <List divided relaxed>
      {props.blogs.sort((a,b) => b.likes - a.likes).map((blog) => (
        <List.Item key={blog.id}>
          <ConnectedBlog blog={blog} />
        </List.Item>
      ))}
    </List>
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
      <Form>
        <Form.Field>
          <label>title</label>
          <input {...inTitle}/>
        </Form.Field>
        <Form.Field>
          <label>author</label>
          <input {...inAuthor}/>
        </Form.Field>
        <Form.Field>
          <label>url</label>
          <input {...inUrl}/>
        </Form.Field>
        <Button primary type="submit" onClick={handleClick} name="Create">create</Button>
      </Form>
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
    <div className='comments'>
      <h3>Comments</h3>
      <Form>
        <Form.Group>
          <Form.Field>
            <input {...inNewComment}/>
          </Form.Field>
          <Button primary type="submit" onClick={handleClick} name="Create">create</Button>
        </Form.Group>
      </Form>
      <List celled bulleted>{comments.map((comment,index) => <List.Item key={index}>{comment}</List.Item>)}</List>
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
    <div className='single-blog'>
      <h3>{blog.title} by {blog.author}</h3>
      <a href={blog.url}>{blog.url}</a><br/>
      <ConnectedLikeButton blog={blog}/>
      added by <a href={'/users/'+blog.user.id}>{blog.user.name}</a><br/>
      {props.user.username === blog.user.username ? <Button compact negative onClick={() => props.removeBlog(blog.id)}>remove</Button> : <></>}
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
    return <></>
  }
  return (
    <div>
      <List.Header>
        <h3><a href={'/blogs/'+blog.id}>{blog.title} by {blog.author}</a></h3>
      </List.Header>
      <List.Description>
        <a href={blog.url}>{blog.url}</a>
      </List.Description>
      <List.Content>
        <ConnectedLikeButton blog={blog}/>
        added by <a href={'/users/'+blog.user.id}>{blog.user.name}</a><br/>
        {props.user.username === blog.user.username ? <Button compact negative onClick={() => props.removeBlog(blog.id)}>remove</Button> : <></>}
      </List.Content>
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
      <List celled>
        {props.blogs.sort((a,b) => b.likes - a.likes).map((blog) => ( <List.Item key={blog.id}><ConnectedPlainBlog blog={blog} /></List.Item> ))}
      </List>
    </div>
  )
}
export const ConnectedPlainBlogList = connect(mapStateToProps,mapDispatchToProps)(PlainBlogList)