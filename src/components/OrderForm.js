import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class OrderForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      size: "large",
      ingredients: [],
      isSubmitSuccessful: false,
    };
  }

  genericUpdate(event) {
    const key = event.target.name;

    if (key === "ingredients") {
      // set ingredients to whatever it was before PLUS the new one
      this.setState({ ingredients: [...this.state.ingredients, event.target.value] });
    }
    else {
      this.setState({ [key]: event.target.value });
    }
  }

  handleSubmit(event) {
    // stop the page refresh (we are handling everything in JS)
    event.preventDefault();

    axios.post(
      "https://pizza-shop-server.herokuapp.com/api/orders",
      this.state,
      { withCredentials: true },
    )
    .then(response => {
      console.log("Order SUBMIT success! 🍕", response.data);
      this.setState({ isSubmitSuccessful: true });
    })
    .catch(err => {
      console.log(err);
      alert("Sorry! There was a problem. 💩");
    });
  }

  render() {
    const { isSubmitSuccessful, size, ingredients } = this.state;

    if (isSubmitSuccessful) {
      return <Redirect to="/orders" />
    }

    return (
      <section>
        <h2>Make an Order</h2>

        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            Pizza Size
            <select name="size" value={size}
                onChange={event => this.genericUpdate(event)}>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </label>

          <label>
            Ingredients
            <select name="ingredients" onChange={event => this.genericUpdate(event)}>
              <option value="">Select your ingredient...</option>
              {this.props.ingredients.map(oneIngredient =>
                <option key={oneIngredient._id} value={oneIngredient._id}>
                  {oneIngredient.name}
                </option>
              )}
            </select>
          </label>

          <ul>
            {ingredients.map(ingredientId =>
              <li key={ingredientId}>{ingredientId}</li>
            )}
          </ul>

          <button>Submit Order</button>
        </form>
      </section>
    );
  }
}

export default OrderForm;
