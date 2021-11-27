import React from 'react'
import format from 'date-fns/format'
import { Box, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, TablePagination, TableSortLabel, Button, Checkbox } from '@mui/material'
import {Restaurant} from '../features/store'

export default function RestaurantsTable ({ data, size, page, sort, loading, setSort, changePage, setSize, verify}: {
  data: Restaurant[],
  size: number,
  page: number,
  sort: any,
  loading: boolean,
  setSort: (val: any) => void,
  changePage: (direction: string, doc: any) => void,
  setSize: (size: number) => void,
  verify: (id: string) => void
}): React.ReactElement {

  const columns: any[] = [
    { field: 'name', headerName: 'Name', type: 'string', sortable: true, filterable: false },
    { field: 'description', headerName: 'Description', type: 'string', sortable: false, filterable: false },
    { field: 'createdBy', headerName: 'User', type: 'string', sortable: true, filterable: false },
    { field: 'verified', headerName: 'Verified', type: 'boolean', sortable: false, filterable: true },
    { field: '_public', headerName: 'Public', type: 'boolean', sortable: false, filterable: true },
    { field: 'updatedAt', headerName: 'Update date', type: 'date', sortable: true, filterable: false },
    { field: 'action', headerName: 'Action', type: 'action', sortable: false, filterable: false }
  ]

  const rows: any = data.map((restaurant: Restaurant) => {
    return {
      id: restaurant.id,
      name: restaurant.name,
      description: restaurant.description,
      createdBy: restaurant.createdBy,
      verified: restaurant.verified,
      _public: restaurant._public,
      updatedAt: restaurant.updatedAt,
      action: <button onClick={() => console.log(restaurant)}>Edit</button>
    }
  })

  const handleChangePage = (newPage: number): void => {
    if(newPage > page && rows.length > 0)
      changePage("next", data[rows.length - 1])
    else
      changePage("prev", data[0])
  }

  const handleSort = (field: string): void => {
    setSort({
      orderBy: field,
      order: sort.order === 'asc' ? 'desc' : 'asc'
    })
  }

  return (
    <Box>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column: any) =>
                <TableCell key={column.field}>
                  <TableSortLabel
                    active={sort.orderBy === column.field}
                    direction={sort.orderBy === column.field ? sort.order : 'desc'}
                    onClick={() => column.sortable && handleSort(column.field)}
                    hideSortIcon={!column.sortable}
                  >
                    {column.headerName}
                  </TableSortLabel>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: Restaurant) =>
              <TableRow key={row.id}>
                <TableCell key={row.name}>{row.name}</TableCell>
                <TableCell key={row.description}>{row.description}</TableCell>
                <TableCell key={row.createdBy}>{row.createdBy}</TableCell>
                <TableCell key={row.verified ? "yes" : "no"}><Checkbox disabled checked={row.verified} /></TableCell>
                <TableCell key={row._public ? "y" : "n"}><Checkbox disabled checked={row._public} /></TableCell>
                <TableCell key={row.updatedAt}>{format(new Date(row.updatedAt), 'yyyy-MM-dd HH:mm')}</TableCell>
                <TableCell key={'action'}>{!row.verified ? <Button variant="outlined" onClick={() => verify(row.id as string)}>Verify</Button> : ""}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        rowsPerPage={size}
        page={page}
        count={-1}
        onRowsPerPageChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setSize(Number(event.target.value))}
        onPageChange={(event: any, p: number) => handleChangePage(p)}
      />
    </Box>
  )
}