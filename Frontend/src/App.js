import React from 'react';
import Login from './components/Login';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route exact path="/login" element={<Login />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App;
