import loginService from '../services/login'
import blogService from '../services/blogs'
import usersService from '../services/users'
import { setNotification, setError } from './messageReducer'

const userReducer = (state = null, action) => {
  switch(action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default: return state
  }
}

export const login = ({ username, password }) => {
  return async dispatch => {
    const loginUser = await loginService.login({ username, password })
    console.log(loginUser)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(loginUser))
    blogService.setToken(loginUser.token)
    dispatch({
      type: 'LOGIN',
      data: loginUser
    })
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}

export const addUser = (user, history) => {
  return async dispatch => {
    try {
      const addedUser = await usersService.createUser(user)
      dispatch({
        type: 'ADD_USER',
        data: addedUser
      })
      dispatch(setNotification(`${user.username} registered`, 5))
      history.push('/')
    } catch (exception) {
      dispatch(setError('bad password', 5))
    }
  }
}

export const initializeUser = (data) => {
  return {
    type: 'LOGIN',
    data
  }
}

export default userReducer