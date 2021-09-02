import { graphql } from "@apollo/client/react/hoc";
import React, { Component } from 'react';
import { getCategory } from "../../graphql/queries";


class CollectionPreview extends Component {
    render(){


        return(
            <div className='collection-preview'>
                <h1 className='title'>COLLECTION PREVIEW</h1>
                {/* <h2>
                    {JSON.stringify(this.props)}
                </h2> */}
                <div className='collection-item'>
                    <div className='image'
                    style={{
                        backgroundImage:``}}
                        
                    />
                    <div className='collection-footer'>
                        <h1>DIVIDER HERE</h1>
                        { this.props.data.category?.products.map( (p, index) => 
                            <span key={index}>{p.name}</span>
                        )}
                        
                    </div>
                </div>
            </div>
            ) 
    }
}

export default graphql(getCategory,{options: props => ({ 
    variables: { input: { title: props.match.params.category}}
})})(CollectionPreview)