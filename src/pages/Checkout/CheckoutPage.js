import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selectors";
import { selectCurrency } from "../../redux/currencies/currency.selectors";
import CheckoutItem from "../../components/checkout-item/checkout-item";

import "./checkout.styles.scss";

class CheckoutPage extends Component {
  render() {
    const { cartItems, total, currency } = this.props;
    return (
      <div className="checkout-page">
        <div className='cart'>
          <div className='cart__title'>
            <h2>CART</h2>
          </div>
          <hr/>
            {cartItems.map((cartItem) => (
              <CheckoutItem key={cartItem.id} cartItems={cartItem} />
            ))}
            
        </div>

        <div class="checkout-page__total">
         <h1 class="total-price">Total: {currency} {total}</h1>
         </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  currency: selectCurrency,
});
export default connect(mapStateToProps)(CheckoutPage);