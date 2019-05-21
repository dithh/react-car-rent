import React from "react";
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
          defaultValue={props.selectedDate}
        />
        <TextField
          id="end-date"
          label="Drop Off Date"
          type="date"
          defaultValue={props.selectedDate}
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
    selectedDate: state.selectedDate
  };
};

export default connect(mapStateToprops)(Booking);
