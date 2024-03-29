import React, { useState, useEffect } from 'react'
import  { useField } from './hooks'
import LoginForm from './components/Login'
import { BlogList, CreateBlog } from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const username = useField('text')
  const password = useField('password')
  const [ user, setUser ] = useState(null)
  const [ blogs, setBlogs ] = useState([])
  const [ message, setMessage ] = useState({ level: -1 })

  useEffect(() => {
    blogService
      .getAll().then(initialNotes => {
        setBlogs(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      if (loggedUser.token) {
        setUser(loggedUser)
        blogService.setToken(loggedUser.token)
      }
    }
  }, [])

  const blogFormRef = React.createRef()

  const handleLoginClick = async (event) => {
    event.preventDefault()
    if (!username.value || !password.value) {
      setMessage({ text: 'WARNING: invalid username or password', level: 1 })
      setTimeout(() => setMessage({ level: -1 }), 10000)
      setUser(null)
      window.localStorage.removeItem('loggedBloglistUser')
      return
    }
    const currentUser = username.value
    const currentPassword = password.value
    try {
      const loginResponse = await loginService.login({ username: currentUser, password: currentPassword })
      if (!loginResponse || !loginResponse.token) {
        setMessage({ text: 'ERROR: wrong username or password', level: 2 })
        setTimeout(() => setMessage({ level: -1 }), 15000)
        setUser(null)
        window.localStorage.removeItem('loggedBloglistUser')
        return
      }
      setUser(loginResponse)
      username.reset()
      password.reset()
      blogService.setToken(loginResponse.token)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(loginResponse))
    } catch (exception) {
      setMessage({ text: `ERROR: login failed\n${exception}`, level: 2 })
      setTimeout(() => setMessage({ level: -1 }), 15000)
      setUser(null)
      window.localStorage.removeItem('loggedBloglistUser')
    }
  }

  const handleLogoutCLick = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBloglistUser')
  }

  const handleNotificationCallback = (text, level, duration)  => {
    setMessage({ text: text, level: level })
    setTimeout(() => setMessage({ level: -1 }), duration)
  }

  const handleCreateBlogCallback = (newBlog) => {
    newBlog.user = user
    blogFormRef.current.toggleVisibility()
    setBlogs(blogs.concat(newBlog))
  }

  const handleBlogClick = (blog) => {
    if (blog.full === true) blog.full = false
    else  blog.full = true
    const blogIndex = blogs.findIndex(b => b.id === blog.id)
    const newBlogs = Object.assign([], blogs, { [blogIndex]: blog })
    setBlogs(newBlogs)
  }

  const handleLikeClick = (blog) => {
    blog.likes++
    blogService.update({
      id: blog.id,
      user: blog.user.id,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
    const blogIndex = blogs.findIndex(b => b.id === blog.id)
    const newBlogs = Object.assign([], blogs, { [blogIndex]: blog })
    setBlogs(newBlogs)
  }

  const handleRemoveClick = (blog) => {
    blogService.remove(blog.id)
    const newBlogs = blogs.filter(b => b.id!==blog.id)
    setBlogs(newBlogs)
  }

  // Show login form if not logged in
  return (
    <div className='app'>
      {user === null ?
        <div>
          <h2>Log in to bloglist application</h2>
          <Notification notification={message} />
          <LoginForm
            username={username}
            password={password}
            loginClickHandler={handleLoginClick}
          />
        </div> :
        <div>
          <h2>blogs</h2>
          <Notification notification={message}/>
          <p>{user.name} logged in <button type="submit" onClick={handleLogoutCLick} name="Logout">logout</button></p>
          <Togglable showLabel='new blog' hideLabel='cancel' ref={blogFormRef}>
            <CreateBlog handleCreateBlogCallback={handleCreateBlogCallback} handleNotificationCallback={handleNotificationCallback} />
          </Togglable>
          <BlogList username={user.username} blogs={blogs} handleBlogClick={handleBlogClick} handleLikeClick={handleLikeClick} handleRemoveClick={handleRemoveClick}/>
        </div>
      }
    </div>
  )
}


export default App
