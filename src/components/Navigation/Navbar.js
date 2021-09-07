import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql } from "@apollo/client/react/hoc";
import { getCategories } from "../../graphql/queries";

import './navbar.styles.scss';

class Navbar extends Component {
   render() {
      return (
         <nav>
            <div className='menu-links'>
               { this.props.data?.categories?.map((cat, index) => (
                  <Link key={index} to={`/${cat.name}`} >{cat.name}</Link>
               ))}
            </div>
         </nav>
      );
   }
}

export default graphql(getCategories)(Navbar);