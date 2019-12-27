import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { setUser, unsetUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'

const dropReset = (obj) => {
  // eslint-disable-next-line no-unused-vars
  const { reset, ...newObj } = obj
  return newObj
}

// { username, password, loginClickHandler }
const LoginForm = (props) => {
  const username = useField('text')
  const password = useField('password')
  const user = dropReset(username)
  const pass = dropReset(password)

  const loginClickHandler = async (event) => {
    event.preventDefault()
    if (!username.value || !password.value) {
      props.unsetUser()
      props.setNotification('WARNING: missing username or password', 1, 10)
      return
    }
    try {
      const loginResponse = await loginService.login({ username: username.value, password: password.value })
      if (!loginResponse || !loginResponse.token) {
        props.setNotification('ERROR: invalid username or password', 2, 15)
        props.unsetUser()
        return
      }
      props.setUser(loginResponse)
      username.reset()
      password.reset()
    } catch (exception) {
      console.log('loginAction ',exception)
      props.setNotification(`ERROR: login failed\n${exception}`, 2, 15)
      props.unsetUser()
    }
  }

  return (
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
  )
}

const mapDispatchToProps = {
  unsetUser,
  setUser,
  setNotification,
}
const ConnectedLoginForm = connect(null,mapDispatchToProps)(LoginForm)
export default ConnectedLoginForm