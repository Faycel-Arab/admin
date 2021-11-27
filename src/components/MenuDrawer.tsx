import React, {useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {Box, Drawer, List, ListItem, ListItemText, ListItemIcon} from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import StorefrontIcon from '@mui/icons-material/Storefront'
import Logo from '../components/Logo'

export default function MenuDrawer({isVisible= false, setVisibility=  (visibility: boolean): void => {}}: {
  isVisible: boolean,
  setVisibility: (visibility: boolean) => void
}): React.ReactElement {

  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Drawer
      anchor='left'
      open={isVisible}
      onClose={() => setVisibility(false)}
    >
      <Box
        sx={{ width: 'auto' }}
        role="presentation"
        onClick={() => setVisibility(false)}
      >
        <Box>
          <Logo />
        </Box>
        <List>
          <ListItem
            button
            key="Notifications"
            onClick={() => navigate('/notifications')}
            selected={location.pathname === "/notifications"}
            sx={{
              paddingRight: '8rem',
            }}
          >
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>
          <ListItem
            button
            key="Restaurants"
            onClick={() => navigate('/restaurants')}
            selected={location.pathname === "/restaurants" || location.pathname === "/"}
          >
            <ListItemIcon>
              <StorefrontIcon />
            </ListItemIcon>
            <ListItemText primary="Restaurants" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}