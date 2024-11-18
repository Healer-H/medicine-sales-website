import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, credentials)
    return response.data
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`)
    return response.data
  } catch (error) {
    return { success: false, message: error.message }
  }
}

// Add more API functions as needed