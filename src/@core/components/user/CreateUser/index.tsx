// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// import Snackbar from '@mui/material/Snackbar';



// ** Icon Imports
import Icon from 'src/@core/components/icon'

import React, { useState } from 'react';


function FormCreateUser () {

  const [userId, setUserId] = useState('')
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')


      function sendMessageHandler(event: React.ChangeEvent<HTMLFormElement>) {
      event.preventDefault();

      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          id: id,
          title: title,
          body: body
        }),
    })
    .then((response) => {
      if (response.ok) {
        console.log('Message sent successfully!');  

        return response.json();
      } else {
        throw new Error('Failed to send message');
      }
    })
    .then((data) => {
      console.log(data, 'data222222');
    })
    .catch((error) => {
      console.error(error);
    });
  }


  return (
    <Card>
      <CardHeader title='Basic with Icons' />
      <CardContent>
        <form onSubmit={sendMessageHandler} >
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                value={userId} onChange={(event) => setUserId(event.target.value)} 
                fullWidth
                label='User ID'
                placeholder='Entered UserId ...'
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
              <TextField
                value={id} onChange={(event) => setId(event.target.value)} 
                fullWidth
                label='ID'
                placeholder='Entered Id ...'
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
              <TextField
                value={title} onChange={(event) => setTitle(event.target.value)} 
                fullWidth
                label='Title'
                placeholder='Entered Title ...'
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
              <TextField
               value={body} onChange={(event) => setBody(event.target.value)} 
                fullWidth
                multiline
                minRows={3}
                label='Body'
                placeholder='Body...'
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Icon icon='mdi:message-outline' />
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

export default FormCreateUser;

