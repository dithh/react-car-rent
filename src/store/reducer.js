import moment from "moment";

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
  selectedCarId: 1,
  isDialogOpen: false
};

const reducer = (state = initialState, action) => {
  if (action.type === "UPDATE_MAX_PRICE") {
    return { ...state, maxPrice: action.val };
  } else if (action.type === "UPDATE_FILTERS_ARRAY") {
    const typeFilters = [...state.typeFilters];
    if (typeFilters.includes(action.val)) {
      typeFilters.splice(typeFilters.indexOf(action.val), 1);
    } else {
      typeFilters.push(action.val);
    }
    return { ...state, typeFilters: typeFilters };
  } else if (action.type === "UPDATE_PICKUP_DATE") {
    return {
      ...state,
      pickUpDate: state.currentDate.clone().add(action.val, "day"),
      dropOffDate: state.currentDate.clone().add(action.val, "day")
    };
  } else if (action.type === "UPDATE_DROPOFF_DATE") {
    console.log(action.val);
    return {
      ...state,
      dropOffDate: moment(action.val)
    };
  } else if (action.type === "UPDATE_CURRENT_DATE") {
    return {
      ...state,
      currentDate: state.currentDate.clone().add(action.val, "day")
    };
  } else if (action.type === "UPDATE_DAYS_COUNT") {
    return {
      ...state,
      daysCount: action.val
    };
  } else if (action.type === "UPDATE_SELECTED_CAR_INDEX") {
    return {
      ...state,
      selectedCarId: action.id
    };
  } else if (action.type === "UPDATE_BOOKED_DAYS") {
    let updatedCar = {
      ...state.cars.find(car => car.id === state.selectedCarId)
    };
    if (!updatedCar.daysBooked.includes(action.date))
      updatedCar.daysBooked.push(action.date);
    let index = state.cars.findIndex(car => car.id === state.selectedCarId);
    let updatedCars = state.cars.map(car => car);
    updatedCars[index] = updatedCar;
    console.log(updatedCars[index]);
    return {
      ...state,
      cars: updatedCars
    };
  } else if (action.type === "ADD_NEW_CAR") {
    const cars = [...state.cars];
    if (
      cars.find(car => car.name.toLowerCase() === action.car.name.toLowerCase())
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
  } else if (action.type === "SWITCH_DIALOG") {
    let isDialogOpen = !state.isDialogOpen;
    return {
      ...state,
      isDialogOpen
    };
  }

  return state;
};

export default reducer;
