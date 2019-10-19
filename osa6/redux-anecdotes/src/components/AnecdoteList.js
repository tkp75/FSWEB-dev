import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, unsetNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.store.getState().anecdotes

  const handleVote = (id) => {
    props.store.dispatch(voteAnecdote(id))
    props.store.dispatch(setNotification(`you voted '${anecdotes.find(a => a.id === id).content}'`))
    setTimeout(() => props.store.dispatch(unsetNotification()), 5000)

  }

  return (
    <div>
      {anecdotes.sort((a,b) => b.votes-a.votes).map(anecdote =>
        <div key={anecdote.id}>
         <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList