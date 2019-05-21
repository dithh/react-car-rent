import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Moment from "moment";
import _ from "lodash";

class Header extends Component {
  render() {
    let endDate = _.cloneDeep(this.props.currentDate).add(
      this.props.daysCount - 1,
      "day"
    );
    return (
      <div className="header">
        <Button variant="outlined" color="primary">
          Today
        </Button>
        <span>
          <span
            className="arrow"
            // onClick={this.changeDateHandler.bind(this, "subtract")}
          >
            {"<"}
          </span>{" "}
          {this.props.currentDate.format("DD MMM")} -
          {endDate.format("DD MMM YYYY")}
          <span
            className="arrow"
            // onClick={this.changeDateHandler.bind(this, "add")}
          >
            {">"}
          </span>
        </span>
        <span>
          <Button variant="outlined" color="primary">
            Week
          </Button>
          <Button variant="outlined" color="primary">
            2 Weeks
          </Button>
          <Button variant="outlined" color="primary">
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

export default connect(mapStateToProps)(Header);
