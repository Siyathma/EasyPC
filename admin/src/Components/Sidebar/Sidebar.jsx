import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom';
import addProduct_icon from '../../assets/addProduct_icon.png'
import listProduct_icon from '../../assets/listProduct_icon.png'


const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'} style={{textDecoration: "none"}}>
            <div className="sidebar-item">
                <img src={addProduct_icon} alt="" />
                <p>Add Product</p>
            </div>
        </Link>

        <Link to={'/listproduct'} style={{textDecoration: "none"}}>
            <div className="sidebar-item">
                <img src={listProduct_icon} alt="" />
                <p>Product List</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar