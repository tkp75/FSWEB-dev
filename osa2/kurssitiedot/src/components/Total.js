import React from 'react'

// Total
const Total = (props) => { 
  //console.log('Total: ',props)
  return (
      <p><b>total of {props.parts.map(part => part.exercises).reduce((a,b) => a + b, 0)} exercises</b></p>

  )
}

export default Total
