import api from "../membership/axios"

interface UpdateAddFileType {
        data: {
            files: {
                path: string
                name: string
           }[]
        }, 
        id: number;
}

export async function updateAddFile(updatePost: UpdateAddFileType) {
    try {
        const id = updatePost.id;
        console.log(id, 'id')
      
    const formData = new FormData();
     Object.keys(updatePost.data).forEach(key => {
      if(Array.isArray(updatePost.data[key])) {
        updatePost.data[key].forEach((item, index) => {
          formData.append(`${key}[${index}]`, item)
        })
      }  else {
        formData.append(key, updatePost.data[key] ?? '')
      }
    })

        const response = await api.post(`/api/post/file-store/${id}`, formData, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
            }
          })
        const dataAddFile = response?.data

        return dataAddFile;

    } catch (error) {
        console.log(error, 'error in add file')
        throw error
    }
}