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
    <h1>{props.name}</h1>
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
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }
  return (
    <div>
      <Header
        name={course.name}
      />
      <Content
        parts={course.parts}
      />
      <Total
        parts={course.parts}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))