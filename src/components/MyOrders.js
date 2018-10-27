import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class MyOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: []
    };
  }

  componentDidMount() {
    axios.get(
      "https://pizza-shop-server.herokuapp.com/api/orders",
      { withCredentials: true },
    )
    .then(response => {
      console.log("My ORDERS 😲", response.data);
      this.setState({ orders: response.data });
    })
    .catch(err => {
      console.log(err);
      alert("Sorry! There was a problem. 💩");
    });
  }

  render() {
    const { orders } = this.state;

    return (
      <section>
        <h2>My Orders</h2>

        {orders.length === 0 ? (
          <div>
            <p>You don't have any orders yet</p>
            <Link to="/order/new">Make Your First Order</Link>
          </div>
        ) : (
          <ul>
            {orders.map(oneOrder =>
              <li key={oneOrder._id}>
                <h3>${oneOrder.total} on {oneOrder.createdAt}</h3>
                <p>
                  {oneOrder.size} pizza with
                  {oneOrder.ingredients.length} ingredients.
                </p>
              </li>
            )}
          </ul>
        )}
      </section>
    );
  }
}

export default MyOrders;
