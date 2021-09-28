import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem, removeItem } from "../../redux/cart/cart.actions";
import { selectCurrency } from "../../redux/currencies/currency.selectors";

import "./checkout-item.styles.scss";

class CheckoutItem extends Component {
   render() {
      const { cartItems, addItem, removeItem, currency } = this.props;

      const { name, brand, quantity, gallery, prices } = cartItems;

      return (
        <React.Fragment>
         <div class="cart__body">
            <div class="details">
               <h2 class="name">{name}</h2>
               <h3 class="brand">{brand}</h3>
               <p class="price">
                  {prices.find((price) => price.currency === currency).amount}
               </p>
               <div class="size">
                  <div class="size__type box">S</div>
                  <div class="size__type box">M</div>
               </div>
            </div>
            <div class="quantity">
               <span class="increase box" onClick={() => addItem(cartItems)}>
               &#43;
               </span>
               <span class="number">{quantity}</span>
               <span class="decrease box" onClick={() => removeItem(cartItems)}>
               &#8722;
               </span>
            </div>
            <div class="image">
               <img src={gallery[0]} alt="img" />
            </div>
         </div>
            <hr/>
            </React.Fragment>
      );
   }
}

const mapDispatchToProps = (dispatch) => ({
   addItem: (item) => dispatch(addItem(item)),
   removeItem: (item) => dispatch(removeItem(item)),
});

const mapStateToProps = (state) => ({
   currency: selectCurrency(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutItem);
