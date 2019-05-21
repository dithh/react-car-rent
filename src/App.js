import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import "./HeaderComponent/HeaderComponent.css";
import "./CarsComponent/CarsComponent.css";

import Filter from "./FiltersComponent/FiltersComponent";
import Cars from "./CarsComponent/CarsComponent";
import Header from "./HeaderComponent/HeaderComponent";
import Booking from "./BookingComponent/BookingComponent";

import { Paper } from "@material-ui/core";
import Moment from "moment";
import _ from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    daysCount: 7
  };

  changeDateHandler = direction => {
    let moment = _.cloneDeep(this.state.moment);
    switch (direction) {
      case "add":
        moment.add(1, "week");
        this.setState({
          moment: moment
        });
        break;

      case "subtract":
        moment.subtract(1, "week");
        this.setState({
          moment: moment
        });
        break;
    }
  };

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
          <Route path="/booking:car" exact component={Booking} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
