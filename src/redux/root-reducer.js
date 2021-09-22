import { combineReducers } from "redux";

import cartReducer from "./cart/cart.reducer";
import currencyReducer from "./currencies/currency.reducer";


export default combineReducers({
    cart: cartReducer,
    currency: currencyReducer
})