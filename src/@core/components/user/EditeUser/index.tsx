// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import React, { useState } from 'react';




const EditeUser =(props: {user : {
  name: string;
 id: string;
 username : string;
 email: string;
 address: {
   street: string;
   suite: string;
   city: string;
   zipcode: number;
 };
 phone: number;
 website: string;
 company: {
   name: string;
   bs: string;
 }}}) => {

  const { user } = props;
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [website, setWebsite] = useState('')
  const [company, setCompany] = useState('')



  console.log(user, 'USER EDIT 8888')

  function updateMessageHandler(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'PUT', // Use PUT for updating existing resources
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        name: name,
        username: username,
        email: email,
        address: address,
        phone: phone,
        website: website,
        company: company,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Message updated successfully!');

          return response.json();
        } else {
          throw new Error('Failed to update message');
        }
      })
      .then((data) => {
        console.log(data, 'DATEUPDATE'); // Updated data (optional)
      })
      .catch((error) => {
        console.error(error);
      });
  }



  return (
    <Card>
      <CardHeader title='Form Update Posts' />
      <CardContent>
        <form onSubmit={updateMessageHandler} >

          <Grid container spacing={5}>
            <Grid item xs={6} >
              <TextField
                defaultValue={props.user.id} onChange={(event) => setId(event.target.value)}
                fullWidth
                label='User ID'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon='mdi:account-outline' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                defaultValue={props.user.name} onChange={(event) => setName(event.target.value)}
                fullWidth
                label='ID'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon='mdi:account-outline' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                onChange={(event) => setUsername(event.target.value)}
                fullWidth
                label='Title'
                defaultValue={props.user.username}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon='mdi:account-outline' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>


            <Grid item xs={6}>
              <TextField
                onChange={(event) => setEmail(event.target.value)}
                fullWidth
                label='Title'
                defaultValue={props.user.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon='mdi:account-outline' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>



            <Grid item xs={6}>
              <TextField
                onChange={(event) => setAddress(event.target.value)}
                fullWidth
                label='Title'
                defaultValue={props.user.address}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon='mdi:account-outline' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                onChange={(event) => setPhone(event.target.value)}
                fullWidth
                label='Title'
                defaultValue={props.user.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon='mdi:account-outline' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                onChange={(event) => setWebsite(event.target.value)}
                fullWidth
                label='Title'
                defaultValue={props.user.website}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon='mdi:account-outline' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>



            <Grid item xs={6}>
              <TextField
                onChange={(event) => setCompany(event.target.value)}
                fullWidth
                label='Title'
                defaultValue={props.user.company.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon='mdi:account-outline' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>





            <Grid item xs={12}>
              <Button type='submit' variant='contained' size='large'>
                Submit
              </Button>
            </Grid>
          </Grid>

        </form>
      </CardContent>
    </Card>
  )
}

export default EditeUser;

