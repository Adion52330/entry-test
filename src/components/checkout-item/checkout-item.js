import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addItem,
  removeItem,
  clearItemFromCart,
} from "../../redux/cart/cart.actions";
import { selectCurrency } from "../../redux/currencies/currency.selectors";

import "./checkout-item.styles.scss";

class CheckoutItem extends Component {
  render() {
    const { cartItems, addItem, removeItem, clearItem, currency } = this.props;

    const { name, quantity, gallery, prices } = cartItems;

    return (
      <div className="checkout-item">
        <div className="image-container">
          <img src={gallery[0]} alt="item" />
        </div>
        <span className="name">{name}</span>
        <span className="quantity">
          <div className="arrow" onClick={() => removeItem(cartItems)}>
            {" "}
            &#10094;{" "}
          </div>
          <span className="value"> {quantity} </span>
          <div className="arrow" onClick={() => addItem(cartItems)}>
            {" "}
            &#10095;{" "}
          </div>
        </span>
        <span className="price">
          {prices.find((price) => price.currency === currency).amount}
        </span>
        <div className="remove-button" onClick={() => clearItem(cartItems)}>
          &#x2715;
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
  clearItem: (item) => dispatch(clearItemFromCart(item)),
});

const mapStateToProps = (state) => ({
  currency: selectCurrency(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutItem);