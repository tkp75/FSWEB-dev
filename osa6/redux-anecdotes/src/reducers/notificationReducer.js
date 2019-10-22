const initialState = null

export const setNotification = (content,duration) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW',
      notification: content
    })
    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, duration)
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