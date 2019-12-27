import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { setUser, unsetUser } from './reducers/loginReducer'
import LoginForm from './components/Login'
import BlogList, { ConnectedCreateBlog as CreateBlog } from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = (props) => {

  // Load all blogs from backend
  useEffect(() => {
    props.initBlogs()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Load user information from browser
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      if (loggedUser.token) {
        props.setUser(loggedUser)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const blogFormRef = React.createRef()

  // Show login form if not logged in
  return (
    <div className='app'>
      {props.user === null ?
        <div>
          <h2>Log in to bloglist application</h2>
          <Notification />
          <LoginForm />
        </div> :
        <div>
          <h2>blogs</h2>
          <Notification />
          <p>{props.user.name} logged in <button type="submit" onClick={(event) => {
            event.preventDefault()
            props.unsetUser()
          }} name="Logout">logout</button></p>
          <Togglable showLabel='new blog' hideLabel='cancel' ref={blogFormRef}>
            <CreateBlog />
          </Togglable>
          <BlogList />
        </div>
      }
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    user: state.login,
  }
}
const mapDispatchToProps = {
  initBlogs,
  setUser,
  unsetUser,
}
const ConnectedApp = connect(mapStateToProps,mapDispatchToProps)(App)
export default ConnectedApp