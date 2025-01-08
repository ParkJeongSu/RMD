import axios from 'axios'

export const updateDefaultFactory = async (obj) => {
  try {
    const response = await axios.post('api/rmdfactorys/update', obj)
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export const getRMDFactory = async () => {
  try {
    const response = await axios.get('/api/rmdfactorys')
    return response.data
  } catch (error) {
    console.error(error)
    alert('Get FileName failed.')
  }
}

export const removeRMDFactory = async(obj) =>{
  try {
    const response = await axios.delete('api/rmdfactorys', {
      data: obj
    })
    return response.data
  } catch (error) {
    throw error.response.data
  }
}
