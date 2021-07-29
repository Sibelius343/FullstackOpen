import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_BLOG':
      return [...state, action.data]
    case 'INC_LIKES': {
      const id = action.data.id
      return state.map(blog => blog.id === id
        ? action.data
        : blog)
    }
    case 'DELETE_BLOG': {
      const id = action.data
      return state.filter(b => b.id !== id)
    }
    case 'INITIALIZE_BLOGS':
      return action.data
    default: return state
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const data = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      data
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const data = await blogService.update({ ...blog, likes: Number(blog.likes + 1) })
    dispatch({
      type: 'INC_LIKES',
      data
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    const response = await blogService.remove(blog)
    console.log('response', response)
    if(response.status === 204) {
      dispatch({
        type: 'DELETE_BLOG',
        data: blog.id
      })
    }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE_BLOGS',
      data
    })
  }
}

export default blogReducer