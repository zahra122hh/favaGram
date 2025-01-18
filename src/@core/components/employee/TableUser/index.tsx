import { deletePost } from 'src/lib/data'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Button from '@mui/material/Button'

// import { useRouter } from 'next/navigation'

import Link from 'next/link'


interface Users {
  slug: string;
  userId: number;
  id: string;
  title:string;
  body: string;

}


interface TabelUserProps {
  users: Users[],
}


function TableUser (props: TabelUserProps) {

  const { users }  = props;

  console.log(props.users, "users");



  if (!users.length) {
    return <div>Loading...</div>;
  }


   return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table' >
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align='right'>UserId</TableCell>
            <TableCell align='right'>Title</TableCell>
            <TableCell align='right'>Body</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>


          {users.map(user => (
            <TableRow key={user.id}  sx={{ '&:last-of-type  td, &:last-of-type  th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {user.id}
              </TableCell>
              <TableCell align='right'>{user.id}</TableCell>
              <TableCell align='right'>{user.userId}</TableCell>
              <TableCell align='right'>{user.title}</TableCell>
              <TableCell align='right'>{user.body}</TableCell>
              <TableCell>
            <>
                <Link href={`/employee/${user.id}`}>
                   <Button   size='small' variant='outlined' color="warning"  sx={{m: 1.5}}>
                     show
                   </Button>
                </Link>

             <Link href={`/employee/editePost/${user.id}`}>
                 <Button size='small' variant='outlined' color="secondary" sx={{m: 1.5}}>
                   edit
                </Button>
             </Link>
                  <Button  onClick={() => deletePost(user.id)} size='small' variant='outlined' color="error"  sx={{m: 1.5}}>
                    delete
                  </Button>
               </>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   )


}
export default TableUser;


