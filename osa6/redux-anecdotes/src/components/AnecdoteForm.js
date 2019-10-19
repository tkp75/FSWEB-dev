import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, unsetNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const handleCreate = (event) => {
    event.preventDefault()
    props.store.dispatch(createAnecdote(event.target.create.value))
    props.store.dispatch(setNotification(`you created '${event.target.create.value}'`))
    event.target.create.value=''
    setTimeout(() => props.store.dispatch(unsetNotification()), 5000)
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

export default AnecdoteForm