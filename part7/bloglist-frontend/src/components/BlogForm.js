import React, { useState } from 'react'
import { TextField, Button, Typography } from '@material-ui/core'

const BlogForm = ({ addBlog, toggleRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className='formDiv'>
      <Typography variant='h5'>Create New Blog</Typography>
      <form onSubmit={createBlog}>
        <div>
          <TextField
            id='title'
            label='Title'
            type='text'
            value={title}
            name='Title'
            fullWidth
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            id='author'
            label='Author'
            type='text'
            value={author}
            name='Author'
            fullWidth
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            id='url'
            label='URL'
            type='text'
            value={url}
            name='URL'
            fullWidth
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button
          id='create'
          variant='contained'
          size='small'
          color='primary'
          type='submit'
          style={{ marginRight: 2 }}
        >create
        </Button>
        <Button
          id='cancel'
          variant='contained'
          size='small'
          color='secondary'
          type='button'
          onClick={() => toggleRef.current.toggleVisibility()}
        >cancel
        </Button>
      </form>
    </div>
  )
}

export default BlogForm