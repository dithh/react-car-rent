import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    paddingBottom: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: 200
  }
});

const FormWrapper = styled(Paper)`
  padding: 10px;
  width: 250px;
  margin: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const ControlsWrapper = styled.span`
  display: flex;
  justify-content: space-between;
`;

const Booking = props => {
  const { classes } = props;

  const onBooking = () => {
    if (!props.pickUpDate.isAfter(props.dropOffDate)) {
      let daysToBook = Math.ceil(
        props.dropOffDate.diff(props.pickUpDate, "days", true)
      );
      for (daysToBook; daysToBook >= 0; daysToBook--) {
        props.onUpdateBookedDays(
          props.pickUpDate
            .clone()
            .add(daysToBook, "day")
            .format("YYYY-MM-DD")
        );
      }
      props.history.push({ pathname: "/" });
    } else {
      alert("Select valid date!");
    }
  };

  return (
    <FormWrapper>
      <form className={classes.textField}>
        <TextField
          className="form-input"
          id="car-selected"
          label="Car selected"
          value={
            props.cars.find(car => {
              return car.id === props.selectedCarId;
            }).name
          }
          disabled
        />
        <TextField
          className={classes.textField}
          id="start-date"
          label="Pick Up Date"
          type="date"
          disabled
          defaultValue={props.pickUpDate.format("YYYY-MM-DD")}
        />
        <TextField
          className={classes.textField}
          error={props.pickUpDate.isAfter(props.dropOffDate) ? true : false}
          helperText={
            props.pickUpDate.isAfter(props.dropOffDate)
              ? "Select valid date"
              : null
          }
          id="end-date"
          label="Drop Off Date"
          onChange={props.onDropOffDateUpdate}
          type="date"
          value={props.dropOffDate.format("YYYY-MM-DD")}
        />
        <ControlsWrapper>
          <Button component={Link} to="/">
            Go back!
          </Button>
          <Button onClick={onBooking} color="primary">
            Book it!
          </Button>{" "}
        </ControlsWrapper>
      </form>
    </FormWrapper>
  );
};

const mapStateToProps = state => {
  return {
    pickUpDate: state.pickUpDate,
    dropOffDate: state.dropOffDate,
    selectedCarId: state.selectedCarId,
    cars: state.cars
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDropOffDateUpdate: event =>
      dispatch({ type: "UPDATE_DROPOFF_DATE", val: event.target.value }),
    onUpdateBookedDays: date =>
      dispatch({ type: "UPDATE_BOOKED_DAYS", date: date })
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Booking)
);
