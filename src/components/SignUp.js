import React, { Component } from "react";
import axios from "axios";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: "",
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
      "https://pizza-shop-server.herokuapp.com/api/signup",
      this.state,
      { withCredentials: true },
    )
    .then(response => {
      console.log("SIGN UP success 😎", response.data);
      this.props.onUserChange(response.data.userDoc);
    })
    .catch(err => {
      console.log(err);
      alert("Sorry! There was a problem. 💩");
    });
  }

  render() {
    const { fullName, email, originalPassword } = this.state;
    const { currentUser } = this.props;

    if (currentUser) {
      return (
        <section>
          <h2>You are signed up!</h2>
          <p>
            Welcome, {currentUser.fullName}.
            Your user ID is <b>{currentUser._id}</b>.
          </p>
        </section>
      );
    }

    return (
      <section>
        <h2>Sign Up</h2>

        <form onSubmit={event => this.handleSubmit(event)}>
          <label>
            Full Name:
            <input type="text" name="fullName" placeholder="Leia Organa"
                value={fullName} onChange={event => this.genericUpdate(event)}
            />
          </label>

          <label>
            Email:
            <input type="email" name="email" placeholder="leia@senate.org"
                value={email} onChange={event => this.genericUpdate(event)}
            />
          </label>

          <label>
            Password:
            <input type="password" name="originalPassword" placeholder="*****"
                value={originalPassword} onChange={event => this.genericUpdate(event)}
            />
          </label>

          <button>Sign Up</button>
        </form>
      </section>
    );
  }
}

export default SignUp;
