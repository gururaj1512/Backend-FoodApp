import React from 'react';
import Login from './components/Login';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './components/Signup';

function App() {

  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App;
