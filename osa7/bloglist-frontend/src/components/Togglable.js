import React, { useState, useImperativeHandle } from 'react'
import { Button } from 'semantic-ui-react'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showLabel = (props.showLabel) ? props.showLabel : 'submit'
  const hideLabel = (props.hideLabel) ? props.hideLabel : 'cancel'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button primary onClick={toggleVisibility}>{showLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button secondary onClick={toggleVisibility}>{hideLabel}</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
export default Togglable