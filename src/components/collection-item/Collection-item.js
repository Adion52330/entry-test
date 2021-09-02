// import React, { Component } from 'react';
// import { graphql } from '@apollo/client/react/hoc';
// import './collection-item.styles.scss'
// import { getCategory } from '../../graphql/queries';

// class CollectionItem extends Component{
//     render(){
//         return(
//             {
//                 this.props.data?.products?.map(( product, index) =>(
//                     <div className='collection-item'>
//                         <div className='image'
//                         style={{
//                             backgroundImage:``}}
                            
//                         />
//                         <div className='collection-footer'>
//                             <span className='name'>{name}</span>
//                             <span className='price'>{price}</span>
//                         </div>
//                     </div>
//                 ))
//             }
//         )
//     }
// }

// export default graphql(getCategory)(CollectionItem)