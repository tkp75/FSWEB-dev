import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const Notification = (props) => {
  const notification = props.notification || { message: '', level: -1 }
  let mstyle=null
  switch(notification.level) {
  case -1: mstyle = { hidden: true }
    break
  case 0:  mstyle = { info: true }
    break
  case 1:  mstyle = { warning: true }
    break
  case 2:  mstyle = { error: true }
    break
  default: mstyle = { visible: true }
  }
  return (
    <Message {...mstyle}>
      {notification.message}
    </Message>
  )
}
const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification