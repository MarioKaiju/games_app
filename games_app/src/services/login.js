import axios from "axios";
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const loged = async () => {
  const response = await axios.get(`${baseUrl}/loged`)
  return response.data
}

const logout = async () => {
  window.open("http://localhost:3001/api/logout", "_self")
}

export default { login, loged, logout }