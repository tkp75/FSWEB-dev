import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const handleCreate = (event) => {
    event.preventDefault()
    props.store.dispatch(createAnecdote(event.target.create.value))
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

export default AnecdoteForm