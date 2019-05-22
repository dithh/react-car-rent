import moment from "moment";
import _ from "lodash";

const initialState = {
  cars: [
    {
      name: "Toyota Corolla",
      price: 50,
      type: "Compact",
      daysBooked: ["2019-05-22"]
    },
    {
      name: "Suzuki Grand Vitara",
      price: 90,
      type: "SUV",
      daysBooked: ["2019-05-22"]
    },
    {
      name: "Dodge Grand Caravan",
      price: 150,
      type: "Minivan",
      daysBooked: ["2019-05-22"]
    },
    {
      name: "Jeep Cheeroke",
      price: 100,
      type: "SUV",
      daysBooked: ["2019-05-22"]
    },
    {
      name: "Skoda Rapid",
      price: 80,
      type: "Compact",
      daysBooked: ["2019-05-22"]
    },
    {
      name: "Range Rover",
      price: 150,
      type: "SUV",
      daysBooked: ["2019-05-22"]
    },
    {
      name: "BMW Z4",
      price: 130,
      type: "Sport",
      daysBooked: []
    },
    {
      name: "Toyota Supra",
      price: 150,
      type: "Sport",
      daysBooked: ["2019-05-22"]
    },
    {
      name: "Skoda Fabia",
      price: 30,
      type: "Compact",
      daysBooked: ["2019-05-22"]
    },
    {
      name: "Fiat Bravo",
      price: 40,
      type: "Compact",
      daysBooked: ["2019-05-22"]
    }
  ],
  carTypes: ["Compact", "Minivan", "SUV", "Sport"],
  typeFilters: ["Minivan", "Compact", "SUV", "Sport"],
  priceFilters: [80, 120, 150],
  maxPrice: "150",
  daysCount: 7,
  currentDate: moment(),
  pickUpDate: moment(),
  dropOffDate: moment()
};

const reducer = (state = initialState, action) => {
  if (action.type === "UPDATE_MAX_PRICE") {
    console.log("max price updated" + action.val);
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
      pickUpDate: _.cloneDeep(state.currentDate).add(action.val, "day"),
      dropOffDate: _.cloneDeep(state.currentDate).add(action.val, "day")
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
      currentDate: _.cloneDeep(state.currentDate).add(action.val, "day")
    };
  } else if (action.type === "UPDATE_DAYS_COUNT") {
    return {
      ...state,
      daysCount: action.val
    };
  }

  return state;
};

export default reducer;
