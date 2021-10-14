import React, { Component } from "react";
import { connect } from "react-redux";
import "./cart-item.styles.scss";
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
}

const getPrice = (currency, item) => {
   return item.prices.find((price) => price.currency === currency).amount;
};

const mapStateToProps = (state) => ({
   currency: selectCurrency(state),
});

export default connect(mapStateToProps)(CartItem);
