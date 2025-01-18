import axios from 'axios'
import { getSession } from 'next-auth/react'

const api = axios.create({
  baseURL: 'http://192.168.1.201:81',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

let serverToken = ''

export function setToken(myToken: string) {
  serverToken = myToken
}

api.interceptors.request.use( async (config) => {
  const session: any  = await getSession();
  const clientToken = session?.myToken
  console.log('in dk')

  if(clientToken || serverToken) {
    config.headers!['Authorization'] = `Bearer ${clientToken ?? serverToken}`
  }

  return config

}, (error) => {
   Promise.reject(error)
}  
)

export default api;