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
   render() {
      const { addItem, currency } = this.props;

      const hasAttr = (attrId) =>
         this.props.data?.category?.products?.some(
            (attr) => attr.id === attrId
         );

      return (
         <div>
            <div className="category">
               <div className="category__title">
                  <h1>{this.props.data?.category?.name}</h1>
               </div>
            </div>
            <section className="cards">
               {console.log(
                  this.props.data?.category?.products.filter((obj) =>
                     obj.attributes.some((attr) => attr.id === "Color")
                  ).map(obj => obj.value)
               )}

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
                           {/* {hasAttr("Color") &&
                              this.props.data?.category?.products
                                 .find((attr) => attr.id === "Color")
                                 .items.map((attr) => (
                                    <div className="box" key={attr.value}>
                                       {attr.value}
                                    </div>
                                 ))} */}
                           {/* {console.log(
                              product.attributes.find(
                                 (attr) => attr.id === "Color"
                              )
                           )} */}
                           {/* {
                              product.filter( (obj) => obj.attributes.some(attr => attr.id === "Color")).map((attr) => (
                                 <p> {attr.value} </p>
                              ))
                           } */}

                           {/* {
                             console.log(
                                product.attributes.find(attr => attr.id === 'Color')
                             )
                          } */}

                           {product.attributes.map((attr, index) => (
                              <div
                                 className="box"
                                 key={index}
                                 style={{
                                    backgroundColor: attr.value,
                                 }}></div>
                           ))}
                           {/* {console.log(product.attributes)} */}
                        </div>
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
            {/* {
                  this.props.data?.category?.products.filter(
                     (obj) => obj.attributes.some(attr => attr.id === "Color")
                   ).map(a => <p> {a.value} </p>)
               } */}
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
