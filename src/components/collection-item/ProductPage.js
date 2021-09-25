import { graphql } from "@apollo/client/react/hoc";
import React, { Component } from "react";
import { connect } from "react-redux";

import { getCategory } from "../../graphql/queries";
import { Link } from "react-router-dom";
import { addItem } from "../../redux/cart/cart.actions";
import { selectCurrency } from "../../redux/currencies/currency.selectors";

import "./collection-item.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

class ProductPage extends Component {
   render(props) {
      const { addItem, currency } = this.props;
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
                        <h3 className="card__price">
                           {currency}{" "}
                           {
                              product.prices.find(
                                 (price) => price.currency === currency
                              ).amount
                           }
                        </h3>
                        <div
                           className="add-to-cart"
                           onClick={() => addItem(product)}>
                           <FontAwesomeIcon icon={faShoppingCart} />
                        </div>
                     </div>
                  </div>
               ))}
            </section>
         </div>
      );
   }
}

const mapDispatchToProps = (dispatch) => ({
   addItem: (item) => dispatch(addItem(item)),
});

const graph = graphql(getCategory, {
   options: (props) => ({
      variables: { input: { title: props.match.params.category } },
   }),
})(ProductPage);

const mapStateToProps = (state) => ({
   currency: selectCurrency(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(graph);
