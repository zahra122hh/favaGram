import api from "../membership/axios"

export async function getShowPost(id: number) {
  try {
    const response = await api.get(`/api/post/show/${id}`)
    const showPost = response?.data?.data

    return showPost

  } catch (error) {
    throw error
  }
}