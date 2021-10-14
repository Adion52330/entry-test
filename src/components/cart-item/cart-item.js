import React, { Component } from "react";
import { connect } from "react-redux";
import "./cart-item.styles.scss";

import { graphql } from "@apollo/client/react/hoc";
import { getProduct } from "../../graphql/queries";
import { updateItem } from "../../redux/cart/cart.actions";
import { selectCurrency } from "../../redux/currencies/currency.selectors";

class CartItem extends Component {
   render() {
      const { currency, item } = this.props;

      const hasAttr = (item, attrId) =>
         item.attributes?.some((attr) => attr.id === attrId);

      return (
         <div className="cart__body">
            <div className="details">
               <h2 className="name">{item.name}</h2>
               <h3 className="brand">{item.brand}</h3>
               <p className="price">{getPrice(currency, item)}</p>
               <div className="size">
                  <div className="size__type box">
                     {hasAttr(item, "Size") &&
                        item.attributes
                           .find((attr) => attr.id === "Size")
                           .items.map((attr) => (
                              <div className="box" key={attr.value}>
                                 {" "}
                                 {attr.value}{" "}
                              </div>
                           ))}
                  </div>
               </div>
            </div>
            <div className="quantity">
               <span className="increase box">+</span>
               <span className="number">1</span>
               <span className="decrease box">-</span>
            </div>
            <div className="image">
               <img src={item.gallery[0]} alt="product img" />
            </div>
         </div>
      );
   }

  updateQuantity(value) {
    if (value === "DEC" && this.props.item.quantity <= 1) return;
    this.props.updateItem({
      id: this.props.item.id,
      update: {
        quantity: value,
      },
    });
  }
  render() {
    const {
      currency,
      item,
      data: { product },
    } = this.props;

    console.log(product);
    return (
      <div class="cart__body">
        <div class="details">
          <h2 class="name">{item.name}</h2>
          <h3 class="brand">{item.brand}</h3>
          <p class="price">{item.price.amount}</p>
          <div class="size">
            <div class="size__type box">S</div>
            <div class="size__type box">M</div>
          </div>
        </div>
        <div class="quantity">
          <span class="increase box" onClick={() => this.updateQuantity("INC")}>
            {" "}
            +{" "}
          </span>
          <span class="number">{item.quantity}</span>
          <span class="decrease box" onClick={() => this.updateQuantity("DEC")}>
            {" "}
            -{" "}
          </span>
        </div>
        <div class="image">
          <img src={item.gallery[0]} alt="product img" />
        </div>
      </div>
    );
  }

}

// const getPrice = (currency, item) => {
//   return item.prices.find((price) => price.currency === currency).amount;
// };

const mapStateToProps = (state) => ({
  currency: selectCurrency(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateItem: (item) => dispatch(updateItem(item)),
});

const graph = graphql(getProduct, {
  options: (props) => ({
    variables: { id: props.item.id },
  }),
})(CartItem);

export default connect(mapStateToProps, mapDispatchToProps)(graph);
