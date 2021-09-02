import { graphql } from '@apollo/client/react/hoc';
import React, { Component } from 'react';
import { getCategory } from '../graphql/queries';

class ToyDisplay extends Component {
    
    render(){
        return <h1> TOY DISPLAY {JSON.stringify(this.props)} </h1>
        
        // <li>
        //     {this.props.data.category.name}
        // </li>
        
        // <li>

        // </li>
    }
}

export default graphql(getCategory,{options: props => ({
    variables: { input: {title: props.match.params.category}}
}) })(ToyDisplay) 

