import { createSelector } from "reselect";

const state = (state) => state.currency;

export const selectCurrency = createSelector(state, (c) => c.currency);