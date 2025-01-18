import { useForm } from 'react-hook-form'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import Avatar from '@mui/material/Avatar'
import Icon from 'src/@core/components/icon'

import { useRouter } from 'next/router'



import { SendCodeHandler } from 'src/lib/membership/sendcode'

interface SendCodeData {
  username: string
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 450 }
}))

const FormSendCode = () => {
  const router = useRouter()


  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SendCodeData>({
    defaultValues: {
      username: '09905328470'
    }
  })

  
  const onSubmit = async (data: SendCodeData) => {
    const sendCode = await SendCodeHandler(data)

    console.log(sendCode, 'test1')

    const username = sendCode.data
    console.log(username, 'test2')

    if (sendCode.status === true) {
      router.push({
        pathname: '/membership/confirmation',
        query: { username: username }
      })
    }
  }


  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }} >
        <CardContent sx={{ p: theme => `${theme.spacing(15.5, 7, 8)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Avatar src='/images/avatars/logo.jpg' alt='Victor Anderson' />
            <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
              فاواگرام
            </Typography>
          </Box>
          <Box sx={{ mb: 6.5 }}>
            <Typography variant='h5' sx={{ mb: 1.5, letterSpacing: '0.18px', fontWeight: 600 }}>
              صفحه ورود
            </Typography>
            <Typography variant='body2'>لطفا شماره موبایل خود را به صورت صحیح وارد کنید </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              {...register('username', { required: true })}
              aria-invalid={errors.username ? 'true' : 'false'}
              type='number'
              label='Phone No.'
              placeholder='+98-**-***-0000'
              sx={{ display: 'flex', mb: 4 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Icon icon='mdi:phone' />
                  </InputAdornment>
                )
              }}
            />
            {errors.username?.type === 'required' && (
              <p role='alert'>این فیلد اجباری است, شماره مویایل را وارد کنید </p>
            )}

            <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 5.25 }}>
              تایید
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

export default FormSendCode
