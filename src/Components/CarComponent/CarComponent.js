import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const CarName = styled.span`
  display: block;
`;

const CarPrice = styled.span`
  color: gray;
`;

const CarComponent = props => {
  return (
    <div onClick={props.onOpenDialog.bind(this, props.car.id)}>
      <CarName className="car-name">{props.car.name}</CarName>
      <CarPrice className="car-price">${props.car.price}</CarPrice>
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
