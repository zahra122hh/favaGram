// ** MUI Imports
import Link from 'next/link'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import {CardHeader} from '@mui/material'
import TableUser from 'src/@core/components/employee/TableUser'


interface Users {
  slug: string;
  userId: number;
  id: string;
  title:string;
  body: string;

}

interface CardTableUserProps {
  users: Users[],
}


function CardTableUsers (props: CardTableUserProps){

  console.log(props.users, 'table')

  return (
    <Card>
      <CardHeader
        action={
          <div>
            <Link href={`/employee/pageCreate`}>
              <Button size='small' variant='contained'>
                Create new User
               </Button>
            </Link>

          </div>
        }
      />
          <TableUser users={props.users} />

    </Card>
  )
}

export default CardTableUsers;


