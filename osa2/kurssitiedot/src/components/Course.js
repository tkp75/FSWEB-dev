import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

// Course
const Course = (props) => {
  //console.log('Course: ',props)
  return (
    <>
      <Header
        name={props.course.name}
        level='2'
      />
      <Content
        parts={props.course.parts}
      />
      <Total
        parts={props.course.parts}
      />
    </>
  )
}

export default Course