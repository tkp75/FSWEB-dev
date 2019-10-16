import React from 'react';
import { voteAnecdote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = (props) => {
  const anecdotes = props.store.getState()

  const handleVote = (id) => {
    props.store.dispatch(voteAnecdote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
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
      <AnecdoteForm store={props.store} />
    </div>
  )
}

export default App