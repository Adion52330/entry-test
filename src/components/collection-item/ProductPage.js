import { graphql } from "@apollo/client/react/hoc";
import React, { Component } from "react";
import { connect } from "react-redux";

import { getCategory } from "../../graphql/queries";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { addItem, updateItem } from "../../redux/cart/cart.actions";
import { selectCurrency } from "../../redux/currencies/currency.selectors";

import "./collection-item.styles.scss";

import ProductItem from "./ProductItem";

class ProductPage extends Component {
  render() {
    const { addItem, currency, cartItems, updateItem } = this.props;

    const hasAttr = (product, attrId) =>
      product.attributes?.some((attr) => attr.id === attrId);

    return (
      <div>
        <div className="category">
          <div className="category__title">
            <h1>{this.props.data?.category?.name}</h1>
          </div>
        </div>
        <section className="cards">
          {/* {console.log(
                  this.props.data?.category?.products
                    
               )} */}

          {this.props.data?.category?.products.map((product, index) => (
            <ProductItem
              key={index}
              product={product}
              hasAttr={hasAttr}
              addItem={addItem}
              updateItem={updateItem}
              currency={currency}
              fromCart={cartItems.find((p) => p.id === product.id)}
            />
          ))}
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  updateItem: (item) => dispatch(updateItem(item)),
});

const graph = graphql(getCategory, {
  options: (props) => ({
    variables: { input: { title: props.match.params.category } },
  }),
})(ProductPage);

const mapStateToProps = (state) => ({
  currency: selectCurrency(state),
  cartItems: selectCartItems(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(graph);
