import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div className='noti' style={notificationStyle}>
      {message}
    </div>
  )
}

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }
  const notificationStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div className='error' style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(async () => {
    await blogService.getAll()
      .then(blogs => blogs.sort((a, b) => b.likes - a.likes))
      .then(blogs => setBlogs( blogs ))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const blogFormRef = useRef()

  const incLikes = async (blog) => {
    try {
      let index
      blogs.forEach((b, i) => {
        if(b.id === blog.id) {
          b.likes++
          index = i
          return
        }
      })
      await blogService.update(blogs[index])
      const newBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
      console.log(newBlogs)
      setBlogs(newBlogs)
    } catch (exception) {
      console.log(exception.message)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userLogin = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(userLogin)
      )
      blogService.setToken(userLogin.token)
      setUser(userLogin)
      setNotification(`${userLogin.name} logged in`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setNotification(`${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage(exception.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setNotification('Logged out')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const loginForm = () => (
    <>
      <Notification message={notification} />
      <ErrorMessage message={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        password
          <input
            id='password'
            type='password'
            value={password}
            name={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  )

  const blogForm = () => (
    <Toggleable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm addBlog={addBlog}></BlogForm>
    </Toggleable>
  )


  if (user === null) return loginForm()

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      <ErrorMessage message={errorMessage} />
      <p>{user.name} logged in
        <button type='button' onClick={handleLogout}>logout</button>
      </p>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user} incLikes={incLikes} />
      )}
    </div>
  )
}

export default App