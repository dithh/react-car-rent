import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { auth } from "../../store/actionsCreators";
import Spinner from "../SpinnerComponent/SpinnerComponent";
import styled from "styled-components";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    paddingBottom: theme.spacing.unit,
    alignItems: "center"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: 200
  }
});

const AuthWrapper = styled(Paper)`
  width: 250px;
  margin: auto;
  padding: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const Auth = class Auth extends Component {
  state = {
    username: "",
    password: ""
  };

  onUserNameChangeHandler = event => {
    this.setState({ username: event.target.value });
  };

  onPasswordChangeHandler = event => {
    this.setState({ password: event.target.value });
  };

  onClickHandler = () => {
    this.props.onSignIn(this.state.username, this.state.password);
  };

  onKeyUpHandler = event => {
    if (event.key === "Enter") {
      this.props.onSignIn(this.state.username, this.state.password);
    }
  };

  render() {
    let { classes } = this.props;
    return (
      <AuthWrapper>
        {this.props.isLoading ? (
          <Spinner />
        ) : (
          <form className={classes.container} onKeyUp={this.onKeyUpHandler}>
            <TextField
              className={classes.textField}
              id="Username"
              label="Username"
              type="text"
              value={this.state.username}
              onChange={this.onUserNameChangeHandler}
            />
            <TextField
              className={classes.textField}
              id="password"
              label="Password"
              type="password"
              error={this.props.error}
              helperText={this.props.error ? "Invalid username/password" : null}
              value={this.state.password}
              onChange={this.onPasswordChangeHandler}
            />
            <Button onClick={this.onClickHandler} color="primary">
              Sign in
            </Button>
          </form>
        )}
      </AuthWrapper>
    );
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onSignIn: (username, email) => dispatch(auth(username, email))
  };
};

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
    error: state.authError
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Auth)
);
