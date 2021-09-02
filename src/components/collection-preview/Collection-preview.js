import { graphql } from "@apollo/client/react/hoc";
import React, { Component } from 'react';
import { getCategory } from "../../graphql/queries";
import CollectionItem from "../collection-item/Collection-item";


class CollectionPreview extends Component {


   render(){
       return(
        <div>
            { this.props.data.category?.products.map((p, index) => 
            <div className='collection-preview'> 
                <h1 className='title'> 
                    {p.name}
                </h1>
                <div className='preview'>
                    <CollectionItem key={p.index} />
                </div>
            </div>
            )}
        </div>
           

       )
   }
}

export default graphql(getCategory,{options: props => ({ 
    variables: { input: { title: props.match.params.category}}
})})(CollectionPreview)