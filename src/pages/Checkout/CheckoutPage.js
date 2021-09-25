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
          </div>
          <hr/>
        {cartItems.map((cartItem) => (
          <CheckoutItem key={cartItem.id} cartItems={cartItem} />
        ))}
        </div>


        <div className="total">
          <span>
            total:{total} {currency}
          </span>
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