import React from "react";
import { Link } from "react-router-dom";
import { Table } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Header from "../HeaderComponent/HeaderComponent";
import { Paper } from "@material-ui/core";
import "../CarComponent/CarComponent.css";

import Car from "../CarComponent/CarComponent";

const CarsComponent = props => {
  let emptyCells = [];
  let daysCount = props.daysCount;
  while (daysCount) {
    emptyCells.push(<TableCell />);
    daysCount--;
  }
  let cars = props.carsFiltered.map(car => {
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
        {cars}
        <TableBody />
      </Table>
    </Paper>
  );
};

export default CarsComponent;
