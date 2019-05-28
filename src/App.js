import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { connect } from "react-redux";

import "./App.css";
import "./Components/HeaderComponent/HeaderComponent.css";
import "./Components/CarsComponent/CarsComponent.css";
import Filter from "./Components/FiltersComponent/FiltersComponent";
import Cars from "./Components/CarsComponent/CarsComponent";
import Booking from "./Components/BookingComponent/BookingComponent";
import Auth from "./Components/AuthComponent/Authcomponent";

class App extends Component {
  render() {
    return (
      <div className="App">
        {!this.props.token ? (
          <Auth />
        ) : (
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
        )}
        {/* <Auth /> */}
        {/* <BrowserRouter>
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
        </BrowserRouter> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(App);
