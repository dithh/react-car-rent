import React, { Component } from "react";

import "./App.css";
import "./HeaderComponent/HeaderComponent.css";
import "./CarsComponent/CarsComponent.css";

import Filter from "./FiltersComponent/FiltersComponent";
import Cars from "./CarsComponent/CarsComponent";
import Header from "./HeaderComponent/HeaderComponent";

import { Paper } from "@material-ui/core";
import Moment from "moment";
import _ from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state.carsFiltered = [...this.state.cars];
  }

  state = {
    cars: [
      {
        name: "Toyota Corolla",
        price: 50,
        type: "Compact"
      },
      {
        name: "Suzuki Grand Vitara",
        price: 90,
        type: "SUV"
      },
      {
        name: "Dodge Grand Caravan",
        price: 150,
        type: "Minivan"
      },
      {
        name: "Jeep Cheeroke",
        price: 100,
        type: "SUV"
      },
      {
        name: "Skoda Rapid",
        price: 90,
        type: "Compact"
      },
      {
        name: "Range Rover",
        price: 150,
        type: "SUV"
      },
      {
        name: "BMW Z4",
        price: 130,
        type: "Sport"
      },
      {
        name: "Toyota Supra",
        price: 150,
        type: "Sport"
      },
      {
        name: "Skoda Fabia",
        price: 30,
        type: "Compact"
      },
      {
        name: "Fiat Bravo",
        price: 40,
        type: "Compact"
      }
    ],
    carTypes: ["Compact", "Minivan", "SUV", "Sport"],
    typeFilters: ["Minivan", "Compact", "SUV", "Sport"],
    priceFilters: [80, 120, 150],
    carsFiltered: [],
    maxPrice: "80",
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

  updateFilteredCars = () => {
    ///Updates the filteredCar array after modifing the filters
    let carsFiltered = [];

    this.state.typeFilters.forEach(filter => {
      this.state.cars.forEach(car => {
        if (car.type === filter) {
          carsFiltered.push(car);
        }
      });
    });

    this.setState({
      carsFiltered: carsFiltered
        .filter(car => {
          return car.price <= this.state.maxPrice;
        })
        .sort((a, b) => {
          return a.price - b.price;
        })
    });
  };

  typeSelectedHandler = event => {
    ///Handler for type inputs in the filter
    const typeFilters = [...this.state.typeFilters];
    if (typeFilters.includes(event.target.value)) {
      typeFilters.splice(typeFilters.indexOf(event.target.value), 1);
    } else {
      typeFilters.push(event.target.value);
    }
    this.setState(
      {
        typeFilters: typeFilters
      },
      () => {
        this.updateFilteredCars();
      }
    );
  };

  changeMaxPriceHandler = event => {
    this.setState(
      {
        maxPrice: event.target.value
      },
      () => {
        console.log(this.state.maxPrice);
        this.updateFilteredCars();
      }
    );
  };

  render() {
    return (
      <div className="App">
        <Paper className="filters-wrapper">
          <Filter
            carTypes={this.state.carTypes}
            priceRange={this.state.priceRange}
            typeFilters={this.state.typeFilters}
            typeSelectedHandler={() => this.typeSelectedHandler}
            carsFiltered={this.state.carsFiltered}
            maxPrice={this.state.maxPrice}
            changeMaxPriceHandler={() => this.changeMaxPriceHandler}
          />
        </Paper>
        <Paper className="calendar-wrapper">
          {" "}
          <Cars
            carsFiltered={this.state.carsFiltered}
            daysCount={this.state.daysCount}
          />
        </Paper>
      </div>
    );
  }
}

export default App;
