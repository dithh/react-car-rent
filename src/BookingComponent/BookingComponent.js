import React, { useState } from "react";
import { connect } from "react-redux";
import { Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {} from "../BookingComponent/BookingComponent.css";
import Button from "@material-ui/core/Button";

const Booking = props => {
  return (
    <Paper>
      <form className="flex">
        <TextField
          className="form-input"
          id="car-selected"
          label="Car selected"
          value={props.match.params.car}
          disabled
        />
        <TextField
          id="start-date"
          label="Pick Up Date"
          type="date"
          disabled
          defaultValue={props.pickUpDate.format("YYYY-MM-DD")}
        />
        <TextField
          error={props.pickUpDate.isAfter(props.dropOffDate) ? true : false}
          id="end-date"
          label="Drop Off Date"
          onChange={props.onDropOffDateUpdate}
          type="date"
          value={props.dropOffDate.format("YYYY-MM-DD")}
        />
        <Button color="primary" variant="contained">
          Book it!
        </Button>
      </form>
    </Paper>
  );
};

const mapStateToprops = state => {
  return {
    pickUpDate: state.pickUpDate,
    dropOffDate: state.dropOffDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDropOffDateUpdate: event =>
      dispatch({ type: "UPDATE_DROPOFF_DATE", val: event.target.value })
  };
};

export default connect(
  mapStateToprops,
  mapDispatchToProps
)(Booking);
