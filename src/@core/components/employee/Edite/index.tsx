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




const FormLayoutsIcons = (props: { post: { userId: number, id: string, title: string, body: string }}) => {

  const { post } = props;
  const [userId, setUserId] = useState('')
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')



  console.log(post, 'POSTEDITEDETAIL')

  function updateMessageHandler(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT', // Use PUT for updating existing resources
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
            <Grid item xs={12} >
              <TextField
                defaultValue={props.post.userId} onChange={(event) => setUserId(event.target.value)}
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

            <Grid item xs={12}>
              <TextField
                defaultValue={props.post.id} onChange={(event) => setId(event.target.value)}
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

            <Grid item xs={12}>
              <TextField
                onChange={(event) => setTitle(event.target.value)}
                fullWidth
                label='Title'
                defaultValue={props.post.title}
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
               defaultValue={props.post.body} onChange={(event) => setBody(event.target.value)}
                fullWidth
                multiline
                minRows={3}
                label='Body'
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

export default FormLayoutsIcons

