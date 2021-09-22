import React, { Component } from "react";
import { connect } from "react-redux";

import { toggleCurrency } from "../../redux/currencies/currency.actions";

import { graphql } from "@apollo/client/react/hoc";
import { getCurrencies } from "../../graphql/queries";

class CurrencyDropdown extends Component {
   render() {
      return (
         <div>
            <select name="currencies" id="currencies">
               {this.props.data?.currencies?.map((currency, index) => (
                  <option key={index} onClick={() => toggleCurrency(currency)}>
                     {" "}
                     {currency}{" "}
                  </option>
               ))}
            </select>
         </div>
      );
   }
}

const mapDispatchToProps = (dispatch) => ({
   toggleCurrency: (currency) => dispatch(toggleCurrency(currency)),
});

const graph = graphql(getCurrencies)(CurrencyDropdown);

export default connect(null, mapDispatchToProps)(graph);
