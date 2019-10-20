import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, unsetNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const handleVote = (id) => {
    props.voteAnecdote(id)
    props.setNotification(`you voted '${props.anecdotes.find(a => a.id === id).content}'`)
    setTimeout(() => props.unsetNotification(), 5000)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote =>
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

const anecdotesToShow = (anecdotes, filter) => {
  if(filter !== null) anecdotes = anecdotes.filter(a => a.content.includes(filter))
  return anecdotes.sort((a,b) => b.votes-a.votes)
}

const mapStateToProps = (state) => {
  return {
    anecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}
const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
  unsetNotification,
}

const ConnectedAnecdoteList = connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList