import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({header, text, count}) => (
  <>
    <h2>{header}</h2>
    <p>{text}</p>
    <p>has {count} votes</p>
  </>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleVoteClick = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const indexOfMax = (arr) => {
    if (arr.length === 0) {
      return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        maxIndex = i;
        max = arr[i];
      }
    }

    return maxIndex;
  }

  const handleNextClick = () => setSelected(Math.floor(Math.random()*anecdotes.length))

  return (
    <div>
      <Anecdote header='Anecdote of the day' text={props.anecdotes[selected]} count={votes[selected]} />
      <button onClick={handleVoteClick} >vote</button>
      <button onClick={handleNextClick} >next anecdote</button>
      <Anecdote header='Anecdote with most votes' text={props.anecdotes[indexOfMax(votes)]} count={votes[indexOfMax(votes)]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
