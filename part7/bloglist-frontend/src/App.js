import React, { useEffect, useState } from 'react'
import { Route, Switch, useRouteMatch, useHistory } from 'react-router-dom'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, likeBlog, deleteBlog } from './reducers/blogReducer'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import { initializeUser, logout } from './reducers/userReducer'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import { setNotification } from './reducers/messageReducer'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import BlogNavbar from './components/BlogNavbar'
import RegisterForm from './components/RegisterForm'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const user = useSelector(({ user }) => user)
  const { notification, error } = useSelector(({ messages }) => messages)
  const users = useSelector(({ users }) => users)
  const blogs = useSelector(({ blogs }) => blogs.sort((a, b) => b.likes - a.likes))
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const history = useHistory()
  const userMatch = useRouteMatch('/users/:id')
  const blogMatch = useRouteMatch('/blogs/:id')

  if(blogs.length !== 0 && loading) {
    setLoading(false)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(loggedUser.token)
      dispatch(initializeUser(loggedUser))
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    //console.log('after blogs finish loading, should not render until blog is added')
    dispatch(initializeUsers())
  }, [blogs])

  const userForDetails = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null
  const blogForDetails = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(logout())
    dispatch(setNotification('Logged out', 5))
  }

  const toRegisterUser = () => {
    history.push('/register')
  }

  const incLikes = async (blog) => {
    try {
      const toBeLiked = blogs.find(b => b.id === blog.id)
      dispatch(likeBlog(toBeLiked))
    } catch (exception) {
      console.log(exception.message)
    }
  }

  const deleteBlogHandler = async (blog) => {
    try {
      dispatch(deleteBlog(blog))
      console.log(blog)
      history.push('/')
    } catch (exception) {
      console.log(exception.message)
    }
  }

  console.log('info...:', user, blogs, loading)
  if (!user) {
    return (
      <div>
        <BlogNavbar user={user} handleLogout={handleLogout} />
        <Switch>
          <Route path='/register'>
            <ErrorMessage message={error} />
            <RegisterForm />
          </Route>
          <Route path='/'>
            <LoginForm toRegisterUser={toRegisterUser} />
          </Route>
        </Switch>
      </div>
    )
  }

  if(loading) {
    return (
      <div></div>
    )
  }

  return (
    <div>
      <BlogNavbar user={user} handleLogout={handleLogout} />
      <Notification message={notification} />
      <ErrorMessage message={error} />
      <Switch>
        <Route exact path='/'>
          <Blogs blogs={blogs} />
        </Route>
        <Route path='/users/:id'>
          <User user={userForDetails} />
        </Route>
        <Route path='/users'>
          <Users users={users}/>
        </Route>
        <Route path='/blogs/:id'>
          {blogForDetails &&
          <Blog user={user} blog={blogForDetails} incLikes={incLikes} deleteBlogHandler={deleteBlogHandler}/>}
        </Route>
      </Switch>
    </div>
  )
}

export default App