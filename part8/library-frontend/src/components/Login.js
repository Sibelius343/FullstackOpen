import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'

const Login = ({ show, LOGIN, setPage, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userLogin, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      setPage('authors')
    }
  }, [result.data]) // eslint-disable-line

  if (!show) {
    return null
  }

  const submitInfo = (e) => {
    e.preventDefault()
    
    userLogin({
      variables: { username, password }
    })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submitInfo}>
        <div>
          username
          <input
            type='text'
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />
        </div>
        <div>
          password
          <input
            type='password'
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login