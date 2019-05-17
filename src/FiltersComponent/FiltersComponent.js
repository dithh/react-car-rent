import React from "react";
import List from "@material-ui/core/List";
import { ListItem, ListItemText, Checkbox } from "@material-ui/core";
import InputRange from "react-input-range";
import "../FiltersComponent/FiltersComponent.css";
import "react-input-range/lib/css/index.css";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

const FiltersComponent = props => {
  return (
    <FormControl>
      <FormLabel>Select car types</FormLabel>
      <FormGroup>
        {props.carTypes.map(type => {
          return (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  checked={props.typeFilters.includes(type) ? true : false}
                  value={type}
                  onChange={props.typeSelectedHandler()}
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
        value={props.maxPrice}
        onChange={props.changeMaxPriceHandler()}
      >
        <FormControlLabel value="50" control={<Radio />} label={50} />
        <FormControlLabel value="80" control={<Radio />} label={80} />
        <FormControlLabel value="120" control={<Radio />} label={120} />
        <FormControlLabel value="150" control={<Radio />} label={150} />
      </RadioGroup>
    </FormControl>
  );
};

export default FiltersComponent;
