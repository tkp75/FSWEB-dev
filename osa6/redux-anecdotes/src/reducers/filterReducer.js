const initialState = null

export const setFilter = (filter) => {
  return {
    type: 'FILTER',
    filter: filter
  }
}


const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILTER': return action.filter
    default: return state
  }
}

export default filterReducer