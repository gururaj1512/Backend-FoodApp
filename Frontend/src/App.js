import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import PlanState from './context/plans/PlanState';
import Plans from './components/Plans';

function App() {
  return (
    <div>
      <PlanState>
        <Router>
          <div>
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/plans" element={<Plans />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/signup" element={<Signup />}></Route>
            </Routes>
          </div>
        </Router>
      </PlanState>
    </div>
  )
}

export default App;
