import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { graphql } from "@apollo/client/react/hoc";
import { getCategories } from "../../graphql/queries";
import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown";
import CurrencyDropdown from "../currency-dropdown/currency-dropdown";

import "./navbar.styles.scss";

class Navbar extends Component {
   render() {
      const { hidden } = this.props;
      return (
         <React.Fragment>
            <nav>
               <div className="menu-links">
                  {this.props.data?.categories?.map((cat, index) => (
                     <NavLink
                        key={index}
                        to={`/${cat.name}`}
                        activeClassName="active">
                        {cat.name}
                     </NavLink>
                  ))}
               </div>
               <div>LOGO</div>
               <div className="misc">
                  <CartIcon />
                  <CurrencyDropdown />
               </div>
            </nav>
            {hidden ? null : <CartDropdown />}
         </React.Fragment>
      );
   }
}

//DESTRUCTURED THE CART OF THE STATE
const mapStateToProps = ({ cart: { hidden } }) => ({
   hidden,
});

const graph = graphql(getCategories)(Navbar);

export default connect(mapStateToProps)(graph);
