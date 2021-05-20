import axios from 'axios'
const searchURL = 'https://openlibrary.org/search.json'
const searchParameters = [
  'title',
  'author',
  'subject',
]

let cancelTokenSource = null

function getCancelTokenSource() {
  return cancelTokenSource
}

function coverURL(coverId, size='S') {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
}

const search = (query, parameter = searchParameters[0], page = 1) => {
  cancelTokenSource = axios.CancelToken.source()
  const request = axios.get(searchURL, {
    params: {
      [parameter]: query.split(' ').join('+'),
      page,
    },
    cancelToken: cancelTokenSource.token,
  })

  return request
    .then(response => response.data)
    .finally(() => cancelTokenSource = null)
}

export default {
  searchURL,
  searchParameters,
  coverURL,
  search,
  getCancelTokenSource,
}