const notificationReducer = (state = { text: null }, action) => {
  switch (action.type) {
    case 'NOTI':
      console.log(state);
      if(state.id) {
        clearTimeout(state.id)
      }
      return action.data
    case 'REMOVE':
      return { ...state, text: null }
    default: return state
  }
}

export const setNotification = (text, seconds, lastId) => {
  return async dispatch => {
    const time = seconds * 1000
    
    const id = setTimeout(() => {
      dispatch({
        type: 'REMOVE'
      })
    }, time)
    
    dispatch({
      type: 'NOTI',
      data: { text, id }
    })
  }
}

export default notificationReducer