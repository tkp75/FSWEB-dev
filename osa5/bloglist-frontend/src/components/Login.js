import React from 'react'

const LoginForm = (props) => {
  return (
    <form>
      <div>
        username<input type="text" onChange={props.changeUsernameHandler} name="Username" value={props.username}/>
      </div>
      <div>
        password<input type="password" onChange={props.changePasswordHandler} name="Password" value={props.password}/>
      </div>
      <div>
        <button type="submit" onClick={props.loginClickHandler} name="Login">login</button>
      </div>
    </form>
  )
}

export default LoginForm