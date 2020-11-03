import React from "react";
import './App.css';
import Header from './Header.js';
import HomePage from './HomePage.js';
import CocktailPage from './CocktailPage.js';


import {
  BrowserRouter as Router,
  Switch,
  Route

} from "react-router-dom";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            <Route
              path="/"
              exact
              render={(routerProps) => <HomePage {...routerProps} />}
            />
            <Route
              path="/cocktails"
              exact
              render={(routerProps) => <CocktailPage {...routerProps} />}
            />
          </Switch>
        </Router>
      </div>
    )
  }
}


