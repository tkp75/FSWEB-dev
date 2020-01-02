import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, Link } from 'react-router-dom'
import { Menu, Message, Icon } from 'semantic-ui-react'
import { initApp, uninitApp } from '../reducers/initReducer'
import { initBlogs } from '../reducers/blogReducer'
import { setUser, unsetUser } from '../reducers/loginReducer'
import { initUsers } from '../reducers/userReducer'
import Notification from '../components/Notification'

const mapStateToProps = (state) => {
  return {
    user: state.login,
    init: state.init,
    /*
    blogs: state.blogs,
    */
  }
}
const mapDispatchToProps = {
  initApp,
  uninitApp,
  initBlogs,
  initUsers,
  setUser,
  unsetUser,
}

const menuStyle = {
  padding: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 0,
}

const Header = (props) => {
  // Load information about logged in user from a browser
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      if (loggedUser.token) {
        props.setUser(loggedUser)
        console.log('DEBUG: Previously logged in user found: ', loggedUser)
      } else {
        console.log('DEBUG: No token found for previously logged in user, clearing credentials')
        props.unsetUser()
      }
    } else {
      console.log('DEBUG: No previously logged in user found, clearing credentials just in case')
      props.unsetUser()
    }
    props.initApp('login')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Load all blogs from backend
  useEffect(() => {
    props.initBlogs()
    props.initApp('blogs')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Load all users from backend
  useEffect(() => {
    props.initUsers()
    props.initApp('users')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='header'>
      <Menu inverted stackable>
        <Menu.Item link>
          <Link style={menuStyle} to="/">home</Link>
        </Menu.Item>
        <Menu.Item link>
          <Link style={menuStyle} to="/blogs">blogs</Link>
        </Menu.Item>
        <Menu.Item link>
          <Link style={menuStyle} to="/users">users</Link>
        </Menu.Item>
        <Menu.Item link>
          { // eslint-disable-next-line eqeqeq
            (props.init == null || props.init.users != true || props.user == null)
              ?
              <Link style={menuStyle} to="/logout">login</Link>
              :
              <Link style={menuStyle} to="/logout">logout</Link>
          }
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item link disabled={
          // eslint-disable-next-line eqeqeq
            (props.init == null || props.init.users != true || props.user == null)}
          >
            { // eslint-disable-next-line eqeqeq
              (props.init == null || props.init.users != true || props.user == null)
                ?
                <Icon color='red' name='user secret'></Icon>
                :
                <Link to={'/users/'+props.user.id}><b>{props.user.username}</b> logged in</Link>
            }
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <h2>blogs</h2>
      <Notification />
    </div>
  )
}
export const ConnectedHeader = connect(mapStateToProps,mapDispatchToProps)(Header)

export const Loading = () => (
  <Message>
    <Message.Header>No user data found (yet)...</Message.Header>
    <Message.Content>Please wait data to load, <Link to='/logout'>login</Link> or refresh.</Message.Content>
  </Message>
)

const Uninit = (props) => {
  props.uninitApp('login')
  props.unsetUser()
  return <Redirect to='/login' />
}
export const ConnectedUninit = connect(mapStateToProps,mapDispatchToProps)(Uninit)

const ProtectedRoute = ({ user, children, ...routeArgs }) => {
  return (
    <Route {...routeArgs} render={({ location }) =>
    // eslint-disable-next-line eqeqeq
      (user == null || user.username == null) ? (
        <Redirect to={{
          pathname: '/login',
          state: { from: location },
        }} />
      ) :  (
        <div>
          {children}
        </div>
      )
    }
    />
  )
}
export const ConnectedProtectedRoute = connect(mapStateToProps,mapDispatchToProps)(ProtectedRoute)
