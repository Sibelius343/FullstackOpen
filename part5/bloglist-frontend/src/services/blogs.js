import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async updateObject => {
  const url = `${baseUrl}/${updateObject.id.toString()}`
  const response = await axios.put(url, updateObject)
  return response.data
}

const remove = async toBeDeleted => {
  const config = {
    headers: { Authorization: token }
  }

  const url = `${baseUrl}/${toBeDeleted.id.toString()}`
  const response = await axios.delete(url, config)
  return response.data
}

export default { getAll, setToken, create, update, remove }