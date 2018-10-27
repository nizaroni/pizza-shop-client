import React from "react";

function Ingredient(props) {
  const { data } = props;

  return (
    <div>
      <h3>{data.name}</h3>
      <dl>
        <dt>Price</dt>
        <dd>${data.price}</dd>

        <dt>Calories</dt>
        <dd>
          {data.calories}
          {data.calories > 200 && <p>(⚠️ calorie count is high)</p>}
        </dd>
      </dl>

      {data.isVegetarian ? (
        <span>Vegetarian 🌿</span>
      ) : (
        <span>Meat 🐄</span>
      )}
    </div>
  );
}

export default Ingredient;
