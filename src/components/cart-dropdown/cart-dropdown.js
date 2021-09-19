import React from "react";
import { connect } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart.selectors";

import CustomButton from "../custom-button/custom-button";
import CartItem from "../cart-item/cart-item";
import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems }) => (
   <div className="cart-dropdown">
      <div className="cart-items">
         {cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
         ))}
      </div>
      <CustomButton isWhite>view bag</CustomButton>
   </div>
);

//DESTRUCTURED IT OFF STATE
const mapStateToProps = (state) => ({
   cartItems: selectCartItems(state)
});

export default connect(mapStateToProps)(CartDropdown);
