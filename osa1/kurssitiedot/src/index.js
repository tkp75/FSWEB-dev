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
      <Part part={props.part1} />
      <Part part={props.part2} />
      <Part part={props.part3} />
    </>
  )
}

// Total
const Total = (props) => {
  return (
      <p>Number of exercises {props.total}</p>
  )
}

// App
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header
        course={course}
      />
      <Content
        part1={part1} part2={part2} part3={part3}
      />
      <Total
        total={part1.exercises + part2.exercises + part3.exercises}
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))