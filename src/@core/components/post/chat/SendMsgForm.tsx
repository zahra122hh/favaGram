// ** React Imports
import { useState, SyntheticEvent } from 'react'
// ** MUI Imports
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
// ** Icon Imports
import Icon from 'src/@core/components/icon'

interface SendMsgProps {
  sendMsg: string
  setSendMsg: React.Dispatch<React.SetStateAction<string>>
}


// ** Styled Components
const ChatFormWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  borderRadius: 8,
  alignItems: 'center',
  boxShadow: theme.shadows[1],
  padding: theme.spacing(1.25, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.paper
}))

const Form = styled('form')(({ theme }) => ({
  padding: theme.spacing(0, 5, 5)
}))

const SendMsgForm = ({sendMsg, setSendMsg}: SendMsgProps) => {

  const handlerSendMsg  = (event) => {
       setSendMsg(event.target.value)
  }
 
  
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <ChatFormWrapper>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            value={sendMsg}
            onChange={handlerSendMsg}
            size='small'
            placeholder='comments...'
            sx={{ '& .MuiOutlinedInput-input': { pl: 0 }, '& fieldset': { border: '0 !important' } }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size='small' sx={{ mr: 1.5, color: 'text.primary' }}>
            <Icon icon='mdi:microphone' fontSize='1.375rem' />
          </IconButton>
          <IconButton size='small' component='label' htmlFor='upload-img' sx={{ mr: 2.75, color: 'text.primary' }}>
            <Icon icon='mdi:attachment' fontSize='1.375rem' />
            <input hidden type='file' id='upload-img' />
          </IconButton>
          <Button type='submit' variant='contained'>
            ارسال
          </Button>
        </Box>
      </ChatFormWrapper>
    </ form>
  )
}

export default SendMsgForm


