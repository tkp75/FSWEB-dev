import anecdoteService from '../services/anecdotes'

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch ({
      type: 'CREATE',
      data: newAnecdote,
    })
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdote = await anecdoteService.get(id)
    anecdote.votes=anecdote.votes+1
    await anecdoteService.modify(anecdote)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
        const id = action.data.id
        const anectodeToUpdate = state.find(a => a.id === id)
        return state.map(anecdote =>
          anecdote.id !== id ? anecdote :  { 
            ...anectodeToUpdate, 
            votes: anectodeToUpdate.votes + 1 
          } 
        )
    case 'CREATE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default: return state
  }
}

export default anecdoteReducer