import React from 'react'
import { Alert } from '@material-ui/lab'
import { Snackbar } from '@material-ui/core'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <Snackbar open={!!message}>
      <Alert severity='success' elevation={3} variant='filled'>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Notification