import React from 'react'

// Header
export const Header = (props) => {
  //console.log('Header: ',props)
  let Heading = 'h1'
  if (props.level) Heading = 'h'+props.level
  return (
    <Heading>{props.name}</Heading>
  )
}

// Content
const Content = (props) => {
  //console.log('Content: ',props)
  return (
    <>
     {props.parts.map((part,index) => <Part key={index} part={part} />)}
    </>
  )
}

// Part
const Part = (props) => {
  //console.log('Part: ',props)
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

// Total
const Total = (props) => { 
  //console.log('Total: ',props)
  return (
      <p><b>total of {props.parts.map(part => part.exercises).reduce((a,b) => a + b, 0)} exercises</b></p>

  )
}

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