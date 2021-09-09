import React, { Component } from 'react';
import './cart-item.styles.scss'

class CartItem extends Component{
    render(){
        const {  name , price  } = this.props

        return(
            <div className='cart-item'>
                <img src alt=''/>
                <div className='item-details'>
                    <span className='name'>{name}</span>
                    <span className='price'>{price}</span>
                </div>
            </div>
        )
    }
}

export default CartItem