import React, { Component } from "react";
import {Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navigation/Navbar";

import ProductPage from "./components/collection-item/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from './pages/Checkout/CheckoutPage';
export default class App extends Component {
   render() {
      return (
         <div className='body'>
               <Navbar />

               <Switch>
                  <Route exact path='/checkout' component={CheckoutPage}/>
                  <Route exact path="/:category" component={ProductPage} />
                  <Route
                     path="/:category/:id"
                     component={ProductDetailPage}
                  />
                  <Redirect to="/clothes" />
               </Switch>
               
         </div>
      );
   }
}
