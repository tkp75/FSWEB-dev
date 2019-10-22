import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const handleCreate = async (event) => {
    event.preventDefault()
    event.persist()
    props.createAnecdote(event.target.create.value)
    props.setNotification(`you created '${event.target.create.value}'`, 5000)
    event.target.create.value=''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div><input name='create'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
}

const ConnectedAnecdoteForm = connect(null,mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm