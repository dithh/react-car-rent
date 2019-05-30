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
import { authCheckState } from "./store/actionsCreators";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignIn();
  }

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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
