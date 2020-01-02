import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Table, List } from 'semantic-ui-react'
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
      <List>
        {user.blogs.sort((a,b) => b.likes - a.likes).map((blog) => (
          <List.Item key={blog.id}><a href={'/blogs/'+blog.id} >{blog.title}</a></List.Item>
        ))}
      </List>
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
      <Table basic='very' celled collapsing>
        <Table.Header>
          <Table.Row><Table.HeaderCell>user</Table.HeaderCell><Table.HeaderCell>blogs created</Table.HeaderCell></Table.Row>
        </Table.Header>
        <Table.Body>
          {props.users.sort((a,b) => a.name.localeCompare(b.name)).map((user) => (
            <Table.Row key={user.id} ><Table.Cell><a href={'/users/'+user.id} >{user.name}</a></Table.Cell><Table.Cell>{user.blogs.length}</Table.Cell></Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
export const ConnectedUserList = connect(mapStateToProps,mapDispatchToProps)(UserList)
