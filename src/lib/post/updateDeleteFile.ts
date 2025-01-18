import api from "../membership/axios";

export async function updateDeleteFile(id: number) {
  try {
    const response = await api.delete(`/api/post/file-destroy/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    })
    const dataUpdateDeleteFile = response?.data?.data

    return dataUpdateDeleteFile;
  } catch (error) {
    console.log(error, 'this error updateDeleteFile')
    throw error 
  }
}