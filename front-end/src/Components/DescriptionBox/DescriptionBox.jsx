import React, { useContext } from 'react'
import './DescriptionBox.css'
const DescriptionBox = (props) => {
    const {product} = props;
    
    return (
        <div className='descriptionbox'>
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Reviews (122)</div>
            </div>
            <div className="descriptionbox-description">
                <p>{product.description}</p>
                <p>
                
                </p>
            </div>
        </div>
    )
}

export default DescriptionBox