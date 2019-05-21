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
  let filteredCars = [];

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
    let emptyCells = [];
    let daysCount = props.daysCount;
    while (daysCount) {
      emptyCells.push(
        <TableCell>
          <Link to={"/booking" + car.name}>
            <Button color="primary" variant="contained">
              Book
            </Button>
          </Link>
        </TableCell>
      );
      daysCount--;
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
  return (
    <Paper class="cars-table">
      <Header changeDateHandler={props.changeDateHandler} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Link to="/bookingSkoda Rapid">Book</Link>
            </TableCell>
            <TableCell align="center">Mon </TableCell>
            <TableCell align="center">Tue</TableCell>
            <TableCell align="center">Wed </TableCell>
            <TableCell align="center">Thu</TableCell>
            <TableCell align="center">Fri</TableCell>
            <TableCell align="center">Sat</TableCell>
            <TableCell align="center">Sun</TableCell>
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
    daysCount: state.daysCount
  };
};

export default connect(mapStateToProps)(CarsComponent);
