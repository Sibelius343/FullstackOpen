import React, { useState, useImperativeHandle } from 'react'

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisable = { display: visible ? 'none' : '' }
  const showWhenVisable = { display: visible ? '' : 'none' }

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
      <div style={hideWhenVisable}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        <br></br>
        <br></br>
      </div>
      <div style={showWhenVisable}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
        <br></br>
        <br></br>
      </div>
    </div>
  )
})

Toggleable.displayName = 'Toggleable'

export default Toggleable