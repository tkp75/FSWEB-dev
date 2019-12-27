const initialState = null

// TODO: This is a dummy reducer to get compile working, functionality is missing!
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN': return action.login
  case 'LOGOUT': return null
  default: return state
  }
}

export default loginReducer