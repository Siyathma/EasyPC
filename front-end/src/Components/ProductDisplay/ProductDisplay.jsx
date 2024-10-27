import React, { useContext } from 'react'
import './ProductDisplay.css';
import { ShopContext } from '../../Context/ShopContext';


const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={product.image} alt="" />
            </div>
        </div>

        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">{product.old_price}LKR</div>
                <div className="productdisplay-right-price-new">{product.new_price}LKR</div>
            </div>
          

            
            <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
            <p className='productdisplay-right-category'><span>Category: </span>Turbo Boost Technology, Fingerprint Sensor, Noise Cancellation</p>
            <p className='productdisplay-right-category'><span>TAgs: </span>Modern, Latest</p>
        </div>
    </div>
  )
}

export default ProductDisplay