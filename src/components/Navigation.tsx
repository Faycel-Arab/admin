import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import {useAuth} from '../features/auth'

export default function Navigation({toggleMenu = () => {}}: {
  toggleMenu: () => void
}): React.ReactElement {
  const {user, signOut} = useAuth()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => toggleMenu()}
          >
            <svg xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24" height="24"
              viewBox="0 0 24 24"
              className="menu-icon">
                <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"></path>
            </svg>
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', flexGrow: 1 } }}
          >
            ReStory
          </Typography>
          <Button color="inherit" variant="text">{user?.email}</Button>
          <Button color="inherit" variant="outlined" onClick={signOut}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}