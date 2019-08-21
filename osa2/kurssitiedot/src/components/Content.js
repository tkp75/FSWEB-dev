import React from 'react'
import Part from './Part'

// Content
const Content = (props) => {
  console.log('Content: ',props)
  return (
    <>
     {props.parts.map((part,index) => <Part key={index} part={part} />)}
    </>
  )
}

export default Content
