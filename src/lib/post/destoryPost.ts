import api from '../membership/axios'

export async function destoryPost(id: number) {
  try {
    const response = await api.delete(`/api/post/destroy/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    })
    const dataDestory = response?.data?.data

    return dataDestory
  } catch (error) {
    console.log(error, 'error in delete Post')
    throw error
  }
}
