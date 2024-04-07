import React, { useState } from 'react'
import './styles/LoginStyle.css';
import { useNavigate } from 'react-router-dom'
import Image from '../images/image.jpg';

function Login() {

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate()

  const loginSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/user/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    if (json.success) {
      localStorage.setItem('token', json.authtoken)
      console.log("successful")
      navigate("/")
    } else {
      console.log("unsuccessful")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div id='main'>
      <div id="form">
        <h3>Food-App</h3>
        <form onSubmit={loginSubmit}>
          <div className="mb-3 inputs">
            <input type="email" value={credentials.email} onChange={onChange} id="email" name='email' placeholder='EMAIL' />
          </div>
          <div className="inputs">
            <input type="password" value={credentials.password} onChange={onChange} id="password" name='password' placeholder='PASSWORD' />
          </div>
          <button type="submit" id="button">LOGIN</button>
          <p><a href="/" style={{ textDecoration: 'none' }}>Forgot password?</a></p>
        </form>
      </div>
      <div id='image'>
        <img src={Image} alt=""/>
      </div>
    </div>
  )
}

export default Login
