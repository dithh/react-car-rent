import React from "react";
import { Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
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
          defaultValue={"2017-05-08"}
        />
        <TextField
          id="end-date"
          label="Drop Off Date"
          type="date"
          defaultValue={"2017-05-08"}
        />
        <Button color="primary" variant="contained">
          Book it!
        </Button>
      </form>
    </Paper>
  );
};

export default Booking;
