import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      originalPassword: "",
    };
  }

  genericUpdate(event) {
    const key = event.target.name;
    this.setState({ [key]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    axios.post(
      "https://pizza-shop-server.herokuapp.com/api/login",
      this.state,
      { withCredentials: true },
    )
    .then(response => {
      console.log("LOG IN success! 😬", response.data);
      this.props.onUserChange(response.data.userDoc);
    })
    .catch(err => {
      console.log(err);
      alert("Sorry! There was a problem. 💩");
    });
  }

  render() {
    const { email, originalPassword } = this.state;

    if (this.props.currentUser) {
      return <Redirect to="/orders" />;
    }

    return (
      <section>
        <h2>Log In</h2>

        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            Email:
            <input type="email" name="email" placeholder="palpatine@empire.org"
                value={email} onChange={event => this.genericUpdate(event)}
            />
          </label>

          <label>
            Password:
            <input type="password" name="originalPassword" placeholder="****"
                value={originalPassword} onChange={event => this.genericUpdate(event)}
            />
          </label>
          <button>Log In</button>
        </form>
      </section>
    );
  }
}

export default LogIn;
