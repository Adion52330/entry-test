import { createSelector } from "reselect";
import { selectCurrency } from "../currencies/currency.selectors";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  selectCart,
  //FUNCTION TO RETURN VALUE
  (cart) => {
    return cart.cartItems;
  }
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) => {
    return cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    );
  }
);

export const selectCartTotal = createSelector(
  [selectCartItems, selectCurrency],
  (cartItems, currency) => {
    return cartItems.reduce((accumulatedQuantity, cartItem) => {
      const price = cartItem.prices.find((price) => price.currency === currency)
        .amount;
      return accumulatedQuantity + cartItem.quantity * price;
    }, 0);
  }
);

// SELECTORS TO MAKE SURE THESE COMPONENTS DONT GET RENDER WHEN THERE'S
// CHANGES IN COMPONENTS WHICH AREN'T RELATED TO THEM