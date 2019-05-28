import moment from "moment";
import * as actionTypes from "./actionTypes";
import { updateObject } from "./utils";
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
  isEditCarDialogOpen: false,
  isLoading: false,
  token: null,
  userId: null
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
    case actionTypes.UPDATE_MAX_PRICE:
      return updateObject(state, { maxPrice: action.val });

    case actionTypes.UPDATE_FILTERS_ARRAY:
      if (typeFilters.includes(action.val)) {
        typeFilters.splice(typeFilters.indexOf(action.val), 1);
      } else {
        typeFilters.push(action.val);
      }
      return updateObject(state, { typeFilters: typeFilters });

    case actionTypes.UPDATE_PICKUP_DATE:
      return updateObject(state, {
        pickUpDate: state.currentDate.clone().add(action.val, "day"),
        dropOffDate: state.currentDate.clone().add(action.val, "day")
      });
    case actionTypes.UPDATE_DROPOFF_DATE:
      return updateObject(state, { dropOffDate: moment(action.val) });

    case actionTypes.UPDATE_CURRENT_DATE:
      return updateObject(state, {
        currentDate: state.currentDate.clone().add(action.val, "day")
      });
    case actionTypes.UPDATE_DAYS_COUNT:
      return updateObject(state, { daysCount: action.val });
    case actionTypes.UPDATE_SELECTED_CAR_INDEX:
      return updateObject(state, { selectedCarId: action.id });
    case actionTypes.UPDATE_BOOKED_DAYS:
      if (!updatedCar.daysBooked.includes(action.date)) {
        updatedCar.daysBooked.push(action.date);
        updatedCars[index] = updatedCar;
        return updateObject(state, { cars: updatedCars });
      }
    case actionTypes.ADD_NEW_CAR:
      if (
        cars.find(
          car => car.name.toLowerCase() === action.car.name.toLowerCase()
        )
      ) {
        alert("This car already exists");
        return updateObject(state);
      }
      action.car.id = state.cars.length + 2;
      cars.push(action.car);
      return updateObject(state, { cars: cars });
    case actionTypes.SWITCH_ADD_DIALOG:
      return updateObject(state, { isAddCarDialogOpen: isAddCarDialogOpen });
    case actionTypes.SWITCH_EDIT_DIALOG:
      return updateObject(state, { isEditCarDialogOpen });
    case actionTypes.CAR_EDITED:
      updatedCars[index] = action.car;
      return updateObject(state, { cars: updatedCars });
    case actionTypes.CAR_DELETED:
      updatedCars.splice(index, 1);
      return updateObject(state, { cars: updatedCars });
    case actionTypes.AUTH_STARTED:
      console.log(action.username, action.password);
      return updateObject(state, { isLoading: true });
    case actionTypes.AUTH_FAILED:
      return updateObject(state, { isLoading: false });
    case actionTypes.AUTH_SUCCEEDED:
      return updateObject(state, {
        token: action.token,
        isLoading: false,
        userId: action.userId
      });
    default:
      return state;
  }
};

export default reducer;
