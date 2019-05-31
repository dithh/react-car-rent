import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const Arrow = styled.span`
  :hover {
    cursor: pointer;
  }
`;

class Header extends Component {
  render() {
    let endDate = this.props.currentDate
      .clone()
      .add(this.props.daysCount - 1, "day");
    return (
      <StyledHeader>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.props.onDaysCountChange.bind(this, 1)}
        >
          Today
        </Button>
        <span>
          <Arrow
            onClick={this.props.onDateChange.bind(this, -this.props.daysCount)}
          >
            {"<"}
          </Arrow>{" "}
          {this.props.currentDate.format("DD MMM")} -
          {endDate.format("DD MMM YYYY")}
          <Arrow
            onClick={this.props.onDateChange.bind(this, this.props.daysCount)}
          >
            {">"}
          </Arrow>
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
      </StyledHeader>
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
