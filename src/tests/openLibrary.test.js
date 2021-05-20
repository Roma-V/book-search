import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import openLibrary from '../services/openLibrary'

describe('openLibrary service', () => {
  describe('coverURL', () => {
    const coverId = '839281'
    const coverSize = 'M'

    test('returns a URL to a specified cover ID and specified image size', () => {
      const url = openLibrary.coverURL(coverId, coverSize)
      expect(url).toMatch(/covers.openlibrary.org/i)
      expect(url).toMatch(`${coverId}-${coverSize}.jpg`)
    })

    test('returns a URL to a specified cover ID and Small image size if no size provided', () => {
      const url = openLibrary.coverURL(coverId)
      expect(url).toMatch(/covers.openlibrary.org/i)
      expect(url).toMatch(`${coverId}-S.jpg`)
    })
  })

  const mockAxios = new MockAdapter(axios)
  const mockFn = jest.fn()
  const mockResponse = function () {
    mockFn()
    return [200, {}]
  }
  const query = 'author'

  describe('search', () => {
    const parameter = openLibrary.searchParameters[1]
    const page = 2

    afterEach(() => {
      mockAxios.reset()
      mockFn.mockReset()
    })

    test('returns a promise', async () => {
      mockAxios.onGet(openLibrary.searchURL).reply(200)
      const returnValue = openLibrary.search(query, parameter, page)
      expect(returnValue).toBeInstanceOf(Promise)
    })

    test('triggers axios get method with searchURL and defined query and parametes', async () => {
      mockAxios.onGet(openLibrary.searchURL).reply(mockResponse)
      await openLibrary.search(query, parameter, page)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    test('if search parameter and page are not provided defaults to title and 1', async () => {
      mockAxios.onGet(
        openLibrary.searchURL,
        {
          params: {
            [openLibrary.searchParameters[0]]: query.split(' ').join('+'),
            page: 1,
          },
        }
      ).reply(mockResponse)
      await openLibrary.search(query)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('getCancelTokenSource', () => {
    beforeEach(() => {
      mockAxios.onGet(openLibrary.searchURL).reply(200)
    })

    afterEach(() => {
      mockAxios.reset()
    })

    test('returns null before fetching', () => {
      const source = openLibrary.getCancelTokenSource()
      expect(source).toBeNull()
    })

    test('return a axios.CancelToken after fetch start', () => {
      openLibrary.search(query)
      const source = openLibrary.getCancelTokenSource()

      expect(source).toBeInstanceOf(Object)
      expect(source.token).toBeInstanceOf(Object)
      expect(source.cancel).toBeInstanceOf(Function)
    })

    test('causes axios to return axios.Cancel instance with designated message', async () => {
      const getPromise = openLibrary.search(query)

      const source = openLibrary.getCancelTokenSource()
      const cancelMessage = 'Operation canceled by the user.'
      source.cancel(cancelMessage)

      getPromise.catch(e => {
        expect(e).toBeInstanceOf(axios.Cancel)
        expect(e.message).toEqual(cancelMessage)
      })
    })
  })
})