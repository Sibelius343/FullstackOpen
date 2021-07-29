import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  Paper,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core'

const Users = ({ users }) => {
  const history = useHistory()

  return (
    <div style={{ width: '50%', margin: 10 }}>
      <Paper elevation={3}>
        <Typography variant='h2' style={{ margin: 5 }}>Users</Typography>
        <TableContainer compontent={Paper}>
          <Table>
            <TableBody>
              {users.map(user =>
                <TableRow
                  key={user.id}
                  hover
                  onClick={() => history.push(`users/${user.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell>
                    <Typography variant='body1'>{user.name}</Typography>
                  </TableCell>
                  <TableCell>
                  submitted {user.blogs.length} blogs
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

export default Users