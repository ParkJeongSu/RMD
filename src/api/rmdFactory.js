import axios from 'axios'

// 로그인 API 호출
export const updateDefaultFactory = async (obj) => {
  try {
    const response = await axios.post('api/rmdfactorys/update', obj
  )
    return response.data
  } catch (error) {
    throw error.response.data
  }
}
