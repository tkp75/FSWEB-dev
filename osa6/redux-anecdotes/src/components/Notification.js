import React from 'react'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const notification = props.store.getState().notification
  return (
    <>
    {
      notification === null ?
      <></> : 
      <div style={style}>{notification}</div>
    }
    </>
  )
}

export default Notification