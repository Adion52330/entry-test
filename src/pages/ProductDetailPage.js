import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { getProduct } from "../graphql/queries";

class ProductDetailPage extends Component {
   render() {
      return (
         <div>
            <h1>PRODUCT DETAILS</h1>
            <h2>{this.props.data?.product?.name}</h2>
         </div>
      );
   }
}

export default graphql(getProduct, {
   options: (props) => ({
      variables: { id: props.match.params.id },
   }),
})(ProductDetailPage);
