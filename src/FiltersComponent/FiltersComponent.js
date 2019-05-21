import React, { Component } from "react";
import { connect } from "react-redux";
import { Checkbox } from "@material-ui/core";
import "../FiltersComponent/FiltersComponent.css";
import "react-input-range/lib/css/index.css";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

class FiltersComponent extends Component {
  render() {
    return (
      <FormControl>
        <FormLabel>Select car types</FormLabel>
        <FormGroup>
          {this.props.carTypes.map(type => {
            return (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    checked={
                      this.props.typeFilters.includes(type) ? true : false
                    }
                    value={type}
                    onChange={this.props.OnUpdateFilters}
                  />
                }
                label={type}
              />
            );
          })}
        </FormGroup>
        <FormLabel>Select maximum Price</FormLabel>
        <RadioGroup
          aria-label="Price"
          value={this.props.maxPrice}
          onChange={this.props.onUpdatePrice}
        >
          <FormControlLabel value="50" control={<Radio />} label={50} />
          <FormControlLabel value="80" control={<Radio />} label={80} />
          <FormControlLabel value="120" control={<Radio />} label={120} />
          <FormControlLabel value="150" control={<Radio />} label={150} />
        </RadioGroup>
      </FormControl>
    );
  }
}

const mapStateToProps = state => {
  return {
    carTypes: state.carTypes,
    typeFilters: state.typeFilters,
    maxPrice: state.maxPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdatePrice: event =>
      dispatch({ type: "UPDATE_MAX_PRICE", val: event.target.value }),
    OnUpdateFilters: event =>
      dispatch({ type: "UPDATE_FILTERS_ARRAY", val: event.target.value })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FiltersComponent);
