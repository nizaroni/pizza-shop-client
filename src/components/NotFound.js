import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section>
      <h2>404 Not Found</h2>

      <p>No pizza for you?</p>

      <Link to="/order/new">Make an Order</Link>
    </section>
  );
}

export default NotFound;
