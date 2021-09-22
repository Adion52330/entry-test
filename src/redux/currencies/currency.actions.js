import CurrencyActionTypes from './currency.types'

export const toggleCurrency = (currency) => ({
    type: CurrencyActionTypes.TOGGLE_CURRENCY,
    payload: currency
})