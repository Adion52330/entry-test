import CurrencyActionTypes from "./currency.types"

const INITIAL_STATE = {
    currencies: []
}

const currencyReducer = ( state = INITIAL_STATE, action ) => {
   switch (action.type) {
       case CurrencyActionTypes.TOGGLE_CURRENCY:
           return{
            ...state,
            currencies:[...state.currencies, action.payload] 
           }
   
       default:
           return state;
   }
}

export default  currencyReducer;