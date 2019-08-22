import React from 'react'

// Header
const Header = (props) => {
  //console.log('Header: ',props)
  let Heading = 'h1'
  if (props.level) Heading = 'h'+props.level
  return (
    <Heading>{props.name}</Heading>
  )
}

export default Header
