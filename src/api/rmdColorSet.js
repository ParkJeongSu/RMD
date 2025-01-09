import axios from 'axios'

// get All RMDColorSet
export const getRMDColorSet = async () => {
  let response;
  try {
    const response = await axios.get('api/rmdcolorset')
    return response.data
  } catch (error) {
    // throw error.response.data
    return response.data
  }
}

export const removeRMDColorSet = async (obj) => {
  let response;
  try{
    response = await axios.delete('api/rmdcolorset',{
      data: obj
    })
    return response.data;
  }
  catch(error){
    // throw error.response.data
    return response.data;
  }
}

export const setRMDColorSet = async (obj) => {
  let response;
  try {
    const response = await axios.post('api/rmdcolorset',obj)
    return response.data
  } catch (error) {
    // throw error.response.data
    return response.data;
  }
}

export const createRMDColorSet = async (obj) => {
  let response;
  try {
    response = await axios.post('api/rmdcolorset',obj)
    return response.data
  } catch (error) {
    // throw error.response.data
    return response.data;
  }
}
