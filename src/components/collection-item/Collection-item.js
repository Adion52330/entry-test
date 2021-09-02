import { graphql } from '@apollo/client/react/hoc';
import React, { Component } from 'react';
import { getCategory } from '../../graphql/queries';

import './collection-item.styles.scss';

class CollectionItem extends Component{
    render(){
        return(
            <div className='collection-wrapper'>
                {this.props.data.category?.products.map((p,index) =>
                
                <div className='collection-item' key={index}>
                    <div 
                    className='image'
                    style={{ backgroundImage: `url("${p.gallery[0]}")`}} alt='Product'
                    /> 
                    <div className='collection-footer'> 
                        <span className='name'>{p.name}</span>
                        <span className='price'>{p.prices[0].currency} {p.prices[0].amount}</span>
                    </div>
                    
                </div>
                )}
            </div>
        )
    }
};

export default graphql(getCategory,{options: props => ({ 
    variables: { input: { title: props.match.params.category}}
})})(CollectionItem)