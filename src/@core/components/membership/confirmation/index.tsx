import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MuiCard, { CardProps } from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormHelperText from '@mui/material/FormHelperText'
import { styled, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import 'cleave.js/dist/addons/cleave-phone.us'
import Cleave from 'cleave.js/react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, KeyboardEvent, ReactNode, useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import CleaveWrapper from 'src/@core/styles/libs/react-cleave'
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { ConfirmationHandler } from 'src/lib/membership/confirmation'

interface Code {
  [key: string]: string
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 450 }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginLeft: theme.spacing(1),
  color: theme.palette.primary.main
}))


const CleaveInput = styled(Cleave)(({ theme }) => ({
  direction: 'ltr',
  maxWidth: 50,
  textAlign: 'center',
  height: '50px !important',
  fontSize: '150% !important',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  '&:not(:last-child)': {
    marginRight: theme.spacing(2)
  },
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    margin: 0,
    WebkitAppearance: 'none'
  }
}))


const defaultValues: {[key: string]: string} = {
  val1: '',
  val2: '',
  val3: '',
  val4: '',
  val5: '',
  val6: ''
}

const Confirmation = () => {
  const [timeLeft, setTimeLeft] = useState(60)
  const [isTimerRunning] = useState(true)

  
  useEffect(() => {
    let interval

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isTimerRunning])

  // ** State
  const [isBackspace, setIsBackspace] = useState<boolean>(false)
  const router = useRouter()
  // ** Hooks
  const theme = useTheme()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })
  

  const usernameData = router.query.username

  const onSubmit: SubmitHandler<Code> = async data => {
    try {
      const confirmationCode = Object.values(data).join('')
      const confirmation = {
        confirmation_code: confirmationCode,
        username: usernameData
      }

      const confirmationData = await ConfirmationHandler(confirmation)

      console.log(confirmationData)


      const response = await signIn('credentials', {
        username: usernameData ,
        redirect: false
      })

      if (!response.error) {
        router.replace('/admin/post')
      } else {
        throw new Error('error in response dataConfirmation')
      }
    } catch (error) {
      throw error
    }
  }

  // ** Vars
  const errorsArray = Object.keys(errors)

  const handleChange = (event: ChangeEvent, onChange: (...event: any[]) => void) => {
    if (!isBackspace) {
      onChange(event)

      // @ts-ignore
      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (form[index].value && form[index].value.length) {
        form.elements[index + 1].focus()
      }
      event.preventDefault()
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Backspace') {
      setIsBackspace(true)

      // @ts-ignore
      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (index >= 1) {
        if (!(form[index].value && form[index].value.length)) {
          form.elements[index - 1].focus()
        }
      }
    } else {
      setIsBackspace(false)
    }
  }


  const renderInputs = () => {
    return Object.keys(defaultValues).map((val, index) => (
      <Controller
        key={val}
        name={val}
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <Box
            type='tel'
            maxLength={1}
            value={value}
            autoFocus={index === 0}
            component={CleaveInput}
            onKeyDown={handleKeyDown}
            onChange={(event: ChangeEvent) => handleChange(event, onChange)}
            options={{ blocks: [1], numeral: true, numeralPositiveOnly: true }}
            sx={{ [theme.breakpoints.down('sm')]: { px: `${theme.spacing(2)} !important` } }}
          />
        )}
      />
    ))
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(15.5, 7, 9)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Avatar src='/images/avatars/logo.jpg' alt='Victor Anderson' />
            <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
              فاواگرام
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ mb: 2 }}>
              کد برایتان پیامک می شود 💬
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              ما برایتان یک کد 6 رقمی را ارسال کردیم ان را در این فیلد پایین وارد کنید
            </Typography>
            <Typography sx={{ mt: 2, fontWeight: 700 }}>{usernameData}</Typography>
          </Box>
          <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>کد 6 رقمی را در اینجا وارد کنید </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CleaveWrapper
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                ...(errorsArray.length && {
                  '& .invalid:focus': {
                    borderColor: theme => `${theme.palette.error.main} !important`,
                    boxShadow: theme => `0 1px 3px 0 ${hexToRGBA(theme.palette.error.main, 0.4)}`
                  }
                })
              }}
            >
              {renderInputs()}
            </CleaveWrapper>
            {errorsArray.length ? (
              <FormHelperText sx={{ color: 'error.main' }}>این فیلد اجباری است, کد را وارد کنید</FormHelperText>
            ) : null}

            <Button fullWidth type='submit' variant='contained' sx={{ mt: 4 }}>
              تایید
            </Button>
          </form>
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ padding: 3 }}>
              <LinkStyled
                href='/membership/sendcode'
                sx={{ color: 'text.secondary' }}
                onClick={e => e.preventDefault()}
              >
                شماره موبایل نادرست است !!
              </LinkStyled>
            </Box>
            <Box sx={{ padding: 2 }}></Box>
            {timeLeft > 0 ? <div>{timeLeft}ثانیه</div> : <div>ارسال مجدد کد </div>}
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

Confirmation.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Confirmation
