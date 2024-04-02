import React, {useState} from 'react'
import './styles/loginStyle.css';
import { useNavigate } from 'react-router-dom'

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
      navigate("/");
    } else {
      console.log("unsuccessful")
    }
  }

  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
    <div id='main'>
      <div id='form-body'>
        <div id="form">
          <h3>Welcome back</h3>
          <form onSubmit={loginSubmit}>
            <div className="mb-3 inputs">
              <label htmlFor="email">EMAIL</label>
              <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name='email' />
            </div>
            <div className="mb-3 inputs">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password' />
            </div>
            <p><a href="" style={{textDecoration: 'none'}}>Forgot password?</a></p>
            <button type="submit" className="btn btn-primary my-3">Login</button>
          </form>
        </div>
      </div>
      <div id='foodImg'></div>
    </div>
  )
}

export default Login
