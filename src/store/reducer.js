import moment from "moment";
import { switchCase } from "@babel/types";

const initialState = {
  cars: [
    {
      name: "Toyota Corolla",
      price: 50,
      type: "Compact",
      daysBooked: ["2019-05-22"],
      id: 1
    },
    {
      name: "Suzuki Grand Vitara",
      price: 90,
      type: "SUV",
      daysBooked: ["2019-05-22"],
      id: 2
    },
    {
      name: "Dodge Grand Caravan",
      price: 150,
      type: "Minivan",
      daysBooked: ["2019-05-22"],
      id: 3
    },
    {
      name: "Jeep Cheeroke",
      price: 100,
      type: "SUV",
      daysBooked: ["2019-05-22"],
      id: 4
    },
    {
      name: "Skoda Rapid",
      price: 80,
      type: "Compact",
      daysBooked: ["2019-05-22"],
      id: 5
    },
    {
      name: "Range Rover",
      price: 150,
      type: "SUV",
      daysBooked: ["2019-05-22"],
      id: 6
    },
    {
      name: "BMW Z4",
      price: 130,
      type: "Sport",
      daysBooked: [],
      id: 7
    },
    {
      name: "Toyota Supra",
      price: 150,
      type: "Sport",
      daysBooked: ["2019-05-22"],
      id: 8
    },
    {
      name: "Skoda Fabia",
      price: 30,
      type: "Compact",
      daysBooked: ["2019-05-22"],
      id: 9
    },
    {
      name: "Fiat Bravo",
      price: 40,
      type: "Compact",
      daysBooked: ["2019-05-22"],
      id: 10
    }
  ],
  carTypes: ["Compact", "Minivan", "SUV", "Sport"],
  typeFilters: ["Minivan", "Compact", "SUV", "Sport"],
  priceFilters: [80, 120, 150],
  maxPrice: "150",
  daysCount: 7,
  currentDate: moment(),
  pickUpDate: moment(),
  dropOffDate: moment(),
  selectedCarId: null,
  isAddCarDialogOpen: false,
  isEditCarDialogOpen: false
};

const reducer = (state = initialState, action) => {
  let index = state.cars.findIndex(car => car.id === state.selectedCarId);
  let updatedCars = state.cars.map(car => Object.assign({}, car));
  let isAddCarDialogOpen = !state.isAddCarDialogOpen;
  let isEditCarDialogOpen = !state.isEditCarDialogOpen;
  const cars = [...state.cars];
  const typeFilters = [...state.typeFilters];
  let updatedCar = {
    ...state.cars.find(car => car.id === state.selectedCarId)
  };

  switch (action.type) {
    case "UPDATE_MAX_PRICE":
      return { ...state, maxPrice: action.val };

    case "UPDATE_FILTERS_ARRAY":
      if (typeFilters.includes(action.val)) {
        typeFilters.splice(typeFilters.indexOf(action.val), 1);
      } else {
        typeFilters.push(action.val);
      }
      return { ...state, typeFilters: typeFilters };

    case "UPDATE_PICKUP_DATE":
      return {
        ...state,
        pickUpDate: state.currentDate.clone().add(action.val, "day"),
        dropOffDate: state.currentDate.clone().add(action.val, "day")
      };
    case "UPDATE_DROPOFF_DATE":
      return {
        ...state,
        dropOffDate: moment(action.val)
      };

    case "UPDATE_CURRENT_DATE":
      return {
        ...state,
        currentDate: state.currentDate.clone().add(action.val, "day")
      };
    case "UPDATE_DAYS_COUNT":
      return {
        ...state,
        daysCount: action.val
      };
    case "UPDATE_SELECTED_CAR_INDEX":
      return {
        ...state,
        selectedCarId: action.id
      };
    case "UPDATE_BOOKED_DAYS":
      if (!updatedCar.daysBooked.includes(action.date))
        updatedCar.daysBooked.push(action.date);
      updatedCars[index] = updatedCar;
      return {
        ...state,
        cars: updatedCars
      };
    case "ADD_NEW_CAR":
      if (
        cars.find(
          car => car.name.toLowerCase() === action.car.name.toLowerCase()
        )
      ) {
        alert("This car already exists");
        return { ...state };
      }
      action.car.id = state.cars.length + 2;
      cars.push(action.car);
      return {
        ...state,
        cars: cars
      };
    case "SWITCH_ADD_DIALOG":
      return {
        ...state,
        isAddCarDialogOpen
      };
    case "SWITCH_EDIT_DIALOG":
      return {
        ...state,
        isEditCarDialogOpen
      };
    case "CAR_EDITED":
      updatedCars[index] = action.car;
      return {
        ...state,
        cars: updatedCars
      };
    case "CAR_DELETED":
      updatedCars.splice(index, 1);
      return {
        ...state,
        cars: updatedCars
      };
  }

  return state;
};

export default reducer;
