const initialState = {
  results: null,
  amountTransaction: null,
  transactionHistory: [],
  receiver: null,
  confirmation: null,
  pageInfo: {
    totalData: 0,
    currentPage: 1,
    totalPage: 0,
    nextLink: null,
    prevLink: null
  },
  errorMsg: ''
}

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TRANSFER': {
      return {
        ...state,
        results: action.payload
      }
    }
    case 'DETAIL_TRANSACTION': {
      return {
        ...state,
        results: action.payload
      }
    }
    case 'AMOUNT_TRANSACTION': {
      return {
        ...state,
        amountTransaction: action.payload
      }
    }
    case 'TRANSACTION_HISTORY': {
      return {
        ...state,
        transactionHistory: action.payload,
        pageInfo: action.pageInfo
      }
    }
    case 'SELECT_RECEIVER': {
      return {
        ...state,
        receiver: action.payload
      }
    }
    case 'CONFIRMATION': {
      return {
        ...state,
        confirmation: action.payload
      }
    }
    case 'CLEAR_TRANSACTION': {
      return {
        ...state,
        results: null,
        amountTransaction: null,
        transactionHistory: null,
        receiver: null,
        confirmation: null,
        pageInfo: null,
        errorMsg: ''
      }
    }
    case 'SET_TRANSACTION_MESSAGE': {
      return {
        ...state,
        errorMsg: action.payload
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default transactionReducer
