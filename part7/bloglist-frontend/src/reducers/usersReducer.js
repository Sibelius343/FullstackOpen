import usersService from '../services/users'

const usersReducer = (state=[], action) => {
  switch(action.type) {
    case 'ADD_USER':
      return [...state, action.data]
    case 'INITIALIZE_USERS':
      return action.data
    default: return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getUsers()
    dispatch({
      type: 'INITIALIZE_USERS',
      data: users
    })
  }
}

export default usersReducer