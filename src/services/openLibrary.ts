import axios, { CancelTokenSource } from 'axios'
const searchURL = 'https://openlibrary.org/search.json'
const searchParameters = [
  'title',
  'author',
  'subject',
]

let cancelTokenSource: CancelTokenSource | null = null

function getCancelTokenSource() {
  return cancelTokenSource
}

function coverURL(coverId: string, size='S') {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
}

const search = (query: string, parameter = searchParameters[0], page = 1) => {
  cancelTokenSource = axios.CancelToken.source()
  const request = axios.get(searchURL, {
    params: {
      [parameter]: query.split(' ').join('+'),
      page,
    },
    cancelToken: cancelTokenSource.token,
  })

  return request
    .then((response): unknown => response.data as unknown)
    .finally(() => cancelTokenSource = null)
}

export default {
  searchURL,
  searchParameters,
  coverURL,
  search,
  getCancelTokenSource,
}