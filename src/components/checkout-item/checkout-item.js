import React, { Component } from "react";
import { connect } from "react-redux";
import { clearItemFromCart } from '../../redux/cart/cart.actions';

import "./checkout-item.styles.scss";

class CheckoutItem extends Component {
   render() {

    const { cartItems, clearItem } = this.props

      const {
           name, quantity, gallery, prices ,
      } = cartItems;

      return (
         <div className="checkout-item">
            <div className="image-container">
               <img src={gallery[0]} alt="item" />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">{quantity}</span>
            <span className="price">{prices[0].amount}</span>
            <div className="remove-button" onClick={() => clearItem(cartItems) } >&#x2715;</div>
         </div>
      );
   }
}

const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem);
