import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, unsetNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  let { anecdotes, filter } = props.store.getState()
  if(filter !== null) anecdotes = props.store.getState().anecdotes.filter(a => a.content.includes(filter))
  anecdotes = anecdotes.sort((a,b) => b.votes-a.votes)

  const handleVote = (id) => {
    props.store.dispatch(voteAnecdote(id))
    props.store.dispatch(setNotification(`you voted '${anecdotes.find(a => a.id === id).content}'`))
    setTimeout(() => props.store.dispatch(unsetNotification()), 5000)

  }

  return (
    <div>
      {anecdotes.map(anecdote =>
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