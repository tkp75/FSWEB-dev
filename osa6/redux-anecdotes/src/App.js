import React from 'react';

const App = (props) => {
  const anecdotes = props.store.getState()

  const vote = (id) => {
    //console.log('vote', id)
    props.store.dispatch({
      type: 'VOTE',
      data: {
        id: id
      }
    })
  }

  const create = (event) => {
    event.preventDefault()
    //console.log('create',event.target.create.value)
    props.store.dispatch({
      type: 'CREATE',
      data: {
        content: event.target.create.value
      }
    })
    event.target.create.value=''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='create'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App