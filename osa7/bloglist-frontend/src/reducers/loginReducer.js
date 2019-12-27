import blogService from '../services/blogs'

const initialState = null

export const setUser = (loggedUser) => {
  window.localStorage.setItem('loggedBloglistUser', JSON.stringify(loggedUser))
  blogService.setToken(loggedUser.token)
  return {
    type: 'LOGIN',
    user: loggedUser,
  }
}

export const unsetUser = () => {
  window.localStorage.removeItem('loggedBloglistUser')
  //blogService.setToken(null)
  return {
    type: 'LOGOUT',
  }
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN': return action.user
  case 'LOGOUT': return initialState
  default: return state
  }
}

export default loginReducer