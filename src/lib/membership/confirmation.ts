import axios from 'axios'

interface ConfirmationData {
  confirmation_code: string
  username: string | string[] | undefined
}

export async function ConfirmationHandler(data: ConfirmationData) {
  try {
    const response = await axios.post('http://192.168.1.201:81/api/membership/auth/confirmation', data, {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      }
    })

    const dataConfirmation =   response.data

    console.log(dataConfirmation, 'test7')

    return dataConfirmation
  } catch (error) {
    console.error('خطا در ارسال درخواست:', error)

    throw error
  }
}


