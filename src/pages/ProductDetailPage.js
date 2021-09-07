import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getProduct } from '../graphql/queries';

class ProductDetailPage extends Component {
    render(){
        return (
            <div>
                <h1>PRODUCT DETAILS PAGE</h1>
                {
                    this.props.data.category?.products?.id?.map( (p,index) =>
                    <span key={index}> {p.name} </span>
                    )
                }
                
            </div>
        )
    }
}

export default graphql(getProduct, {
    options: (props) => ({
       variables: { id: { title: props.match.params.category.products }},
    }),
 })(ProductDetailPage);
