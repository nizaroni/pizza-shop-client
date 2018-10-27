import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from "axios";

import './App.css';

import Navigation from "./components/Navigation.js";
import Ingredient from "./components/Ingredient.js";
import OrderForm from './components/OrderForm';
import HomePage from './components/HomePage.js';
import NotFound from './components/NotFound.js';
import SignUp from './components/SignUp.js';
import LogIn from './components/LogIn.js';
import MyOrders from './components/MyOrders';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      ingredients: []
    };
  }

  componentDidMount() {
    axios.get(
      "https://pizza-shop-server.herokuapp.com/api/checklogin",
      { withCredentials: true },
    )
    .then(response => {
      console.log("CHECK LOGIN success! 🤯", response.data);
      this.setState({ currentUser: response.data.userDoc });
    })
    .catch(err => {
      console.log(err);
      alert("Sorry! There was a problem. 💩");
    });

    axios.get(
      "https://pizza-shop-server.herokuapp.com/api/ingredients",
      { withCredentials: true },
    )
    .then(response => {
      console.log("INGREDIENTS 🍄", response.data);
      this.setState({ ingredients: response.data });
    })
    .catch(err => {
      console.log(err);
      alert("Sorry! There was a problem. 💩");
    });
  }

  updateUser(userDoc) {
    this.setState({ currentUser: userDoc });
  }

  render() {
    const { currentUser, ingredients } = this.state;

    const ingredientList = ingredients.map(oneIngredient =>
      <Ingredient key={oneIngredient._id} data={oneIngredient} />
    );

    return (
      <main>
        <header>
          <h1>Pizza Shop</h1>
          <Navigation currentUser={currentUser}
              onUserChange={userDoc => this.updateUser(userDoc)}
          />
        </header>

        <Switch>
          <Route exact path="/" render={() =>
              <HomePage ingredientList={ingredientList} />
          }/>
          <Route path="/signup" render={() =>
              <SignUp currentUser={currentUser}
                onUserChange={userDoc => this.updateUser(userDoc)}
              />
          }/>
          <Route path="/login" render={() =>
              <LogIn currentUser={currentUser}
                  onUserChange={userDoc => this.updateUser(userDoc)}
              />
          }/>
          <Route path="/order/new"
              // use RENDER when sending props to a route component
              render={() => <OrderForm ingredients={ingredients} />}
          />
          <Route path="/orders" component={MyOrders} />

          {/* Make your 404 component LAST */}
          <Route component={NotFound} />
        </Switch>

        <footer>
          <p>Made with 🍕 at Ironhack</p>
        </footer>
      </main>
    );
  }
}

export default App;
