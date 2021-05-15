import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mockAxios = new MockAdapter(axios)

describe('openLibrary service', () => {
  describe('coverURL', () => {
    test.todo('returns a URL to a specified cover ID and specified image size')

    test.todo('returns a URL to a specified cover ID and Small image size if no size provided')
  })

  describe('search', () => {
    test.todo('returns a promise')

    test.todo('trigger axios get method with searchURL and defined query and parametes')

    test.todo('if parameter is not provided defaults to title')

    test.todo('if page is not provided defaults to 1')
  })

  describe('getCancelTokenSource', () => {
    test.todo('returns null before fetching')

    test.todo('return a axios.CancelToken after fetch start')

    test.todo('the CancelToken returned is the one attached to axios get call')
  })
})