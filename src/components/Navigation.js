import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

class Navigation extends Component {
  logOutClick() {
    axios.delete(
      "https://pizza-shop-server.herokuapp.com/api/logout",
      { withCredentials: true },
    )
    .then(() => this.props.onUserChange(null))
    .catch(err => {
      console.log(err);
      alert("Sorry! There was a problem. 💩");
    });
  }

  showUserLinks() {
    if (this.props.currentUser) {
      return (
        <span>
          <NavLink to="/order/new">Make an Order</NavLink>
          <NavLink to="/orders">My Orders</NavLink>
          <button onClick={() => this.logOutClick()}>Log Out</button>
        </span>
      );
    }
    else {
      return (
        <span>
          <NavLink exact to="/">Home</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
          <NavLink to="/login">Log In</NavLink>
        </span>
      );
    }
  }

  render() {
    return (
      <nav className="Navigation">
        {this.showUserLinks()}
      </nav>
    );
  }
}

export default Navigation;
