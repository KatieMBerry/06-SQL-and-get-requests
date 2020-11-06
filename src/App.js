import React from "react";
import './App.css';
import Header from './Header.js';
import HomePage from './HomePage.js';
import CocktailPage from './CocktailPage.js';
import CreateCocktail from './CreateCocktail.js';
import UpdateCocktail from './UpdateCocktail.js'


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
            <Route
              path="/create"
              exact
              render={(routerProps) => <CreateCocktail {...routerProps} />}
            />
            <Route
              path="/update/:id"
              exact
              render={(routerProps) => <UpdateCocktail {...routerProps} />}
            />
          </Switch>
        </Router>
      </div>
    )
  }
}


