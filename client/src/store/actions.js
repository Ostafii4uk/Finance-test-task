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

