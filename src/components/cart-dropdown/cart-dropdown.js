import React from "react";
import { connect } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { withRouter } from "react-router-dom";

import CustomButton from "../custom-button/custom-button";
import CartItem from "../cart-item/cart-item";
import "./cart-dropdown.styles.scss";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

const CartDropdown = ({ cartItems, history, dispatch }) => (
   <div className="cart-dropdown">
      <div class="title">
            <span class="heading"> <span class="bold">my bag</span> 2 items </span> 
      </div>

      <div class="cart">
            {cartItems.length ? (
               cartItems.map((cartItem) => (
                  <CartItem key={cartItem.id} item={cartItem} />
               ))
            ) : (
               <span className="empty-message"> Your cart is empty</span>
            )}       
      </div>   
      <div className='buttons'>
      <CustomButton isWhite>view bag</CustomButton>
      <CustomButton
         onClick={() => {
            history.push("/checkout");
            dispatch(toggleCartHidden())
         }}>
         checkout
      </CustomButton>
      </div>
   </div>
);

//DESTRUCTURED IT OFF STATE
const mapStateToProps = (state) => ({
   cartItems: selectCartItems(state),
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
//CONNECT PASSES DISPATCH PROPS IF SECOND ARGUMENT IS NOT SUPPLIED
// IF mapDispatchToProps IS NOT SUPPLIED AS SECOND ARGUMENT
