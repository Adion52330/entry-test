import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
   [selectCart],
   //FUNCTION TO RETURN VALUE
   (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
   [selectCartItems],
   (cartItems) =>
      cartItems.reduce(
         (accumulatedQuantity, cartItem) =>
            accumulatedQuantity + cartItem.quantity,
         0
      )
);

// SELECTORS TO MAKE SURE THESE COMPONENTS DONT GET RENDER WHEN THERE'S 
// CHANGES IN COMPONENTS WHICH AREN'T RELATED TO THEM