import React, { useContext, useRef } from 'react'
import './Navbar.css'
import { useState } from 'react'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/nav_dropdown.png'

const Navbar = () => {
    const [menu, setMenu] = useState("shop"); 
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = () =>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');

    }
    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>Easy <span>PC</span></p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className='nav-menu'>
                <li onClick={()=> {setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link>{menu ==="shop" ? <hr/>: <></>}</li>
                <li onClick={()=> {setMenu("laptops")}}><Link style={{textDecoration: 'none'}} to='/laptops'>Laptops</Link>{menu ==="laptops" ? <hr/>: <></>}</li>
                <li onClick={()=> {setMenu("mobile-phones")}}><Link style={{textDecoration: 'none'}} to='/mobile-phones'>Mobile Phones</Link>{menu ==="mobile-phones" ? <hr/>: <></>}</li>
                <li onClick={()=> {setMenu("other")}}><Link style={{textDecoration: 'none'}} to='/other'>Other</Link>{menu ==="other" ? <hr/>: <></>}</li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token') ? <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button> : <Link to='/login'><button>Login</button></Link>}
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>

        </div>
    )
}

export default Navbar