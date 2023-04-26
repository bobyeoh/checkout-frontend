import logo from './logo.svg';
import request from './api/request.js';
import api from './api/api.js';
import './App.css';
import React, { useEffect, useState } from 'react';


function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
    
  const load = () => {
    setLoading(true);
    request(api.getNumber).then((res) => {
      setCount(res.data.count);
      setLoading(false);
    }).catch(() => {
      alert("Internal Server Error");
      setLoading(false);
    });
  }

  const increase = () => {
    setLoading(true);
    request(api.updateNumber, { params: { count: count + 1 } }).then(() => load()).catch(() => {
      alert("Internal Server Error");
      setLoading(false);
    });
  }

  const reset = () => {
    setLoading(true);
    request(api.updateNumber, { params: { count: 0 } }).then(() => load()).catch(() => {
      alert("Internal Server Error");
      setLoading(false);
    });
  }

  useEffect(() => load(), []);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {
            loading ? "Loading..." : "Current number is " + count + "."
          }
        </p>
        <button
          className="App-link"
          onClick={() => increase()}
        >
          Increase +
        </button>
        <button
          className="App-link"
          onClick={() => reset()}
        >
          Reset
        </button>
      </header>
    </div>
  );
}

export default App;
