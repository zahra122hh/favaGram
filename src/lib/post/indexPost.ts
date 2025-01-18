import api from '../membership/axios'

export async function getAllPost() {
  try {
    const response = await api.get('/api/post')

    const data = response?.data?.data


    return data
  } catch (error) {
    console.error('خطا در ارسال درخواست:', error)

    throw error
  }
}


