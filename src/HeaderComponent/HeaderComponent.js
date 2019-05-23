import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import _ from "lodash";

class Header extends Component {
  render() {
    let endDate = this.props.currentDate
      .clone()
      .add(this.props.daysCount - 1, "day");
    return (
      <div className="header">
        <Button
          variant="outlined"
          color="primary"
          onClick={this.props.onDaysCountChange.bind(this, 1)}
        >
          Today
        </Button>
        <span>
          <span
            className="arrow"
            onClick={this.props.onDateChange.bind(this, -this.props.daysCount)}
          >
            {"<"}
          </span>{" "}
          {this.props.currentDate.format("DD MMM")} -
          {endDate.format("DD MMM YYYY")}
          <span
            className="arrow"
            onClick={this.props.onDateChange.bind(this, this.props.daysCount)}
          >
            {">"}
          </span>
        </span>
        <span>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.props.onDaysCountChange.bind(this, 7)}
          >
            Week
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.props.onDaysCountChange.bind(this, 14)}
          >
            2 Weeks
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.props.onDaysCountChange.bind(this, 31)}
          >
            Month
          </Button>
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentDate: state.currentDate,
    daysCount: state.daysCount
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDateChange: value =>
      dispatch({ type: "UPDATE_CURRENT_DATE", val: value }),
    onDaysCountChange: value =>
      dispatch({ type: "UPDATE_DAYS_COUNT", val: value })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
