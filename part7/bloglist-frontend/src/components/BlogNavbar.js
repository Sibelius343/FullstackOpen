import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core'

const BlogNavbar = ({ user, handleLogout }) => {
  const textStyle = {
    fontFamily: 'Roboto',
    margin: 2
  }

  return (
    <div style={{ margin: 0 }}>
      <AppBar position='fixed'>
        {user && <Toolbar>
          <Button color='inherit' component={Link} to='/'>blogs</Button>
          <Button color='inherit' component={Link} to='/users'>users</Button>
          <span style={{ flexGrow: 1 }}></span>
          <span style={textStyle}>
            {user.name} logged in <Button size='small' variant='outlined' color='inherit' type='button' onClick={handleLogout}>logout</Button>
          </span>
        </Toolbar>}
        {!user && <Toolbar>
          <Typography variant='h5'>Blog App</Typography>
        </Toolbar>}
      </AppBar>
      <Toolbar />
    </div>
  )
}

export default BlogNavbar