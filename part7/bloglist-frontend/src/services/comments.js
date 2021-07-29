import axios from 'axios'

const baseUrl = '/api/blogs'

const getComments = async blog => {
  const url = `${baseUrl}/${blog.id}/comments`
  const response = await axios.get(url)
  return response.data
}

const addComment = async (blog, comment) => {
  const url = `${baseUrl}/${blog.id}/comments`
  const response = await axios.post(url, comment)
  return response.data
}

export default { getComments, addComment }