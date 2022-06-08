import axios from 'axios'
const baseUrl = '/api/games'

const getTop = async () => {
  const response = await axios.get(`${baseUrl}/top`)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response.data
}

const createReview = async (id, review) => {
  const response = await axios.post(`${baseUrl}/comment/${id}`, {review})
  return response.data.game
}

export default { getTop, getAll, create, createReview }