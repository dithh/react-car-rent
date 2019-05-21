import React from "react";

const CarComponent = props => {
  return (
    <div className="car">
      <span className="car-name">{props.car.name}</span>
      <span className="car-price">${props.car.price}</span>
    </div>
  );
};

export default CarComponent;
