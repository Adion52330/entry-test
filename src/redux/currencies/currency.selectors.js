import { createSelector } from "reselect";

const selectCurrency = (state) => state.currency;
console.log(selectCurrency)