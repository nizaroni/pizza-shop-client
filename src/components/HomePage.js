import React from "react";

function HomePage (props) {
  const { ingredientList } = props;

  return (
    <section>
      <h2>We Have The Freshest Ingredients</h2>
      {ingredientList}
    </section>
  );
}

export default HomePage;
