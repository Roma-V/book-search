import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import openLibrary from '../services/openLibrary'
import fetchHelper from '../utils/fetchTestHelpers'

describe('openLibrary service', () => {
  const mockAxios = new MockAdapter(axios)
  const mockGet = jest.fn(
    () => Promise.resolve([200, fetchHelper.fetch.mockFetchResponse])
  )

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

  describe('search', () => {
    const query = 'author'
    const parameter = openLibrary.searchParameters[1]
    const page = 2

    beforeEach(() => {
      mockAxios.onGet(openLibrary.searchURL).reply(mockGet)
    })

    afterEach(() => {
      mockAxios.reset()
      mockGet.mockReset()
    })

    test('returns a promise', async () => {
      const returnValue = openLibrary.search(query, parameter, page)
      expect(returnValue).toBeInstanceOf(Promise)
    })

    test('triggers axios get method with searchURL and defined query and parametes', async () => {
      await openLibrary.search(query, parameter, page)
      expect(mockGet).toHaveBeenCalledTimes(1)
    })

    test.todo('if parameter is not provided defaults to title')

    test.todo('if page is not provided defaults to 1')
  })

  describe('getCancelTokenSource', () => {
    test.todo('returns null before fetching')

    test.todo('return a axios.CancelToken after fetch start')

    test.todo('the CancelToken returned is the one attached to axios get call')
  })
})