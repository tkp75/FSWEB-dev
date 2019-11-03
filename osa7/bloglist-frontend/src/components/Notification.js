import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const styleList = [
    { // INFO
      padding: 10,
      marginBottom: 10,
      borderStyle: 'solid',
      borderRadius: 5,
      background: 'lightgrey',
      color: 'darkgreen',
      fontStyle: 'normal',
      fontSize: 20
    },
    { // WARN
      padding: 10,
      marginBottom: 10,
      borderStyle: 'solid',
      borderRadius: 5,
      background: 'grey',
      color: 'blue',
      fontStyle: 'italics',
      fontSize: 20
    },
    { // ERROR
      padding: 10,
      marginBottom: 10,
      borderStyle: 'solid',
      borderRadius: 5,
      background: 'darkblue',
      color: 'salmon',
      fontStyle: 'bold',
      fontSize: 20
    }
  ]
  if (props.notification === null || props.notification.level < 0 || props.notification.level >= styleList.length) {
    return (
      <div className="notification">
      </div>
    )
  }
  return (
    <div className="notification" style={styleList[props.notification.level]}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification