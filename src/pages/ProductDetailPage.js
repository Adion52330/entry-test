import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { getProduct } from "../graphql/queries";

import { addItem } from "../redux/cart/cart.actions";
import { selectCurrency } from "../redux/currencies/currency.selectors";

import "./productdetail.styles.scss";
import { connect } from "react-redux";

class ProductDetailPage extends Component {
   render() {
      const { currency, addItem } = this.props;

      const hasAttr = (attrId) =>
         this.props.data?.product?.attributes?.some(
            (attr) => attr.id === attrId
         );

      return (
         <div className="product-page">
            {console.log(this.props.data?.product)}
            <div className="product-page__gallery">
               <img src={this.props.data?.product?.gallery[1]} alt="" />
               <img src={this.props.data?.product?.gallery[2]} alt="" />
               <img src={this.props.data?.product?.gallery[3]} alt="" />
            </div>
            <div className="product-page__main-image">
               <img src={this.props.data?.product?.gallery[0]} alt="" />
            </div>
            <div className="product-page__details">
               <h2 className="name">{this.props.data?.product?.name}</h2>
               <p className="brand">{this.props.data?.product?.brand}</p>
               <div className="size">
                  <div className="size__options">
                     {hasAttr("Size") &&
                        this.props.data?.product?.attributes
                           .find((attr) => attr.id === "Size")
                           .items.map((attr) => (
                              <div className="box" key={attr.value}>
                                 {attr.value}
                              </div>
                           ))}
                  </div>
                  <div className="size__options">
                     {hasAttr("Color") &&
                        this.props.data?.product?.attributes
                           .find((attr) => attr.id === "Color")
                           .items.map((attr) => (
                              <div className="box" key={attr.value}
                              style={{ backgroundColor: attr.value}}
                              >
                              </div>
                           ))}
                  </div>
                  <div className="size__options">
                     {hasAttr("Capacity") &&
                        this.props.data?.product?.attributes
                           .find((attr) => attr.id === "Capacity")
                           .items.map((attr) => (
                              <div className="box" key={attr.value}>
                                 {attr.value}
                              </div>
                              
                           ))}
                  </div>
               </div>
               <div className="price">
                  <p>price:</p>
                  <h3>
                     {currency}{" "}
                     {
                        this.props.data?.product?.prices.find(
                           (price) => price.currency === currency
                        ).amount
                     }
                  </h3>
               </div>
               <div className="add-to-cart">
                  {this.props.data?.product && (
                     <button onClick={() => addItem(this.props.data?.product)}>
                        add to cart
                     </button>
                  )}
               </div>
               <div
                  className="description"
                  dangerouslySetInnerHTML={{
                     __html: this.props.data?.product?.description,
                  }}></div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => ({
   currency: selectCurrency(state),
});

const mapDispatchToProps = (dispatch) => ({
   addItem: (item) => dispatch(addItem(item)),
});

const graph = graphql(getProduct, {
   options: (props) => ({
      variables: { id: props.match.params.id },
   }),
})(ProductDetailPage);

export default connect(mapStateToProps, mapDispatchToProps)(graph);
