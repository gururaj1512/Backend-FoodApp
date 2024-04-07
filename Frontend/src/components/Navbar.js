import React from 'react'
import './styles/NavStyles.css'
import Logo from '../images/logo.jpg'
import profilePic from '../images/profilePic.webp'

function Navbar() {
  return (
    <div className='nav'>
      <div id="navbar">
        <div id="logo"><img src={Logo} alt="" /></div>
        <div id="pages">
          <div id="home" className='links'><a href="/">Home</a></div>
          <div id="About-Us" className='links'><a href="/">About-Us</a></div>
          <div id="Plans" className='links'><a href="/plans">Plans</a></div>
          <div id="Profile" className='links'>
            <a href="/">Profile</a>
            <div id="Profile-pic" className='links'>
              <img src={profilePic} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
