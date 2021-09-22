import React, { Component } from "react";
import { connect } from "react-redux";
import "./cart-item.styles.scss";
import { selectCurrency } from "../../redux/currencies/currency.selectors";

class CartItem extends Component {
  render() {
    const { currency, item } = this.props;
    return (
      <div className="cart-item">
        <div>
          <img src={item.gallery[0]} alt="product img" />
          <div className="item-details">
            <span className="name">{item.name}</span>
            <span className="price">{getPrice(currency, item)}</span>
          </div>
        </div>
      </div>
    );
  }
}

const getPrice = (currency, item) => {
  return item.prices.find((price) => price.currency === currency).amount;
};

const mapStateToProps = (state) => ({
  currency: selectCurrency(state),
});

export default connect(mapStateToProps)(CartItem);