import axios from 'axios'

export const uploadFile = async (file) => {
  if (!file) {
    alert('Please select a file first.')
    return
  }

  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await axios.post('/api/file/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    alert(response.data)
  } catch (error) {
    console.error(error)
    alert('Upload failed.')
  }
}
