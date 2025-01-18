import api from "../membership/axios"

interface DataComment {
        user_id: number;
        body: string;
        model_type: string;
        model_id: number
}

export async function commentsPost(dataComment : DataComment) {
    try {
        const data = dataComment
        const response = await api.post('/api/comment/store', data , {
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json',
            }
          })
        const commentData = response?.data

        return commentData;

        
    } catch (error) {
        console.log(error, 'error in comments')
        throw error
    }
}