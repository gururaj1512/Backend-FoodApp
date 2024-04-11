import React from 'react'
import './styles/NavStyles.css'
import Logo from '../images/logo.jpg'
import profilePic from '../images/profilePic.webp'

function Navbar() {
  return (
    <div style={{ fontFamily: 'poppins', fontWeight: '400', width: '100%', opacity: '0.95', position: 'fixed', zIndex: '10' }}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand mx-3" href="#"><img src={Logo} alt="" style={{ height: '40px' }} /></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/plans">Plans</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>
            {localStorage.getItem('token') ? 
              <a href='/profile' style={{textDecoration: 'none'}}>
                <div className="d-flex align-items-center justify-content-evenly" style={{ width: '150px' }}>
                  <div>Profile</div>
                  <img src={profilePic} alt="" style={{ height: '40px', width: '40px', borderRadius: '50%' }} />
                </div>
              </a> : <div className="d-flex align-items-center justify-content-evenly" style={{ width: '150px' }}>
                <div> <a href="/login">Login</a></div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
