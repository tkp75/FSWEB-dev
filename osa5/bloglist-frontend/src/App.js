import React from 'react';
//import './App.css';
import Blog from './components/Blog';
const blogs = []
const user = null

function App() {
  if (user === null) {
    return (
      <div className="App">
        <h2>Log in to application</h2>
        <form>
          <div>
            username
            <input/>
          </div>
          <div>
            password
            <input/>
          </div>
          <div>
            <button>
              login
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    //Blog({ title: "foo", author: "bar" })
    <div className="App">
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App;
