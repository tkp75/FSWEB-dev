const initialState = null

export const setNotification = (content,level=0,duration=10) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW',
      message: content,
      level: level
    })
    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, duration*1000)
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SHOW': return { message: action.message, level: action.level }
  case 'HIDE': return null
  default: return state
  }
}

export default notificationReducer