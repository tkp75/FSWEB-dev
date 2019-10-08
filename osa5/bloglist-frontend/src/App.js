import React, { useState, useEffect } from 'react'
import LoginForm from './components/Login'
import { BlogList, CreateBlog } from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
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
  const handleUsernameChange = (event) => setUsername(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)
  const handleLoginClick = async (event) => {
    event.preventDefault()
    if (!username || !password) {
      setMessage({ text: 'WARNING: invalid username or password', level: 1 })
      setTimeout(() => setMessage({ level: -1 }), 10000)
      setUser(null)
      window.localStorage.removeItem('loggedBloglistUser')
      return
    }
    try {
      const loginResponse = await loginService.login({ username, password })
      if (!loginResponse || !loginResponse.token) {
        setMessage({ text: 'ERROR: wrong username or password', level: 2 })
        setTimeout(() => setMessage({ level: -1 }), 15000)
        setUser(null)
        window.localStorage.removeItem('loggedBloglistUser')
        return
      }
      setUser(loginResponse)
      blogService.setToken(loginResponse.token)
      setUsername('')
      setPassword('')
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
            changeUsernameHandler={handleUsernameChange}
            username={username}
            changePasswordHandler={handlePasswordChange}
            password={password}
            loginClickHandler={handleLoginClick}
          />
        </div> :
        <div>
          <h2>blogs</h2>
          <Notification notification={message}/>
          <p>{user.name} logged in <button type="submit" onClick={handleLogoutCLick} name="Logout">logout</button></p>
          <Togglable showLabel='new blog' hideLabel='cancel' ref={blogFormRef}>
            <CreateBlog handleNotificationCallback={handleNotificationCallback} handleCreateBlogCallback={handleCreateBlogCallback}/>
          </Togglable>
          <BlogList username={user.username} blogs={blogs} handleBlogClick={handleBlogClick} handleLikeClick={handleLikeClick} handleRemoveClick={handleRemoveClick}/>
        </div>
      }
    </div>
  )
}


export default App
