import React, { Component } from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import CollectionPreview from './components/collection-preview/Collection-preview';
import client from './graphql/client';

export default class App extends Component {
  render(){
    return(
      <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/:category' component={CollectionPreview} />
        </Switch>
      </Router>
      </ApolloProvider>
    )
  }
}
