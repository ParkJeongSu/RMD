import axios from 'axios'

// 로그인 API 호출
export const getAllState = async () => {
  try {
    const response = await axios.get('api/state')
    return response.data
  } catch (error) {
    throw error.response.data
  }
}
