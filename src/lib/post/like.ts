import api from "../membership/axios"

export async function likePost(id: number) {
    try {
        const response = await api.post(`/api/post/like/${id}`, {
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            }
          } )
        const dataLike = response?.data 
        console.log(dataLike, 'like')
        
        return dataLike;

        
    } catch (error) {
        console.log(error, 'error in like ')
        throw error
    }
}