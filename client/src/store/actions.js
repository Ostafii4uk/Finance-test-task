export const addTickersActionCreater =  (payload) => ({
  type: 'addTickers',
  payload,
});

export const addFindedTickersActionCreater = (payload) => ({
  type: 'findedTickers',
  payload,
});

export const closedFindedTickersCreater = () => ({
  type: 'closeTicker',
});

export const removeTickerCreator = (payload) => ({
  type: 'removeTicker',
  payload,
})

export const addFilteredTickersCreator = (payload) => ({
  type: 'addFilteredTickers',
  payload,
})
