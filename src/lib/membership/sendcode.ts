import axios from 'axios'

interface SendCodeData {
  username: string
}

export async function SendCodeHandler(data: SendCodeData) {
  try {
    const response = await axios.post('http://192.168.1.201:81/api/membership/auth/sendcode', data, {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      }
    })

    const dataSend = response.data

    console.log(dataSend, 'test3')

    return dataSend
  } catch (error) {
    console.error('خطا در ارسال درخواست:', 'اینجا خطا میده 111', error)

    throw error
  }
}





