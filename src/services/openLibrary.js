import axios from 'axios'
const searchURL = 'https://openlibrary.org/search.json'
const coverURL = 'https://covers.openlibrary.org/b/id'

const search = (query) => {
  const request = axios({
    baseURL: searchURL,
    params: {
      title: query.split(' ').join('+')
    },
  })

  return request.then(response => response.data)
}

export default { coverURL, search }