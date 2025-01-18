import axios from 'axios'

export async function login(userData: any) {
  try {
    const response = await axios.post('http://192.168.1.201:81/api/membership/auth/login', userData, {
      headers: {
        'Content-type': 'application/json'
      }
    })

    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}
