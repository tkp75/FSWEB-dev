import React from 'react'
import Course from './Course'

// Courses
const Courses = (props) => {
    //console.log('Courses: ',props)
    return (
    <>
     {props.courses.map((course,index) => <Course key={index} course={course} />)}
    </>
    )
  }

export default Courses