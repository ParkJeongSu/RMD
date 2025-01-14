import axios from 'axios'

// 로그인 API 호출
export const Login = async (userId, password) => {
  try {
    const response = await axios.post('/api/users/login', {
      userId,
      password,
    })
    localStorage.setItem('token', response.data.token)
    return response.data
  } catch (error) {
    throw error.response.data
  }
}
