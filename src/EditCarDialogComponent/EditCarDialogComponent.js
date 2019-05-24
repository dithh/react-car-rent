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
    carSelected: {}
  };

  onCarSavedHandler = car => {
    this.props.onSave(car);
    this.props.onClose();
  };

  onCarDeletedHandler = () => {
    if (window.confirm("Do you realy want to delete it?")) {
      this.props.onDelete();
      this.props.onClose();
    }
  };

  onTypeSelectedChangeHandler = event => {
    let car = { ...this.state.carSelected };
    car.type = event.target.value;
    this.setState({ carSelected: car });
  };

  onCarNameChangeHandler = event => {
    let car = { ...this.state.carSelected };
    car.name = event.target.value;
    this.setState({ carSelected: car });
  };

  onCarPriceChangeHandler = event => {
    let car = { ...this.state.carSelected };
    car.price = event.target.value;
    this.setState({ carSelected: car });
  };

  constructor(props) {
    super(props);
    let carSelected = {
      ...props.cars.find(car => car.id === props.selectedCarId)
    };
    console.log(carSelected);
    this.state.carSelected = carSelected;
  }

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
          <DialogTitle id="form-dialog-title">Edit car</DialogTitle>
          <DialogContent className={classes.container}>
            <TextField
              className={classes.textField}
              id="car-selected"
              label="Car name"
              type="text"
              onChange={this.onCarNameChangeHandler}
              value={this.state.carSelected.name}
            />
            <TextField
              className={classes.textField}
              id="start-date"
              label="Price per day"
              type="number"
              value={this.state.carSelected.price}
              onChange={this.onCarPriceChangeHandler}
            />
            <FormControl>
              <InputLabel>Car Type</InputLabel>
              <Select
                onChange={this.onTypeSelectedChangeHandler}
                className={classes.textField}
                value={this.state.carSelected.type}
              >
                {carTypesMenuItems}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose}>Go back</Button>
            <Button onClick={this.onCarDeletedHandler} color="secondary">
              Delete
            </Button>
            <Button
              onClick={this.onCarSavedHandler.bind(
                this,
                this.state.carSelected
              )}
              color="primary"
            >
              {" "}
              Save!
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    isDialogOpen: state.isEditCarDialogOpen,
    carTypes: state.carTypes,
    selectedCarId: state.selectedCarId,
    cars: state.cars
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSave: car => {
      if (car.name && car.price && car.type) {
        dispatch({ type: "CAR_EDITED", car: car });
      } else {
        alert("Fill up the form");
      }
    },
    onClose: () => {
      dispatch({ type: "SWITCH_EDIT_DIALOG" });
    },
    onDelete: () => {
      dispatch({ type: "CAR_DELETED" });
    }
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditDialog)
);
