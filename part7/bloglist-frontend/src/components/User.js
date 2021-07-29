import React from 'react'
import { Paper, Typography } from '@material-ui/core'

const User = ({ user }) => {
  if(!user) {
    return (
      <div></div>
    )
  }
  console.log(user)

  return (
    <div style={{ width: '50%', margin: 10 }}>
      <Paper elevation={3} style={{ padding: 10 }}>
        <Typography variant='h3'>{user.name}</Typography>
        <br />
        <Typography variant='h5'>Added blogs:</Typography>
        <ul>
          {user.blogs.map(blog => (
            <li key={blog.id}>
              <Typography variant='body1'>
                {blog.title}
              </Typography>
            </li>
          ))}
        </ul>
      </Paper>
    </div>
  )
}

export default User