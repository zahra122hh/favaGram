import api from "../membership/axios"

interface UpdatePost {
  data: {
    title: string;
    tags: string[]
  }
  id: number
}


export async function updatePost(updataPost: UpdatePost) {
  try {
    const id = updataPost.id
    const data = updataPost.data

    const response = await api.put(`/api/post/update/${id}`, data , {
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    })

    const dataUpdate = response?.data?.data

    console.log(dataUpdate, 'UPDATE POST TYPE 1')
    return dataUpdate

  } catch (error) {
    throw error
  }
}


