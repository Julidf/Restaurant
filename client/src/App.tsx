import React from 'react';
import logo from './logo.svg';
import './App.css';
import Landing from './components/landing/Landing'
import Home from './components/home/home'
import {Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/home' element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
