import axios from 'axios'

// 로그인 API 호출
export const getRMDColorSet = async () => {
  try {
    const response = await axios.get('api/rmdcolorset')
    return response.data
  } catch (error) {
    throw error.response.data
  }
}
