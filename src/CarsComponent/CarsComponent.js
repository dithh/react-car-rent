import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Header from "../HeaderComponent/HeaderComponent";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
import "../CarComponent/CarComponent.css";

import Car from "../CarComponent/CarComponent";

const CarsComponent = props => {
  let daysCount = props.daysCount;
  let filteredCars = [];
  let tableHeader = [];

  props.typeFilters.forEach(filter => {
    props.cars.forEach(car => {
      if (car.type === filter) {
        filteredCars.push(car);
      }
    });
  });

  filteredCars = filteredCars
    .filter(car => {
      return car.price <= props.maxPrice;
    })
    .sort((a, b) => {
      return a.price - b.price;
    });

  let carsRows = filteredCars.map(car => {
    let i = 0;
    let emptyCells = [];
    let daysCount = props.daysCount;
    while (daysCount) {
      emptyCells.push(
        <TableCell key={daysCount}>
          <Link
            className={
              car.daysBooked.includes(
                props.currentDate
                  .clone()
                  .add(i, "day")
                  .format("YYYY-MM-DD")
              )
                ? "disabled-link"
                : null
            }
            to={"/booking" + car.name}
          >
            {" "}
            <Button
              onClick={props.onDateChange.bind(this, i, car.id)}
              color="primary"
              variant="text"
            >
              Book
            </Button>
          </Link>
        </TableCell>
      );
      daysCount--;
      i++;
    }
    return (
      <TableRow key={car}>
        <TableCell align="center">
          <Car car={car} />
        </TableCell>
        {emptyCells}
      </TableRow>
    );
  });

  let count = 0;
  while (daysCount) {
    tableHeader.push(
      <TableCell>
        {props.currentDate
          .clone()
          .add(count, "day")
          .format("ddd")}
      </TableCell>
    );
    daysCount--;
    count++;
  }
  return (
    <Paper className="cars-table">
      <Header />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            {tableHeader}
          </TableRow>
        </TableHead>
        {carsRows}
        <TableBody />
      </Table>
    </Paper>
  );
};

const mapStateToProps = state => {
  return {
    cars: state.cars,
    maxPrice: state.maxPrice,
    typeFilters: state.typeFilters,
    daysCount: state.daysCount,
    currentDate: state.currentDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDateChange: (date, id) => {
      dispatch({ type: "UPDATE_PICKUP_DATE", val: date });
      dispatch({ type: "UPDATE_SELECTED_CAR_INDEX", id: id });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarsComponent);
