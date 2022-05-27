import React, { useCallback, useEffect, useRef } from 'react';
import './App.css';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import { 
  addTickersActionCreater,
  addFindedTickersActionCreater,
  closedFindedTickersCreater,
} from './store/actions';
import { 
  getTickersSelector,
  getFindedTickersSelector,
} from './store/selector';


 const App = () => {
  const dispatch = useDispatch();
  const tickers = useSelector(getTickersSelector);
  const findedTicker = useSelector(getFindedTickersSelector);
  const refValueTicker = useRef();

  useEffect(() => {
    const socket = io.connect('http://localhost:4000');
    socket.emit('start');
    socket.on('ticker', function(response) {
      dispatch(addTickersActionCreater(response));
    })
  }, [dispatch])

  const findTicker = useCallback((t) => tickers.find((el) => el.ticker === t), [tickers]);

  useEffect(() => {
    refValueTicker.current = findTicker(findedTicker?.ticker);
  }, [findTicker, findedTicker])

  const priceDifference = findTicker(findedTicker?.ticker)?.price - refValueTicker.current?.price;


  function getFullName(name) {
    switch(name) {
      case 'AAPL':
        return 'Apple';
      case 'GOOGL':
        return 'Google';
      case 'MSFT':
        return 'Microsoft';
      case 'AMZN':
        return 'Amazon';
      case 'FB':
        return 'Facebook';
      case 'TSLA':
        return 'Tesla';
      default:
        return;
    }
  }

  return (
    <div className="App">
      <div className='tickers'>
        {tickers.map((ticker) => (
          <div 
            className='tickers__item'
            onClick={() => {
              dispatch(addFindedTickersActionCreater(findTicker(ticker.ticker)));
            }}
          >
            {
              priceDifference > 0 ?
              <div className='tickers__arrow-up'>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  focusable="false"
                  fill='#137333'
                >
                  <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
                </svg>
              </div>
              :
              <div className='tickers__arrow-down'>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  focusable="false"
                  fill='#a50e0e'
                >
                  <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
                </svg>
              </div>
            }
            <div className='tickers__description'>
              <h3 className='tickers__title'>
                {ticker.ticker}
              </h3>
              <p className='tickers__price'>
                {ticker.price}$
              </p>
            </div>
            <div className='tickers__action'>
              <p className='tickers__change'>
                {priceDifference > 0 ? '+' : '-'}{ticker.change}
              </p>
              <p className='tickers__percent'>
                {priceDifference > 0 ? '+' : '-'}{ticker.change_percent}%
              </p>
            </div>
          </div>
        ))}
      </div>
      {findedTicker
        &&
        <>
          <div className='ticker'>
            <div className='ticker__row'>
            {
              priceDifference > 0 ?
              <div className='tickers__arrow-up'>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  focusable="false"
                  fill='#137333'
                >
                  <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
                </svg>
              </div>
              :
              <div className='tickers__arrow-down'>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  focusable="false"
                  fill='#a50e0e'
                >
                  <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
                </svg>
              </div>
            }
            </div>
              <h2 className='ticker__title'>
              {getFullName(findedTicker.ticker)}
              </h2>
              <div className='ticker__subtitle'>
                {findedTicker.ticker} • {findedTicker.exchange}
              </div>
              <div className="ticker__price">
                Price: 
                <span className={priceDifference > 0 ? "ticker__price-up" : "ticker__price-down"}>
                  {findTicker(findedTicker?.ticker)?.price}$
                </span>
              </div>
              <div className="ticker__change">
                Change: 
                  <span className={priceDifference > 0 ? "ticker__change-up" : "ticker__change-down"}>
                    {priceDifference > 0 ? '+' : '-'}{findTicker(findedTicker?.ticker)?.change}$ {priceDifference > 0 ? '+' : '-'}{findTicker(findedTicker?.ticker)?.change_percent}%
                  </span>
              </div>
          </div>
          <button 
            type='button'
            className='ticker__button'
            onClick={() => {
              dispatch(closedFindedTickersCreater())
            }}
          >
            Close
          </button>
        </>
      }
    </div>
  );
}

export default App;