import { graphql } from '@apollo/client/react/hoc';
import React, { Component } from 'react';
import { getCategory } from '../../graphql/queries';

import './collection-item.styles.scss';

class CollectionItem extends Component{
    render(){
        return(
            <div>
                {this.props.data.category?.products.map((p,index) =>
                <div className='collection-item' key={index}>
                    <div 
                    className='image'
                    style={{ backgroundImage: p.gallery}}
                    /> 
                    <div className='collection-footer'> 
                        <span className='name'>{p.name}</span>
                        <span className='price'>{p.price}</span>
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