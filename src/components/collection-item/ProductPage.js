import { graphql } from "@apollo/client/react/hoc";
import React, { Component } from "react";
import { connect } from "react-redux";

import { getCategory } from "../../graphql/queries";
import { Link } from "react-router-dom";
import { addItem } from "../../redux/cart/cart.actions";

import "./collection-item.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

class ProductPage extends Component {
   render(props) {
      
      const { addItem } = this.props;
      return (
         <div className="category-page">
            <div className="category">
               <div className="category__title">
                  <h1>{this.props.data?.category?.name}</h1>
               </div>
               <div className="category__body">
                  {this.props.data?.category?.products?.map((p, index) => (
                     <div className="box" key={index}>
                        <Link to={`/${p.category}/${p.id}`}>
                           <div className="image-container">
                              <img
                                 className="image"
                                 style={{
                                    backgroundImage: `url("${p.gallery[0]}")`,
                                 }}
                                 alt=""
                              />
                           </div>
                        </Link>
                        <div className="product-info">
                           <p className="product-name">{p.name}</p>
                           <h3 className="price">
                              {p.prices[0].currency} {p.prices[0].amount}
                           </h3>
                           <div
                              className="show-cart-icon"
                              onClick={() => addItem(p)}>
                              <FontAwesomeIcon icon={faShoppingCart} />
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
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

export default connect(null, mapDispatchToProps)(graph);
