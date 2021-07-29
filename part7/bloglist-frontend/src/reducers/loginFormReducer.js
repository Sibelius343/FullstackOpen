const loginFormReducer = (state={ username: '', password: '' }, action) => {
  switch(action.type) {
    case 'USERNAME':
      return { ...state, username: action.data }
    case 'PASSWORD':
      return { ...state, password: action.data }
    default: return state
  }
}

export const setUsername = (value) => {
  return {
    type: 'USERNAME',
    data: value
  }
}

export const setPassword = (value) => {
  return {
    type: 'PASSWORD',
    data: value
  }
}

export const resetUsername = () => {
  return {
    type: 'USERNAME',
    data: ''
  }
}

export const resetPassword = () => {
  return {
    type: 'PASSWORD',
    data: ''
  }
}

export default loginFormReducer