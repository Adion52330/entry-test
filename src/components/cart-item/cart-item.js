import React, { Component } from "react";
import "./cart-item.styles.scss";

class CartItem extends Component {
   render() {
      const {item} = this.props
      return (
         <div className="cart-item">
               <div>
               <img src={item.gallery[0]} alt="product img" />
                  <div className="item-details">
                     <span className="name">{item.name}</span>
                     <span className="price">{item.prices[0].amount}</span>
                  </div>
               </div>
         </div>
      );
   }
}

export default CartItem;
