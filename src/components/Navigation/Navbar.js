import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql } from "@apollo/client/react/hoc";
import { getCategories } from "../../graphql/queries";

class Navbar extends Component {
   render() {
      return (
         <div>
            <li>
               { this.props.data?.categories?.map((cat, index) => (
                  <Link key={index} to={`/${cat.name}`} >{cat.name}</Link>
               ))}
            </li>
         </div>
      );
   }
}

export default graphql(getCategories)(Navbar);