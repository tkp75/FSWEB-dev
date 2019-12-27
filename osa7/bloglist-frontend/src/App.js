import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'
import { useField } from './hooks'
import LoginForm from './components/Login'
import BlogList, { ConnectedCreateBlog as CreateBlog } from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = (props) => {
  const username = useField('text')
  const password = useField('password')
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    props.initBlogs()
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      props.setNotification('WARNING: invalid username or password', 1, 10)
      setUser(null)
      window.localStorage.removeItem('loggedBloglistUser')
      return
    }
    const currentUser = username.value
    const currentPassword = password.value
    try {
      const loginResponse = await loginService.login({ username: currentUser, password: currentPassword })
      if (!loginResponse || !loginResponse.token) {
        props.setNotification('ERROR: wrong username or password', 2, 15)
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
      props.setNotification(`ERROR: login failed\n${exception}`, 2, 15)
      setUser(null)
      window.localStorage.removeItem('loggedBloglistUser')
    }
  }

  const handleLogoutCLick = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBloglistUser')
  }

  // Show login form if not logged in
  return (
    <div className='app'>
      {user === null ?
        <div>
          <h2>Log in to bloglist application</h2>
          <Notification />
          <LoginForm
            username={username}
            password={password}
            loginClickHandler={handleLoginClick}
          />
        </div> :
        <div>
          <h2>blogs</h2>
          <Notification />
          <p>{user.name} logged in <button type="submit" onClick={handleLogoutCLick} name="Logout">logout</button></p>
          <Togglable showLabel='new blog' hideLabel='cancel' ref={blogFormRef}>
            <CreateBlog user={user} />
          </Togglable>
          <BlogList username={user.username} />
        </div>
      }
    </div>
  )
}

const mapDispatchToProps = {
  setNotification,
  initBlogs,
}
const ConnectedApp = connect(null,mapDispatchToProps)(App)
export default ConnectedApp