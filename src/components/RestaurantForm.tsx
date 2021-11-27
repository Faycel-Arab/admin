import React, {useState} from 'react'
import { useSnackbar } from 'notistack'
import { Box, FormControl, TextField, InputLabel, OutlinedInput, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import { useAuth } from '../features/auth'
import { store, Response, Restaurant } from '../features/store'

export default function RestaurantForm({callback}: {callback: (restaurant: Restaurant) => void}) {

  const {user} = useAuth()

  const { enqueueSnackbar } = useSnackbar()

  const [data, setData] = useState({
    name: '',
    description: '',
    createdBy: user?.email,
    createdAt: '',
    updatedAt: '',
    public: true,
    verified: false,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, input: string): void => {
    setData({...data, [input]: event.target.value})
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    const restaurant: any = {...data}
    restaurant.createdAt = new Date().toISOString()
    restaurant.updatedAt = new Date().toISOString()
    store.set("restaurants", restaurant)
      .then((response: Response) => {
        if(response.success) {
          enqueueSnackbar("Restaurant added", { variant: 'success' })
          callback(response.data)
        } else
          enqueueSnackbar(response.error, { variant: 'error' })
      })
  }

  return (
    <Box>
      <Typography variant="h3" mb={5}>Add Restaurant</Typography>
      <FormControl fullWidth sx={{marginBottom: 5}}>
        <InputLabel htmlFor="component-outlined">Name</InputLabel>
        <OutlinedInput
          value={data.name}
          label="Name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'name')}
        />
      </FormControl>
      <FormControl fullWidth sx={{marginBottom: 5}}>
        <TextField
          multiline
          value={data.description}
          label="Description"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'description')}
        />
      </FormControl>
      <Box p={2} textAlign='right'>
        <Button variant="contained" endIcon={<AddIcon />} onClick={handleSubmit}>
          ADD
        </Button>
      </Box>
    </Box>
  )
}