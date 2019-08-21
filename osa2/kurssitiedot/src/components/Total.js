import React from 'react'

// Total
const Total = (props) => { 
  console.log('Total: ',props)
  return (
      <p>Number of exercises {props.parts.map(part => part.exercises).reduce((a,b) => a + b, 0)}</p>
  )
}

export default Total
