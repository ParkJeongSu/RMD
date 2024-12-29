import axios from "axios";

// 로그인 API 호출
export const login = async (userName, password) => {
    try {
      const response = await axios.post('/api/users/login', {
        userName,
        password
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };