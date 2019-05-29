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
import { stat } from "fs";

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

class AddDialog extends Component {
  state = {
    car: {
      name: "",
      price: 0,
      type: "",
      daysBooked: []
    },
    carNameError: false,
    priceError: false,
    selectTypeError: false
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

  onCarAdd = selectedCar => {
    if (this.state.car.name && this.state.car.price && this.state.car.type) {
      if (
        this.props.cars.find(
          car => car.name.toLowerCase() === selectedCar.name.toLowerCase()
        )
      ) {
        this.setState({ carNameError: true });
      } else {
        this.props.onCloseDialog();
        this.props.onAddCar(selectedCar);
      }
    } else {
      this.setState({
        carNameError: !this.state.car.name ? true : false,
        priceError: this.state.car.price === 0 ? true : false,
        selectTypeError: !this.state.car.type ? true : false
      });
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
      <Dialog className={"add-car-dialog"} open={this.props.isDialogOpen}>
        <form>
          <DialogTitle id="form-dialog-title">Add new car</DialogTitle>
          <DialogContent className={classes.container}>
            <TextField
              className={classes.textField}
              id="car-selected"
              required="true"
              label="Car name"
              type="text"
              value={this.state.car.name}
              onChange={this.onCarNameChangeHandler}
              error={this.state.carNameError}
              helperText={
                this.state.carNameError ? "Enter valid car name" : null
              }
            />
            <TextField
              className={classes.textField}
              value={this.state.car.price}
              onChange={this.onCarPriceChangeHandler}
              id="start-date"
              label="Price per day"
              type="number"
              error={this.state.priceError}
              helperText={this.state.priceError ? "Enter valid price" : null}
            />
            <FormControl>
              <InputLabel>Car Type</InputLabel>
              <Select
                onChange={this.onTypeSelectedChangeHandler}
                value={this.state.car.type}
                className={classes.textField}
                error={this.state.selectTypeError}
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
        </form>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    isDialogOpen: state.isAddCarDialogOpen,
    carTypes: state.carTypes,
    cars: state.cars
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddCar: car => {
      dispatch({ type: "ADD_NEW_CAR", car: car });
    },
    onCloseDialog: () => dispatch({ type: "SWITCH_ADD_DIALOG" })
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddDialog)
);
