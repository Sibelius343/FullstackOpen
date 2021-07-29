import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { addUser } from '../reducers/userReducer'
import { TextField, Button, Paper, Typography } from '@material-ui/core'

const RegisterForm = () => {
  const [newUserName, setNewUserName] = useState('')
  const [newUserUsername, setNewUserUsername] = useState('')
  const [newUserPassword, setNewUserPassword] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  const handleRegister = async (event) => {
    event.preventDefault()
    const newUser = {
      name: newUserName,
      username: newUserUsername,
      password: newUserPassword
    }
    dispatch(addUser(newUser, history))
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
      <Paper style={paperStyle}>
        <Typography variant='h4'>Register</Typography>
        <form onSubmit={handleRegister}>
          <div>
            <TextField
              id='name'
              label='Name'
              type='text'
              value={newUserName}
              name='Name'
              onChange={({ target }) => setNewUserName(target.value)}
            />
          </div>
          <div>
            <TextField
              id='username'
              label='Username'
              type='text'
              value={newUserUsername}
              name='Username'
              onChange={({ target }) => setNewUserUsername(target.value)}
            />
          </div>
          <div>
            <TextField
              id='password'
              label='Password'
              type='password'
              value={newUserPassword}
              name='Password'
              onChange={({ target }) => setNewUserPassword(target.value)}
            />
          </div>
          <Button
            style={{ marginRight: 2, marginTop: 2 }}
            variant='contained'
            color='primary'
            type='submit'
          >register</Button>
          <Button
            style={{ marginTop: 2 }}
            variant='contained'
            color='secondary'
            type='button'
            onClick={() => history.push('/')}
          >cancel</Button>
        </form>
      </Paper>
    </div>
  )
}

export default RegisterForm