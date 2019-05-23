import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

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

class EditDialog extends Component {
  state = {
    car: {
      name: "",
      price: 0,
      type: "",
      daysBooked: []
    }
  };

  onTypeSelectedChangeHandler = event => {
    let car = { ...this.state.car };
    car.type = event.target.value;
    this.setState({ car: car });
  };

  onCarNameChangeHandler = event => {
    let car = { ...this.state.car };
    car.name = event.target.value;
    this.setState({ car: car });
  };

  onCarPriceChangeHandler = event => {
    let car = { ...this.state.car };
    car.price = event.target.value;
    this.setState({ car: car });
  };

  onCarAdd = car => {
    if (
      this.state.car.name != "" &&
      this.state.car.price &&
      this.state.car.type != ""
    ) {
      this.props.onCloseDialog();
      this.props.onAddCar(car);
    } else {
      alert("fill up the form");
    }
  };

  render() {
    let { classes } = this.props;
    let carTypesMenuItems = this.props.carTypes.map(type => {
      return (
        <MenuItem value={type} key={type}>
          {type}
        </MenuItem>
      );
    });
    return (
      <form>
        <Dialog open={this.props.isDialogOpen}>
          <DialogTitle id="form-dialog-title">Add new car</DialogTitle>
          <DialogContent className={classes.container}>
            <TextField
              className={classes.textField}
              id="car-selected"
              label="Car name"
              type="text"
              value={this.state.car.name}
              onChange={this.onCarNameChangeHandler}
            />
            <TextField
              className={classes.textField}
              value={this.state.car.price}
              onChange={this.onCarPriceChangeHandler}
              id="start-date"
              label="Price per day"
              type="number"
            />
            <FormControl>
              <InputLabel>Car Type</InputLabel>
              <Select
                onChange={this.onTypeSelectedChangeHandler}
                value={this.state.car.type}
                className={classes.textField}
              >
                {carTypesMenuItems}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onCloseDialog} color="secondary">
              Go back
            </Button>
            <Button
              onClick={this.onCarAdd.bind(this, this.state.car)}
              color="primary"
            >
              {" "}
              Add a car!
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return { isDialogOpen: state.isDialogOpen, carTypes: state.carTypes };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddCar: car => {
      {
        dispatch({ type: "ADD_NEW_CAR", car: car });
      }
    },
    onCloseDialog: () => dispatch({ type: "SWITCH_DIALOG" })
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditDialog)
);
