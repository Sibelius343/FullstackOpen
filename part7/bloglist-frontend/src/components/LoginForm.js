import React from 'react'
import { setUsername, setPassword } from '../reducers/loginFormReducer'
import { login } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './Notification'
import ErrorMessage from './ErrorMessage'
import { setNotification, setError } from '../reducers/messageReducer'
import { TextField, Button, Paper, Typography } from '@material-ui/core'

const LoginForm = ({ toRegisterUser }) => {
  const { username, password } = useSelector(({ loginCredentials }) => loginCredentials)
  const { notification, error } = useSelector(({ messages }) => messages)
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(login({ username, password }))
      dispatch(setNotification(`${username} logged in`, 5))
      dispatch(setUsername(''))
      dispatch(setPassword(''))
    } catch (exception) {
      console.log('Got here')
      dispatch(setError('Wrong username or password', 5))
    }
  }

  const paperStyle = {
    padding: 10,
    margin: 10
  }

  const containerStyle = {
    width: '300px'
  }

  return (
    <div style={containerStyle}>
      <Notification message={notification} />
      <ErrorMessage message={error} />
      <Paper style={paperStyle}>
        <Typography variant='h4'>Login</Typography>
        <form onSubmit={handleLogin}>
          <div>
            <TextField
              id='username'
              label='username'
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => dispatch(setUsername(target.value))}
            />
          </div>
          <div>
            <TextField
              id='password'
              label='password'
              type='password'
              value={password}
              name={password}
              onChange={({ target }) => dispatch(setPassword(target.value))}
            />
          </div>
          <Button
            style={{ marginRight: 2, marginTop: 2 }}
            variant='contained'
            color='primary'
            type='submit'
          >login</Button>
          <Button
            style={{ marginTop: 2 }}
            variant='contained'
            color='primary'
            type='button'
            onClick={toRegisterUser}
          >register</Button>
        </form>
      </Paper>
    </div>
  )
}

export default LoginForm