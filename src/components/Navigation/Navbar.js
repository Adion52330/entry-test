import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { graphql } from "@apollo/client/react/hoc";
import { getCategories } from "../../graphql/queries";
import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown";

import "./navbar.styles.scss";

class Navbar extends Component {
   render() {
      const { hidden } = this.props;
      return (
         <div>
            <nav>
               <div className="menu-links">
                  {this.props.data?.categories?.map((cat, index) => (
                     <Link key={index} to={`/${cat.name}`}>
                        {cat.name}
                     </Link>
                  ))}
               </div>
               <div>
                  <CartIcon />
               </div>
            </nav>
            {hidden ? null : <CartDropdown />}
         </div>
      );
   }
}

//DESTRUCTURED THE CART OF THE STATE
const mapStateToProps = ({ cart: { hidden } }) => ({
   hidden,
});

const graph = graphql(getCategories)(Navbar);

export default connect(mapStateToProps)(graph);
