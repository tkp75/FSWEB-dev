import React from 'react'

const dropReset = (obj) => {
  // eslint-disable-next-line no-unused-vars
  const { reset, ...newObj } = obj
  return newObj
}

const LoginForm = ({ username, password, loginClickHandler }) => {
  const user = dropReset(username)
  const pass = dropReset(password)
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

export default LoginForm
