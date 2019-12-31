import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'

const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}
const mapDispatchToProps = {
  setNotification,
}

const User = (props) => {
  const { id } = useParams()
  console.log('User id: ',id)
  let user = null
  // eslint-disable-next-line eqeqeq
  if(props.user != null) user=props.user
  else user = props.users.find(u => u.id === id)
  // eslint-disable-next-line eqeqeq
  if(user == null) {
    // TODO: investigate if this is really needed
    return <div className='user'></div>
  }
  return (
    <div className='user'>
      <h3>{user.name}</h3>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.sort((a,b) => b.likes - a.likes).map((blog) => (
          <li key={blog.id}><a href={'/blogs/'+blog.id} >{blog.title}</a></li>
        ))}
      </ul>
    </div>
  )
}
export const ConnectedUser = connect(mapStateToProps,mapDispatchToProps)(User)

const UserList = (props) => {
  // eslint-disable-next-line eqeqeq
  if (props.users == null) return <div className='user-list'><h3>Users</h3></div>
  return (
    <div className='user-list' >
      <h3>Users</h3>
      <table >
        <thead>
          <tr><th></th><th>blogs created</th></tr>
        </thead>
        <tbody>
          {props.users.sort((a,b) => a.name.localeCompare(b.name)).map((user) => (
            <tr key={user.id} ><td><a href={'/users/'+user.id} >{user.name}</a></td><td>{user.blogs.length}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export const ConnectedUserList = connect(mapStateToProps,mapDispatchToProps)(UserList)
