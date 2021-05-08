/**
 * Actions
 */
const fetchAction = {
  type: 'books/fetchBooks/pending',
  meta: {
    arg: {
      query: 'onegin',
      searchParameter: 'title'
    },
    requestId: 'mc7oZ9b1B_wFH2QhyFmo3',
    requestStatus: 'pending'
  }
}

const fetchedAction = {
  type: 'books/fetchBooks/fulfilled',
  payload: {
    numFound: 2,
    start: 0,
    docs: [
      {
        key: 'b1',
        title: 'Evgeniĭ Onegin',
        type: 'work',
        first_publish_year: 1833,
        author_name: ['Aleksandr Sergeyevich Pushkin'],
      },
      {
        key: 'b2',
        title: 'Evgenii Onegin',
        type: 'work',
        first_publish_year: 1919,
        author_name: ['Aleksandr Sergeyevich Pushkin'],
      },
    ],
    num_found: 2
  },
  meta: {
    arg: {
      query: 'onegin',
      searchParameter: 'title'
    },
    requestId: 'mc7oZ9b1B_wFH2QhyFmo3',
    requestStatus: 'fulfilled'
  }
}

const rejectAction = {
  type: 'books/fetchBooks/rejected',
  meta: {
    arg: {
      query: 'onegin',
      searchParameter: 'title'
    },
    requestId: 'JtQRiuK_zemaSdhCCjyKM',
    rejectedWithValue: false,
    requestStatus: 'rejected',
    aborted: false,
    condition: false
  },
  error: {
    message: 'Loading canceled.'
  }
}

/**
 * States
 */
const initialState = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
  meta: null,
}

const fetchingState = {
  ...initialState,
  status: 'loading',
  error: null,
  meta: {
    query: {
      query: 'onegin',
      searchParameter: 'title'
    }
  }
}

const fetchedState = {
  ...fetchingState,
  status: 'succeeded',
  meta: {
    ...fetchingState.meta,
    numFound: 2,
    start: 0
  },
  ids: fetchedAction.payload.docs.map(book => book.key),
  entities: {
    b1: {
      ...fetchedAction.payload.docs[0],
      id: fetchedAction.payload.docs[0].key
    },
    b2: {
      ...fetchedAction.payload.docs[1],
      id: fetchedAction.payload.docs[1].key
    }
  },
}

const fetchRejectedState = {
  ...fetchingState,
  status: 'failed',
  error: {
    message: 'Loading canceled.'
  },
}

const testFetchQuery = { query: 'onegin', searchParameter: 'title' }

const mockFetchResponse = {
  numFound: 2,
  start: 0,
  docs: [
    {
      title: 'Evgeni\u012d Onegin',
      key: '/works/OL623499W',
      author_name: ['Aleksandr Sergeyevich Pushkin'],
      first_publish_year: 1833,
    },
    {
      title: 'Onegin',
      key: '/works/OL16488894W',
      first_publish_year: 2011,
      author_name: ['Aleksandr Sergeyevich Pushkin'],
    },
  ],
  num_found: 2
}

const fetchStartAction = {
  type: 'books/fetchBooks/pending',
  meta: {
    arg: testFetchQuery,
    requestStatus: 'pending'
  },
  payload: undefined,
}

const fetchSuccessAction = {
  type: 'books/fetchBooks/fulfilled',
  payload: mockFetchResponse,
  meta: {
    arg: testFetchQuery,
    requestStatus: 'fulfilled'
  }
}

const fetchRejectedAction = {
  type: 'books/fetchBooks/rejected',
  payload: undefined,
  meta: {
    arg: testFetchQuery,
    rejectedWithValue: false,
    requestStatus: 'rejected',
    aborted: false,
    condition: false
  },
  error: {  message: 'Network Error' }
}

const expectedFetchSuccessActions = [
  fetchStartAction,
  fetchSuccessAction,
]

const expectedFetchRejectedActions = [
  fetchStartAction,
  fetchRejectedAction,
]

export default {
  states: {
    initialState,
    fetchingState,
    fetchedState,
    fetchRejectedState,
  },
  actions: {
    fetchAction,
    fetchedAction,
    rejectAction,
  },
  fetch: {
    testFetchQuery,
    mockFetchResponse,
    expectedFetchSuccessActions,
    expectedFetchRejectedActions,
  }
}