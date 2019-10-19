const initialState = null

export const setNotification = (notification) => {
  return {
    type: 'SHOW',
    notification: notification
  }
}

export const unsetNotification = () => {
  return {
    type: 'HIDE'
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