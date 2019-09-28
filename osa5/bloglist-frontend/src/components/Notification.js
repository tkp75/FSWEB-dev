import React from 'react'

const Notification = ({ notification }) => {
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
  if (notification.level < 0 || notification.level >= styleList.length) {
    return null
  }
  return (
    <div className="notification" style={styleList[notification.level]}>
      <pre>{notification.text}</pre>
    </div>
  )
}

export default Notification