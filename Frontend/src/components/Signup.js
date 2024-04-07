import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/SignupStyle.css'
import Image from '../images/image.jpg'

function Signup() {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confPassword: "" })
    let navigate = useNavigate()

    const signupSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/user/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, confPassword: credentials.confPassword })
        })
        const json = await response.json()
        if (json.success) {
            navigate("/login");
            console.log("successful")
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
                <form onSubmit={signupSubmit}>
                    <div className="mb-3 inputs">
                        <input type="text" value={credentials.name} onChange={onChange} id="name" name='name' placeholder='NAME' />
                    </div>
                    <div className="mb-3 inputs">
                        <input type="email" value={credentials.email} onChange={onChange} id="email" name='email' placeholder='EMAIL' />
                    </div>
                    <div className="mb-3 inputs">
                        <input type="password" value={credentials.password} onChange={onChange} id="password" name='password' placeholder='PASSWORD' />
                    </div>
                    <div className="mb-3 inputs">
                        <input type="password" value={credentials.confPassword} onChange={onChange} id="confPassword" name='confPassword' placeholder='CONFIRM PASSWORD' />
                    </div>
                    <button type="submit" className="button">Login</button>
                    <p>Already have an account? <a href="/login" style={{ textDecoration: 'none' }}>login</a></p>
                </form>
            </div>
            <div id='image'>
                <img src={Image} alt="" />
            </div>
        </div>

    )
}

export default Signup
