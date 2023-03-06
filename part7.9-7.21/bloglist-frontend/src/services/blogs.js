import axios from 'axios'
import servicesUsers from './users'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data // request.then(response => response.data)
}

const bearerToken = newToken => {
  return `Bearer ${newToken}`
}

const create = async (newObject) => {
  const token = servicesUsers.getToken()
  const config = {
    headers: { Authorization: bearerToken(token) },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addComment = async ( id, comment ) => {
  const token = servicesUsers.getToken()
  const config = {
    headers: { Authorization: bearerToken(token) },
  }
  console.log('comment', comment)
  console.log('bearerToken(token) ', bearerToken(token))
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment }, config)
  return response.data
}

const remove = async (id) => {
  const token = servicesUsers.getToken()
  const config = {
    headers: { Authorization: bearerToken(token) },
  }
  const response = await axios.delete(`${ baseUrl }/${id}`, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${ baseUrl }/${id}`, newObject)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, remove, addComment }
