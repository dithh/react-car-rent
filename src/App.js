import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Paper } from "@material-ui/core";

import "./App.css";
import "./HeaderComponent/HeaderComponent.css";
import "./CarsComponent/CarsComponent.css";
import Filter from "./FiltersComponent/FiltersComponent";
import Cars from "./CarsComponent/CarsComponent";
import Booking from "./BookingComponent/BookingComponent";
import EditDialog from "./EditDialogComponent/EditDialogComponent";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route
            path="/"
            exact
            render={() => {
              return (
                <section className="main-view-wrapper">
                  <Paper className="filters-wrapper">
                    <Filter
                      typeSelectedHandler={() => this.typeSelectedHandler}
                      changeMaxPriceHandler={() => this.changeMaxPriceHandler}
                    />
                  </Paper>
                  <Paper className="calendar-wrapper">
                    {" "}
                    <Cars />
                  </Paper>
                </section>
              );
            }}
          />
          <EditDialog />
          <Route path="/booking:car" exact component={Booking} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
