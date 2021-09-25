import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { getProduct } from "../graphql/queries";

// import '../assets/sass/_colors_fonts.scss'
import "./productdetail.styles.scss";

class ProductDetailPage extends Component {
   render() {
      // const hasAttr = (product, attrId) => product.attributes.some(attr => attr.id=== attrId) ;
      // const hasColor = hasAttr(product, "Color");
      return (
         <div className="product-page">
            {/* {JSON.stringify(this.props.data)} */}
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
                  <p>SIZE</p>
                  <div className="size__options">
                     {/* {hasColor && product.attributes.find(attr => attr.id === 'Color').map(color => <p>{color.value}</p>)} */}
                     {/* <div className="box">{this.props.data?.product?.attributes.items[0].value}</div> */}
                     <div className="box">s</div>
                     <div className="box">m</div>
                     <div className="box">l</div>
                  </div>
               </div>
               <div className="price">
                  <p>price:</p>
                  <h3>{this.props.data?.product?.price}</h3>
               </div>
               <div className="add-to-cart">
                  <button>add to cart</button>
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

export default graphql(getProduct, {
   options: (props) => ({
      variables: { id: props.match.params.id },
   }),
})(ProductDetailPage);
