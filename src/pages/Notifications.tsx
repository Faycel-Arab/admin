import React, {useState, useContext} from 'react'
import {Container, Box, Card, CardContent, CardActions, Typography, TextField, Button} from '@mui/material'
import {useAuth} from '../features/auth'
export default function Notifications (): React.ReactElement {

  // grab user from context provider
  const {user} = useAuth()

  return (
    <div>
      notifications
    </div>
  );
}
