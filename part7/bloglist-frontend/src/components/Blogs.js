import React, { useRef } from 'react'
//import BlogListItem from './BlogListItem'
import Toggleable from './Toggleable'
import BlogForm from './BlogForm'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification, setError } from '../reducers/messageReducer'
import { Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const Blogs = ({ blogs }) => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const history = useHistory()

  const addBlogHandler = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(addBlog(blogObject))
      dispatch(setNotification(`${blogObject.title} by ${blogObject.author} added`, 5))

    } catch (exception) {
      setError(exception.message, 5)
    }
  }

  const toggledBlogForm = () => (
    <Toggleable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm addBlog={addBlogHandler} toggleRef={blogFormRef}></BlogForm>
    </Toggleable>
  )

  return (
    <div style={{ margin: 10 }}>
      <Paper elevation={3}>
        <Typography variant='h2' style={{ margin: 5 }}>Blogs</Typography>
        {toggledBlogForm()}
        <TableContainer compontent={Paper}>
          <Table>
            <TableBody>
              {blogs.map(blog =>
                <TableRow
                  key={blog.id}
                  hover
                  onClick={() => history.push(`/blogs/${blog.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell>
                    <Typography variant='h6'>{blog.title}</Typography> by {blog.author}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}

export default Blogs