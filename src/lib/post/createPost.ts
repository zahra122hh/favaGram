import api from '../membership/axios'

interface DataPost {
  data: {
    files: {
      path: string
      name: string
    }[]
    title: string
    tags: string[]
  }
}



export async function postHandler(dataPost: DataPost) {
  console.log(dataPost, 'datapost')
  try {
    const formData = new FormData()
    Object.keys(dataPost.data).forEach(key => {
      if (Array.isArray(dataPost.data[key])) {
        dataPost.data[key].forEach((item, index) => {
          formData.append(`${key}[${index}]`, item ?? '')
        })
      } else {
        formData.append(key, dataPost.data[key] ?? '')
      }
    })

    const response = await api.post('/api/post/store', formData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer 197|0qN1CcewI1Z47fNy7RzZWkUSEQYs2HFENfmIQAIK7897cc0b'
      }
    })
    const data = response?.data?.data

    console.log(data, 'data post ')

    return data
  } catch (error) {
    console.log(error, 'error')
    throw error
  }
}
