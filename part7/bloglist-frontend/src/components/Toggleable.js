import React, { useState, useImperativeHandle } from 'react'
import { Button, Collapse, Fade } from '@material-ui/core'

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  // ***Legacy code for visibility before Material framework***
  //const hideWhenVisable = { display: visible ? 'none' : '' }
  //const showWhenVisable = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div style={{ padding: 10, display: 'flex', flexDirection:'column', width: '50%' }}>
      <div>
        <Fade in={!visible}>
          <Button
            variant='contained'
            size='small'
            color='primary'
            onClick={toggleVisibility}
          >{props.buttonLabel}
          </Button>
        </Fade>
      </div>
      <Collapse in={visible} >
        {props.children}
        <br></br>
      </Collapse>
    </div>
  )
})

Toggleable.displayName = 'Toggleable'

export default Toggleable