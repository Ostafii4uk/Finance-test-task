import React, { useEffect, useState } from 'react';
import './App.css';
import { io } from "socket.io-client";


 const App = () => {
  const [tickers, setTickers] = useState([]);

  useEffect(() => {
      const socket = io.connect('http://localhost:4000');
      socket.emit('start');
      socket.on('ticker', function(response) {
        
        setTickers(response);
      })
  }, [])

  console.log(tickers );

  return (
    <div className="App">
      Hello!
    </div>
  );
}

export default App;
