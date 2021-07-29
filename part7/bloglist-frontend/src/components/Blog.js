import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'
import { addComment } from '../reducers/commentReducer'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeComments } from '../reducers/commentReducer'
import { Paper, Typography, IconButton, Button } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUpOutlined'

const Blog = ({ blog, user, incLikes, deleteBlogHandler }) => {
  // const [showDetails, setShowDetails] = useState(false) ***used in previous version for expanding details
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const comments = useSelector(({ comments }) => comments.sort((a, b) => a.date - b.date))

  useEffect(() => {
    dispatch(initializeComments(blog))
  }, [])

  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    console.log(blog)
    try {
      dispatch(addComment(blog, comment))
    } catch (exception) {
      console.log(exception.message)
    }
    setComment('')
  }

  const deleteVisibilityLogic = () => {
    console.log(blog)
    console.log(user)
    if (!blog.user) {
      return false
    }
    return user.username.toString() === blog.user.username.toString()
  }

  const deleteVisibility = { display: deleteVisibilityLogic() ? '' : 'none' }

  // *** Old, unneeded logic for expanding details of blog ***
  // const buttonWhenVisable = showDetails ? 'hide' : 'view'
  // const showWhenVisable = { display: showDetails ? '' : 'none' }
  // const toggleVisibility = () => {
  //   setShowDetails(!showDetails)
  // }
  // const showButton = () => (
  //   <button onClick={toggleVisibility}>{buttonWhenVisable}</button>
  // )

  const urlParser = () => {
    if (blog.url.includes('http')) {
      return blog.url
    } else {
      return `http://${blog.url}`
    }
  }

  return(
    <div style={{ margin: 10 }}>
      <Paper elevation={3} style={{ padding: 10 }}>
        <Typography variant='h3'>
          {blog.title} by {blog.author}
        </Typography>
        <br />
        <Typography variant='body1'>
          <div>
            <a href={urlParser()}>{blog.url}</a>
          </div>
          <div className='likes'>
            {blog.likes} <IconButton
              aria-label='like'
              color='secondary'
              size='small'
              onClick={() => incLikes(blog) }><ThumbUpIcon /></IconButton>
          </div>
          <div>
            added by {blog.user ? blog.user.name : 'superuser'}
          </div>
        </Typography>
        <div className='removeButton' style={deleteVisibility}>
          <br />
          <Button variant='contained' color='secondary' size='small' onClick={() => deleteBlogHandler(blog)}>remove</Button>
        </div>
        <h3>comments</h3>
        <CommentForm handleSubmit={handleCommentSubmit} comment={comment} setComment={setComment} />
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      </Paper>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog