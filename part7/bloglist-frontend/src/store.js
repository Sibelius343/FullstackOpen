import { combineReducers, createStore, applyMiddleware } from 'redux'
import blogReducer from './reducers/blogReducer'
import loginFormReducer from './reducers/loginFormReducer'
import userReducer from './reducers/userReducer'
import messageReducer from './reducers/messageReducer'
import usersReducer from './reducers/usersReducer'
import commentReducer from './reducers/commentReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  blogs: blogReducer,
  loginCredentials: loginFormReducer,
  user: userReducer,
  users: usersReducer,
  messages: messageReducer,
  comments: commentReducer
})

const blogStore = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)))

export default blogStore