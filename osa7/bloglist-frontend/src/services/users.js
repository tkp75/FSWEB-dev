import axios from 'axios'
// eslint-disable-next-line no-undef
const baseUrl = (typeof BACKEND_URL === 'undefined') ? '/api/users' : BACKEND_URL + '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }