import React from 'react'
import { Link } from 'react-router-dom'

const BlogListItem = ({ blog }) => {
  return (
    <>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title}
      </Link> by {blog.author}
    </>
  )
}

export default BlogListItem