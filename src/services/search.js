import axios from 'axios'
const baseURL = 'http://openlibrary.org/search.json'

const search = (query) => {
  const request = axios({
    baseURL,
    params: {
      title: query.split(' ').join('+')
    },
  })

  return request.then(response => response.data)
}

export default { search }