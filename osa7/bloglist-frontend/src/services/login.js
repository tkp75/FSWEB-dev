import axios from 'axios'
// eslint-disable-next-line no-undef
const baseUrl = (typeof BACKEND_URL === 'undefined') ? '/api/login' : BACKEND_URL + '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
