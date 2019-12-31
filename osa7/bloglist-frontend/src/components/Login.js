import React from 'react'
import { connect } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { useField } from '../hooks'
import { initApp, uninitApp } from '../reducers/initReducer'
import { setUser, unsetUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'

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
  setUser,
  unsetUser,
  setNotification,
}

const dropReset = (obj) => {
  // eslint-disable-next-line no-unused-vars
  const { reset, ...newObj } = obj
  return newObj
}

const LoginForm = (props) => {
  const username = useField('text')
  const password = useField('password')
  const user = dropReset(username)
  const pass = dropReset(password)
  const history = useHistory()
  const location = useLocation()
  const { from } = location.state || { from: { pathname: '/' } }

  const loginClickHandler = async (event) => {
    event.preventDefault()
    if (!username.value || !password.value) {
      props.setNotification('WARNING: missing username or password', 1, 10)
      props.unsetUser()
      return
    }
    try {
      const loginResponse = await loginService.login({ username: username.value, password: password.value })
      if (!loginResponse || !loginResponse.token) {
        props.setNotification('ERROR: invalid username or password', 2, 15)
        return
      }
      username.reset()
      password.reset()
      props.setUser(loginResponse)
      props.initApp('login')
      history.replace(from)
    } catch (exception) {
      console.log('ERROR: login failed\n',exception)
      props.setNotification(`ERROR: login failed\n${exception}`, 2, 15)
    }
  }

  return (
    <div>
      <h3>Log in</h3>
      <form className='login-form'>
        <div>
        username <input {...user} />
        </div>
        <div>
        password <input {...pass} />
        </div>
        <div>
          <button type="submit" onClick={loginClickHandler} name="Login">login</button>
        </div>
      </form>
    </div>
  )
}
export const ConnectedLoginForm = connect(mapStateToProps,mapDispatchToProps)(LoginForm)