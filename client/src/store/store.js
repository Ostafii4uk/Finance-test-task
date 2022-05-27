import { legacy_createStore as createStore} from 'redux'

const initialState = {
  tickers: [],
  findedTickers: '',
  removedTickers: [],
  filteredTickers: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'addTickers':
      return {
        ...state,
        tickers: [...action.payload],
      }
    case 'findedTickers':
      return {
        ...state,
        findedTickers: action.payload,
      }
    case 'closeTicker':
      return {
        ...state,
        findedTickers: '',
      }
    default:
      return state;
  }
}

export const store = createStore(reducer);