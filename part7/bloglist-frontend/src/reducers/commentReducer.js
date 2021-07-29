import commentService from '../services/comments'

const commentReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_COMMENT':
      return [...state, action.data]
    case 'INITIALIZE_COMMENTS':
      return action.data
    default: return state
  }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    console.log(blog)
    const data = await commentService.addComment(blog, { content: comment })
    dispatch({
      type: 'ADD_COMMENT',
      data
    })
  }
}

export const initializeComments = (blog) => {
  return async dispatch => {
    const data = await commentService.getComments(blog)
    console.log(data)
    dispatch({
      type: 'INITIALIZE_COMMENTS',
      data
    })
  }
}

export default commentReducer