import React, {useState, useEffect} from 'react'
import {Paper, Modal, Box, Button, Container, Card, FormControl, InputLabel, Select, MenuItem} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useSnackbar } from 'notistack'
import {store, Response, Restaurant} from "../features/store"
import RestaurantsTable from '../components/RestaurantsTable'
import RestaurantForm from '../components/RestaurantForm'

export default function Restaurants (): React.ReactElement {

  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [cursor, setCursor] = useState({})
  const [size, setSize] = useState<number>(10)
  const [page, setPage] = useState<number>(0)
  const [orderBy, setOrderBy] = useState<string>('updatedAt')
  const [order, setOrder] = useState<'desc' | 'asc'>('desc')
  const [filters, setFilters] = useState<any>({})
  const [filterData, setFilterData] = useState<any>({
    _public: '',
    verified: '',
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const { enqueueSnackbar } = useSnackbar()

  // initial load of restaurants
  useEffect(() => {
    loadRestaurants()
  }, [cursor, size, orderBy, order, filters])

  const loadRestaurants = (): void => {
    setLoading(true)
    store.getAll("restaurants", { ...cursor, size, orderBy, order, filters})
      .then((response: Response) => {
        setLoading(false)
        if(response.success)
          setRestaurants(response.data)
        else
          enqueueSnackbar(response.error, { variant: 'error' })
      })
  }

  const handleClose = (): void => setOpen(false)

  const formCallback = (restaurant: Restaurant): void => {
    setOpen(false)
    loadRestaurants()
  }

  const verify = (id: string): void => {
    store.update("restaurants", id, {verified: true, updatedAt: new Date().toISOString()})
      .then((response: Response) => {
        if(response.success){
          enqueueSnackbar("Restaurant verified", { variant: 'success' })
          loadRestaurants()
        }
        else
          enqueueSnackbar(response.error, { variant: 'error' })
      })
  }

  const changePage = (direction: string, doc: any): void => {
    if(direction === "next") {
      setCursor({startAfter: doc})
      setPage(page + 1)
    }
    else {
      setCursor({endBefore: doc})
      setPage(page - 1)
    }
  }

  const updateSort = (sort: any): void => {
    setOrderBy(sort.orderBy)
    setOrder(sort.order)
  }

  const updateFilters = (target: string, filter: string): void => {
    let newFilters: any = {}
    newFilters.field = target
    switch(filter){
      case 'yes': newFilters.value = true;break;
      case 'no': newFilters.value = false;break;
      case '': newFilters = {};break;
      default: break;
    }
    setFilterData({...filterData, [target]: filter})
    setFilters(newFilters)
  }

  return (
    <Paper>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Container sx={{
          height: '100vh',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Card sx={{
          padding: '2rem 3rem',
        }}>
          <RestaurantForm callback={formCallback} />
        </Card>
        </Container>
      </Modal>
      <Box p={2} textAlign='right'>
        <FormControl variant="standard" sx={{ mx: 1, minWidth: 120 }}>
          <InputLabel id="verified">verified</InputLabel>
          <Select
            labelId="verified"
            id="verified"
            value={filterData.verified}
            onChange={(e) => updateFilters('verified', (e.target.value as string))}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" endIcon={<AddIcon />} onClick={() => setOpen(true)}>
          Add a new restaurant
        </Button>
      </Box>
      <RestaurantsTable
        data={restaurants}
        size={size}
        page={page}
        sort={{orderBy, order}}
        loading={loading}
        setSort={updateSort}
        changePage={(direction: string, doc: any) => changePage(direction, doc)}
        setSize={setSize}
        verify={(id: string) => verify(id)}
      />
    </Paper>
  );
}
