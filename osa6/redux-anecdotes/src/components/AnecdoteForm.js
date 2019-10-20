import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, unsetNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {

  const handleCreate = async (event) => {
    event.preventDefault()
    event.persist()
    const newAnecdote = await anecdoteService.createNew(event.target.create.value)
    props.createAnecdote(newAnecdote)
    props.setNotification(`you created '${newAnecdote.content}'`)
    event.target.create.value=''
    setTimeout(() => props.unsetNotification(), 5000)
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
  unsetNotification,
}

const ConnectedAnecdoteForm = connect(null,mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm