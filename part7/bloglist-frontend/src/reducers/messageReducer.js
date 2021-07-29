const messageReducer = (state={ notification: null, error: null }, action) => {
  switch(action.type) {
    case 'NOTIFY':
      return { ...state, notification: action.data }
    case 'ERROR':
      return { ...state, error: action.data }
    default: return state
  }
}

let timeoutIdNotification
let timeoutIdError

export const setNotification = (message, time) => {
  return dispatch => {
    if(timeoutIdNotification) {
      clearTimeout(timeoutIdNotification)
    }

    dispatch({
      type: 'NOTIFY',
      data: message
    })

    timeoutIdNotification = setTimeout(() => {
      dispatch({
        type: 'NOTIFY',
        data: null
      })
    }, (time * 1000))
  }
}

export const setError = (message, time) => {
  return dispatch => {
    if(timeoutIdError) {
      clearTimeout(timeoutIdError)
    }

    dispatch({
      type: 'ERROR',
      data: message
    })

    timeoutIdError = setTimeout(() => {
      dispatch({
        type: 'ERROR',
        data: null
      })
    }, (time * 1000))
  }
}

export default messageReducer