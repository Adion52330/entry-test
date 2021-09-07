import { graphql } from "@apollo/client/react/hoc";
import React, { Component } from "react";
import { getCategory } from "../../graphql/queries";
import { Link} from "react-router-dom";

import "./collection-item.styles.scss";

class ProductPage extends Component {
   render() {
      return (
         <div>
            <div className="collection-wrapper">
               {this.props.data.category?.products?.map((p, index) => (
                  <div className="collection-item" key={index}>
                     <Link className="image" to={`/${p.category}/${p.id}`}>
                        <img
                           className="image"
                           style={{ backgroundImage: `url("${p.gallery[0]}")` }}
                           alt=""
                        />
                     </Link>
                     <div className="collection-footer">
                        <span className="name">{p.name}</span>
                        <span className="price">
                           {p.prices[0].currency} {p.prices[0].amount}
                        </span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      );
   }
}

export default graphql(getCategory, {
   options: (props) => ({
      variables: { input: { title: props.match.params.category } },
   }),
})(ProductPage);
