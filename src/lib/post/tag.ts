import api from '../membership/axios'

export async function getTag() {
  try {
    const response = await api.get('/api/post/upsert-data', {
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    })

    const data = response?.data?.data

    return data
  } catch (error) {
    console.error('خطا در ارسال درخواست:', error)

    throw error
  }
}
