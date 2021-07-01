import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogs, setBlogs, user, incLikes }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteVisibilityLogic = () => {
    if (!blog.user) {
      return false
    }
    return showDetails && user.username.toString() === blog.user.username.toString()
  }

  const showWhenVisable = { display: showDetails ? '' : 'none' }
  const deleteVisibility = { display: deleteVisibilityLogic() ? '' : 'none' }
  const buttonWhenVisable = showDetails ? 'hide' : 'view'

  const toggleVisibility = () => {
    setShowDetails(!showDetails)
  }

  const deleteBlog = async () => {
    try {
      await blogService.remove(blog)
      console.log(blog)
      const newBlogs = blogs.filter(b => b.id !== blog.id)
      setBlogs(newBlogs)
    } catch (exception) {
      console.log(exception.message)
    }
  }

  const removeButton = () => (
    <button onClick={deleteBlog}>remove</button>
  )

  const showButton = () => (
    <button onClick={toggleVisibility}>{buttonWhenVisable}</button>
  )

  const likesFunc = () => {
    incLikes(blog)
  }

  const likesButton = () => (
    <button onClick={likesFunc}>like</button>
  )

  return(
    <div style={blogStyle}>
      <div>
        {blog.title} {showButton()}
      </div>
      <div>
        {blog.author}
      </div>
      <div style={showWhenVisable}>
        {blog.url}
      </div>
      <div className='likes' style={showWhenVisable}>
        {blog.likes} {likesButton()}
      </div>
      <div className='removeButton' style={deleteVisibility}>
        {removeButton()}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog