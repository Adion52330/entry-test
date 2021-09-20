import React, { Component } from "react";

import "./checkout-item.styles.scss";

class CheckoutItem extends Component {
   render() {
      const {
         cartItems: { name, quantity, gallery, prices },
      } = this.props;

      return (
         <div className="checkout-item">
            <div className="image-container">
               <img src={gallery[0]} alt="item" />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">{quantity}</span>
            <span className="price">{prices[0].amount}</span>
            <div className="remove-button">&#x2715;</div>
         </div>
      );
   }
}

export default CheckoutItem;
