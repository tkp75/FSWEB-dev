const initialState = null

export const setNotification = (content,level,duration) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW',
      notification: content,
      level: level
    })
    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, duration*1000)
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SHOW': return action.notification
  case 'HIDE': return null
  default: return state
  }
}

export default notificationReducer