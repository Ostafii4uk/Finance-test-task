import React, { useCallback, useEffect, useRef } from 'react';
import './App.css';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import { 
  addTickersActionCreater,
  addFindedTickersActionCreater,
  closedFindedTickersCreater,
  removeTickerCreator,
  addFilteredTickersCreator
} from './store/actions';
import { 
  getTickersSelector,
  getFindedTickersSelector,
  getRemovedTickersSelector,
} from './store/selector';


 const App = () => {
  const dispatch = useDispatch();
  const tickers = useSelector(getTickersSelector);
  const findedTicker = useSelector(getFindedTickersSelector);
  const refValueTicker = useRef();
  const removedTickers = useSelector(getRemovedTickersSelector);
  const tickerFromLocalStorage = localStorage.getItem('removedTickers').split(",");

  useEffect(() => {
    const socket = io.connect('http://localhost:4000');
    socket.emit('start');
    socket.on('ticker', function(response) {
      const filteredResponse = response.filter(element => {
        if (removedTickers.some(ticker => ticker === element.ticker)) {
        return false
      }
      
        return true
      })
      dispatch(addTickersActionCreater(filteredResponse));
    })
    localStorage.setItem('removedTickers', Array.from(new Set(removedTickers)));
  }, [dispatch, removedTickers])

  const findTicker = useCallback((t) => tickers.find((el) => el.ticker === t), [tickers]);

  useEffect(() => {
    refValueTicker.current = findTicker(findedTicker?.ticker);
  }, [findTicker, findedTicker])

  const priceDifference = findTicker(findedTicker?.ticker)?.price - refValueTicker.current?.price;

  console.log(tickerFromLocalStorage);

  // function filteredTickersFromServer (res, array) {
  //   const result = [];

  //   for (let i = 0; i < res.length; i++) {
  //     for (let j = 0; j < array.length; j++) {
  //       if (res[i].ticker === array[j])
  //     }
  //   }
  // }

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
            className='wrapper'
            onClick={() => {
              dispatch(addFindedTickersActionCreater(findTicker(ticker.ticker)));
            }}
          >
            <svg
              className='tickers__delete'
              onClick={() => {
                dispatch(removeTickerCreator(ticker.ticker));
                dispatch(addFilteredTickersCreator(ticker.ticker));
              }} 
              xmlns="http://www.w3.org/2000/svg"  
              viewBox="0 0 48 48" 
              width="10px" 
              height="10px"
            >
              <linearGradient 
                id="hbE9Evnj3wAjjA2RX0We2a" 
                x1="7.534" 
                x2="27.557" 
                y1="7.534" 
                y2="27.557" 
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#f44f5a"/>
                <stop offset=".443" stop-color="#ee3d4a"/>
                <stop offset="1" stop-color="#e52030"/>
              </linearGradient>
              <path 
                fill="url(#hbE9Evnj3wAjjA2RX0We2a)" 
                d="M42.42,12.401c0.774-0.774,0.774-2.028,0-2.802L38.401,5.58c-0.774-0.774-2.028-0.774-2.802,0	L24,17.179L12.401,5.58c-0.774-0.774-2.028-0.774-2.802,0L5.58,9.599c-0.774,0.774-0.774,2.028,0,2.802L17.179,24L5.58,35.599	c-0.774,0.774-0.774,2.028,0,2.802l4.019,4.019c0.774,0.774,2.028,0.774,2.802,0L42.42,12.401z"/>
              <linearGradient 
                id="hbE9Evnj3wAjjA2RX0We2b" 
                x1="27.373" 
                x2="40.507" 
                y1="27.373" 
                y2="40.507" 
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#a8142e"/>
                <stop offset=".179" stop-color="#ba1632"/>
                <stop offset=".243" stop-color="#c21734"/>
              </linearGradient>
              <path 
                fill="url(#hbE9Evnj3wAjjA2RX0We2b)" 
                d="M24,30.821L35.599,42.42c0.774,0.774,2.028,0.774,2.802,0l4.019-4.019	c0.774-0.774,0.774-2.028,0-2.802L30.821,24L24,30.821z"/>
            </svg>
            <div className='tickers__item'>
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
          </div>
        ))}
      </div>
      {findedTicker
        &&
        <>
          <div className='ticker'>
            <h2 className='ticker__title'>
              {getFullName(findedTicker.ticker)}
            </h2>
            <div className='ticker__subtitle'>
              {findedTicker.ticker} • {findedTicker.exchange}
            </div>
            <div className='ticker__price'>
              Price: {findTicker(findedTicker?.ticker)?.price}$
            </div>
            <div className='ticker__change'>
              Change: {priceDifference > 0 ? '+' : '-'}{findTicker(findedTicker?.ticker)?.change}$ {priceDifference > 0 ? '+' : '-'}{findTicker(findedTicker?.ticker)?.change_percent}%
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
