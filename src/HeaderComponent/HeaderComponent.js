import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Moment from "moment";
import _ from "lodash";

class Header extends Component {
  state = {
    moment: new Moment()
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

  render() {
    let momentEnd = _.cloneDeep(this.state.moment);
    return (
      <div className="header">
        <Button variant="outlined" color="primary">
          Today
        </Button>
        <span>
          <span
            className="arrow"
            onClick={this.changeDateHandler.bind(this, "subtract")}
          >
            {"<"}
          </span>{" "}
          {this.state.moment.format("DD MMM Y")} -{" "}
          {momentEnd.add(1, "week").format("DD MMM Y")}{" "}
          <span
            className="arrow"
            onClick={this.changeDateHandler.bind(this, "add")}
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

export default Header;
