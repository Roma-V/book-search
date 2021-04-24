import axios from 'axios'
const searchURL = 'https://openlibrary.org/search.json'
const searchParameters = [
  'title',
  'author',
  'subject',
]

function coverURL(coverId) {
  return `https://covers.openlibrary.org/b/id/${coverId}-S.jpg`
}

const search = (query, parameter = searchParameters[0]) => {
  const request = axios({
    baseURL: searchURL,
    params: {
      [parameter]: query.split(' ').join('+')
    },
  })

  return request.then(response => response.data)
}

export default { coverURL, search, searchParameters }