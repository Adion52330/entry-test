import React from "react";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-cart-svgrepo-com.svg";

import "./cart-icon.styles.scss";

const CartIcon = ({ toggleCartHidden, itemCount }) => {
   return <div className="cart-icon" onClick={toggleCartHidden}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
   </div>;
};

const mapDispatchToProps =  dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
})

//SELECTOR
const mapStateToProps = ({ cart: {cartItems} }) => ({
  itemCount: cartItems.reduce( (accumulatedQuantity,cartItem) => accumulatedQuantity + cartItem.quantity, 0)
})
// ARROW FUNCTION ACCUMULATES ALL THE NUMBER VALUES OF THE QUANTITY ON ALL CARTITEMS.
// 0 IS INITIAL ACCUMULATED VALUE

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon)