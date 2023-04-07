import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)

  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: {Authorization: token },
  }
  console.log(newObject)
  const request = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return await request.data

}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, update }
