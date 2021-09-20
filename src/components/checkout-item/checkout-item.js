import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem, removeItem ,clearItemFromCart } from "../../redux/cart/cart.actions";

import "./checkout-item.styles.scss";

class CheckoutItem extends Component {
   render() {
      const { cartItems, addItem, removeItem, clearItem } = this.props;

      const { name, quantity, gallery, prices } = cartItems;

      return (
         <div className="checkout-item">
            <div className="image-container">
               <img src={gallery[0]} alt="item" />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
               <div className="arrow" onClick={() => removeItem(cartItems)}> &#10094; </div>
               <span className="value"> {quantity} </span>
               <div className="arrow" onClick={() => addItem(cartItems)}> &#10095; </div>
            </span>
            <span className="price">{prices[0].amount}</span>
            <div className="remove-button" onClick={() => clearItem(cartItems)}>
               &#x2715;
            </div>
         </div>
      );
   }
}

const mapDispatchToProps = (dispatch) => ({
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item)),
   clearItem: (item) => dispatch(clearItemFromCart(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
