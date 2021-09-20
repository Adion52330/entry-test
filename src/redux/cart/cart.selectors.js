import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
   selectCart,
   //FUNCTION TO RETURN VALUE
   (cart) => {console.log(cart); return cart.cartItems}
);

export const selectCartItemsCount = createSelector(
   [selectCartItems],
   (cartItems) =>{
      return cartItems.reduce(
         (accumulatedQuantity, cartItem) =>
            accumulatedQuantity + cartItem.quantity,
         0
      )
   }
);

export const selectCartTotal = createSelector(
   selectCartItems,
    (cartItems) => {
   // console.log(cartItems);
    return cartItems.reduce(
         (accumulatedQuantity, cartItem) =>
            accumulatedQuantity + cartItem.quantity * cartItem.price,
         0
      )
   }
)

// SELECTORS TO MAKE SURE THESE COMPONENTS DONT GET RENDER WHEN THERE'S 
// CHANGES IN COMPONENTS WHICH AREN'T RELATED TO THEM