import React, { useState, useEffect } from 'react';
//import './App.css';
import Blog from './components/Blog';
import blogService from './services/blogs'
import loginService from './services/login'

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
        <button type="submit" onClick={props.loginClickHandler} name="Login">
          login
        </button>
      </div>
    </form>
  )
}


function App() {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ blogs, setBlogs ] = useState([])

  useEffect(() => {
    blogService
      .getAll().then(initialNotes => {
        setBlogs(initialNotes)
      })
  }, [])

  const handleUsernameChange = (event) => setUsername(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)
  const handleLoginClick = async (event) => {
    event.preventDefault()
    if (!username || !password) {
      alert(`Error, please fill in both username and password`)
      setUser(null)
      return
    }  
    try {
      const loginResponse = await loginService.login({ username, password })
      if (!loginResponse || !loginResponse.token) {
        console.log('Login failed: loginResponse=',loginResponse)
        alert(`Error, login failed\n${loginResponse}`)
        setUser(null)
        return
      }
      setUser(loginResponse)
      setUsername('')
      setPassword('')
    } catch (exception) {
      alert(`Error, login failed\n${exception}`)
    }
  } 
  
  if (!user) {
    // Show login form if not logged in
    return (
      <div className="App">
        <h2>Log in to application</h2>
        <LoginForm
          changeUsernameHandler={handleUsernameChange}
          username={username}
          changePasswordHandler={handlePasswordChange}
          password={password}
          loginClickHandler={handleLoginClick}
        />
      </div>
    )
  }

  // Show blogs if logged in
  return (
    <div className="App">
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App;