const initialState = {
  results: null,
  contact: [],
  pageInfo: {
    totalData: 0,
    currentPage: 1,
    totalPage: 0,
    nextLink: null,
    prevLink: null
  },
  errorMsg: '',
  notification: false

}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DETAIL_USER': {
      return {
        ...state,
        results: action.payload
      }
    }
    case 'CONTACT': {
      return {
        ...state,
        contact: action.payload,
        pageInfo: action.pageInfo
      }
    }
    case 'EDIT_USER_INFO': {
      return {
        ...state,
        results: action.payload
      }
    }
    case 'SET_USER_MESSAGE': {
      return {
        ...state,
        errorMsg: action.payload
      }
    }
    case 'NOTIFICATION': {
      return {
        ...state,
        notification: action.payload
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default userReducer
