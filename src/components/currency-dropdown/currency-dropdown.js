import React, { Component } from "react";
import { connect } from "react-redux";

import { selectCurrency } from "../../redux/currencies/currency.actions";

import { graphql } from "@apollo/client/react/hoc";
import { getCurrencies } from "../../graphql/queries";

class CurrencyDropdown extends Component {
  render() {
    return (
        <select
          name="currencies"
          id="currencies"
          onChange={(e) => this.props.selectCurrency(e.target.value)}
        >
          {this.props.data?.currencies?.map((currency, index) => (
            <option key={index}> {currency} </option>
          ))}
        </select>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  selectCurrency: (currency) => dispatch(selectCurrency(currency)),
});

const graph = graphql(getCurrencies)(CurrencyDropdown);

export default connect(null, mapDispatchToProps)(graph);