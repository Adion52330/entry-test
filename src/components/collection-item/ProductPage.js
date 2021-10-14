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

<<<<<<< HEAD
      return (
         <div>
            <div className="category">
               <div className="category__title">
                  <h1>{this.props.data?.category?.name}</h1>
               </div>
            </div>
            <section className="cards">
               {this.props.data?.category?.products.map((product, index) => (
                  <div className="card" key={index}>
                     <Link
                        to={`/${product.category}/${product.id}`}
                        className="card"
                        key={index}>
                        <div
                           className="card__image"
                           style={{
                              backgroundImage: `url("${product.gallery[0]}")`,
                           }}
                           alt=""></div>
                     </Link>
                     <div className="card__content">
                        <p className="card__title">{product.name}</p>

                        <div className="card__options">
                           {hasAttr(product, "Color") &&
                              product.attributes
                                 .find((attr) => attr.id === "Color")
                                 .items.map((attr) => (
                                    <button
                                       onClick
                                       className="box"
                                       key={attr.value}
                                       style={{
                                          backgroundColor: attr.value,
                                       }}></button>
                                 ))}
                        </div>
                        <div className="card__options">
                           {hasAttr(product, "Capacity") &&
                              product.attributes
                                 .find((attr) => attr.id === "Capacity")
                                 .items.map((attr) => (
                                    <button className="box" key={attr.value}>
                                       {attr.value}{" "}
                                    </button>
                                 ))}
                        </div>
                        <div className="card__options">
                           {hasAttr(product, "Size") &&
                              product.attributes
                                 .find((attr) => attr.id === "Size")
                                 .items.map((attr) => (
                                    <button className="box" key={attr.value}>
                                       {" "}
                                       {attr.value}{" "}
                                    </button>
                                 ))}
                        </div>

                        <h3 className="card__price">
                           {currency}{" "}
                           {
                              product.prices.find(
                                 (price) => price.currency === currency
                              ).amount
                           }
                        </h3>
=======
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
>>>>>>> 112475a44e996aa173e44b3766e572889e39c17e

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
