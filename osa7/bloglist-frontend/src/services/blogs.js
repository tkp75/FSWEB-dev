import axios from 'axios'
// eslint-disable-next-line no-undef
const baseUrl = (typeof BACKEND_URL === 'undefined') ? '/api/blogs' : BACKEND_URL + '/api/blogs'
let token = null

const setToken = newToken => {  token = `bearer ${newToken}` }

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(baseUrl+'/'+blog.id, blog, config)
  return response.data
}

const remove = async (blogId) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(baseUrl+'/'+blogId, config)
  return response.data
}

const comment = async (comment,id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl+'/'+id+'/comments', comment, config)
  return response.data
}

export default { getAll, create, update, remove, comment, setToken }