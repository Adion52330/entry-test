import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { getCurrencies } from "../../graphql/queries";


class CurrencyDropdown extends Component {
   render() {
      return (
         <div>
            <select name="currencies" id="currencies">
                {
                    this.props.data?.currencies?.map((currency, index) => (
                        <option key={index}> {currency} </option>
                    ))
                }
            </select>
         </div>
      );
   }
}

export default graphql(getCurrencies)(CurrencyDropdown)