import React, {useState, useContext} from 'react'
import { Navigate } from 'react-router-dom'
import {Container, Box, Card, CardContent, CardActions, Typography, TextField, Button} from '@mui/material'
import { useAuth } from '../features/auth'
import Logo from '../components/Logo'

export default function Login (): React.ReactElement {

  // grab user from context provider
  const {user, signIn} = useAuth()

  if(user)
    return <Navigate to="/restaurants" />

  // cache login info
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const login = async (): Promise<void> => {
    try {
      await signIn(email, password)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container sx={{
      backgroundColor: '#edf2f7',
      height: '100vh',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Box sx={{}}>
        <Logo />
        <Card sx={{
          padding: '1rem',
        }}>
          <CardContent>
            <TextField
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              margin="normal"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </CardContent>
          <CardActions sx={{justifyContent: 'flex-end'}}>
            <Button variant="contained" onClick={login}>Login</Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
}
