import React from 'react'
import ReactDOM from 'react-dom'

// Part
const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

// Header
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

// Content
const Content = (props) => {
  return (
    <>
     {props.parts.map((part,index) => <Part key={index} part={part} />)}
    </>
  )
}

// Total
const Total = (props) => { 
  return (
      <p>Number of exercises {props.parts.map(part => part.exercises).reduce((a,b) => a + b, 0)}</p>
  )
}

// App
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return (
    <div>
      <Header
        course={course}
      />
      <Content
        parts={parts}
      />
      <Total
        parts={parts}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))