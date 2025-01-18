// ** React Imports
import { useState } from 'react'

import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

import Icon from 'src/@core/components/icon'
import Link from 'next/link'

import { deleteUser } from "src/lib/data"


interface UsersList {
  id: string;
  username: string;
  name: string;
  email: string;
}

interface UsersListProps {
  users: UsersList[]
}

interface UserList {
  id: string;
  username: string;
  name: string;
  email: string;
}

const UserList = (props: UsersListProps) => {

  const { users } = props;

  // ** States
  const [pageSize, setPageSize] = useState<number>(7)
  const [hideNameColumn, setHideNameColumn] = useState(false)
  const [open, setOpen] = useState(false); // Modal state
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null); // Selected user ID

  const handleOpenModal = (id: string) => {
    setSelectedUserId(id);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedUserId(null); // Reset selected ID
  };

  const handleConfirmDelete = async () => {
    if (selectedUserId !== null) {
      await deleteUser(selectedUserId); // Assuming this function deletes the user
      handleCloseModal(); // Close modal after successful deletion
    }
  };




  const columns: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 120,
      headerName: 'id',
      field: 'id',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.id}
        </Typography>
      )
    },
    {
      flex: 0.175,
      minWidth: 120,
      headerName: 'name',
      field: 'name',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.name}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'username',
      headerName: 'username',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.username}
        </Typography>
      )
    },
    {
      flex: 0.1,
      field: 'email',
      minWidth: 80,
      headerName: 'email',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.email}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 140,
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            <Link href={`/users/${params.row.id}`}>
             <Button   size='small' variant='outlined' color="warning"  sx={{m: 1.5}}>
             <Icon icon='mdi:eye-outline' fontSize={20} />
               view
             </Button>
             </Link>

           <Link href={`/users/editeUser/${params.row.id}`}>
           <Button size='small' variant='outlined' color="secondary" sx={{m: 1.5}} >
           <Icon icon='mdi:pencil-outline' fontSize={20} />
             edit
          </Button>
          </Link>

            <Button onClick={() => handleOpenModal(params.row.id)}  size='small' variant='outlined' color="error"  sx={{m: 1.5}} >
             <Icon icon='mdi:delete-outline' fontSize={20} />
               delete
            </Button>

         </>
        )
      }
    }
  ]


  return (
    <Card>
      <CardHeader
        title='Column'
        action={
          <div>
            <Link href={`/users/createUser`} >
            <Button size='small' variant='contained' onClick={() => setHideNameColumn(!hideNameColumn)}>
               Create New User
            </Button>
            </Link>
          </div>
        }
      />
      <DataGrid
        autoHeight
        rows={users}
        columns={columns}
        pageSize={pageSize}
        disableSelectionOnClick
        rowsPerPageOptions={[7, 10, 25, 50]}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
      />

      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="confirm-delete-modal-title"
        aria-describedby="confirm-delete-modal-description"
      >
        <Box sx={{ width: 400,
             bgcolor: 'background.paper',
             borderRadius: 1,
             boxShadow: 1,
             p: 4,
             position: 'fixed',
             top: '50%',
             left: '50%',
             transform: 'translate(-50%, -50%)', }}>
          <Typography id="confirm-delete-modal-title" variant="h5" component="h2">
            Delete User
          </Typography>
          <Typography id="confirm-delete-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this user? This action cannot be undone.
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
            <Button variant="outlined" color="error" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </Card>
  )
}

export default UserList;

