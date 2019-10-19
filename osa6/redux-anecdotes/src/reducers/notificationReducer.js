const initialState = null

export const setNotification = (notification) => {
  return {
    type: 'SET',
    notification: notification
  }
}

export const unsetNotification = () => {
  return {
    type: 'UNSET'
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET': return action.notification
    case 'UNSET': return null
    default: return state
  }
}

export default notificationReducer