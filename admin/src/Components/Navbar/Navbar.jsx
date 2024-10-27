import React from 'react'
import './Navbar.css'
import logo_admin from '../../assets/logo_admin.png'
import navProfile from '../../assets/navProfile.png';


const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={logo_admin} alt="" className="nav-logo" />
        <img src={navProfile} className='nav-profile ' alt="" />
    </div>
  )
}

export default Navbar