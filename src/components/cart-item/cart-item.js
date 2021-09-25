import React, { Component } from "react";
import { connect } from "react-redux";
import "./cart-item.styles.scss";
import { selectCurrency } from "../../redux/currencies/currency.selectors";

class CartItem extends Component {
   render() {
      const { currency, item } = this.props;
      return (
         <div class="cart__body">
            <div class="details">
               <h2 class="name">{item.name}</h2>
               <h3 class="brand">{item.brand}</h3>
               <p class="price">{getPrice(currency, item)}</p>
               <div class="size">
                  <div class="size__type box">S</div>
                  <div class="size__type box">M</div>
               </div>
            </div>
            <div class="quantity">
               <span class="increase box">+</span>
               <span class="number">1</span>
               <span class="decrease box">-</span>
            </div>
            <div class="image">
               <img src={item.gallery[0]} alt="product img" />
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
