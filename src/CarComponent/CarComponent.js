import React from "react";

const CarComponent = props => {
  return (
    <div class="car">
      <span class="car-name">{props.car.name}</span>
      <span class="car-price">${props.car.price}</span>
    </div>
  );
};

export default CarComponent;
