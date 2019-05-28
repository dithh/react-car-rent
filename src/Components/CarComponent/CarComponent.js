import React from "react";
import { connect } from "react-redux";

const CarComponent = props => {
  return (
    <div className="car" onClick={props.onOpenDialog.bind(this, props.car.id)}>
      <span className="car-name">{props.car.name}</span>
      <span className="car-price">${props.car.price}</span>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onOpenDialog: id => {
      dispatch({ type: "UPDATE_SELECTED_CAR_INDEX", id: id });
      dispatch({ type: "SWITCH_EDIT_DIALOG" });
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CarComponent);
