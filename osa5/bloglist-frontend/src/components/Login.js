import React from 'react'

const LoginForm = ({ username, password, loginClickHandler }) => {
  return (
    <form className='login-form'>
      <div>
        username <input {...username} />
      </div>
      <div>
        password <input {...password} />
      </div>
      <div>
        <button type="submit" onClick={loginClickHandler} name="Login">login</button>
      </div>
    </form>
  )
}

export default LoginForm
