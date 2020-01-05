import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, Link } from 'react-router-dom'
import { Menu, Message, Icon } from 'semantic-ui-react'
import userService from '../services/users'
import { initApp, uninitApp } from '../reducers/initReducer'
import { initBlogs, uninitBlogs } from '../reducers/blogReducer'
import { setUser, unsetUser } from '../reducers/loginReducer'
import { initUsers, uninitUsers } from '../reducers/userReducer'
import Notification from '../components/Notification'

const mapStateToProps = (state) => {
  return {
    user: state.login,
    init: state.init,
  }
}
const mapDispatchToProps = {
  initApp,
  uninitApp,
  initBlogs,
  uninitBlogs,
  initUsers,
  uninitUsers,
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
  // If locally saved user is still valid, load data from backend
  useEffect(() => {
    let refUser = null
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    const loggedUser = (loggedUserJSON) ? JSON.parse(loggedUserJSON) : { user: null, username: null, id: null, token: null }
    if (loggedUser.token && loggedUser.id && loggedUser.username) {
      console.log('DEBUG: Previously logged in user found: ', loggedUser)
      try {
        (async () => {
          refUser = await userService.getUser(loggedUser.id)
          console.log('DEBUG: User on database:\n',refUser)
          if(!refUser || refUser.username !== loggedUser.username ) {
            console.log('DEBUG: No matching user found, clearing local data')
            window.localStorage.removeItem('loggedBloglistUser')
            props.initApp('init')
          } else {
            console.log('DEBUG: Matching user found, loading data')
            props.initUsers()
            props.initApp('users')
            props.initBlogs()
            props.initApp('blogs')
            props.setUser(loggedUser)
            props.initApp('login')
            props.initApp('init')
          }
        })()
      } catch (exception) {
        console.log('ERROR: fetching user data from backend failed\n',exception)
        props.setNotification(`ERROR: fetching user data from backend failed\n${exception}`, 2, 15)
        props.initApp('init')
      }
    } else {
      console.log('DEBUG: No user found')
      props.initApp('init')
    }
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
            (props.init == null || props.init.init != true || props.init.login != true)
              ?
              <Link style={menuStyle} to="/logout">login</Link>
              :
              <Link style={menuStyle} to="/logout">logout</Link>
          }
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item link disabled={
          // eslint-disable-next-line eqeqeq
            (props.init == null || props.init.init != true || props.init.login != true || props.user == null)}
          >
            { // eslint-disable-next-line eqeqeq
              (props.init == null || props.init.init != true || props.init.login != true || props.user == null)
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

export const Invalid = () => (
  <Message>
    <Message.Header>Invalid address</Message.Header>
    <Message.Content>Please use navigation bar on top to choose the desired page.</Message.Content>
  </Message>
)

export const Loading = () => (
  <Message>
    <Message.Header>No data found (yet)...</Message.Header>
    <Message.Content>Please wait data to load, <Link to='/logout'>login</Link> or refresh page.</Message.Content>
  </Message>
)

const Uninit = (props) => {
  props.uninitApp('login')
  props.unsetUser()
  props.uninitApp('blogs')
  props.uninitBlogs()
  props.uninitApp('users')
  props.uninitUsers()
  return <Redirect to='/login' />
}
export const ConnectedUninit = connect(mapStateToProps,mapDispatchToProps)(Uninit)

const ProtectedRoute = ({ init, children, ...routeArgs }) => {
  return (
    <Route {...routeArgs} render={({ location }) => (
      // eslint-disable-next-line eqeqeq
      (init == null || init.init != true || init.login != true) ? (
        <Redirect to={{
          pathname: '/logout',
          state: { from: location },
        }} />
      ) :  (
        <div>
          {children}
        </div>
      )
    )
    }
    />
  )
}
export const ConnectedProtectedRoute = connect(mapStateToProps,mapDispatchToProps)(ProtectedRoute)
