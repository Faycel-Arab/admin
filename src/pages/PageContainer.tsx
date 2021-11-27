import React, {useState} from 'react'
import {Container, Box, Card, CardContent, CardActions, Typography, TextField, Button} from '@mui/material'
import MenuDrawer from '../components/MenuDrawer'
import Navigation from '../components/Navigation'

export default function PageContainer({children}: {children: React.ReactNode}): React.ReactElement {

  const [drawerDisplay, setDrawerDisplay] = useState<boolean>(false)

  return (
    <>
      <MenuDrawer isVisible={drawerDisplay} setVisibility={(visibility) => setDrawerDisplay(visibility)} />
      <Navigation toggleMenu={() => setDrawerDisplay(!drawerDisplay)} />
      <div className="content">{children}</div>
    </>
  );
}