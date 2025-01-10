import axios from 'axios'

export const uploadFile = async (file) => {
  if (!file) {
    alert('Please select a file first.')
    return
  }

  const formData = new FormData()
  formData.append('file', file)
  let  response;
  try {
    response = await axios.post('/api/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    alert('Upload : ' + response.data.success)
  } catch (error) {
    console.error(error)
    alert('Upload failed.')
  }
  return response.data;
}
