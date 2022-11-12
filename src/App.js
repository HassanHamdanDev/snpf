import React from 'react';
import WebCamCapture from './WebCamCapture';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Preview from './Preview.js';

function App() {
  return (

    <div className="app">
      <Router>
        <div className="app__body">
          <Routes>
            <Route path="/" element={<WebCamCapture />} />
            <Route path="/preview" element={<Preview />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
