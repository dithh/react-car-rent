import * as actionTypes from "./actionTypes";
import axios from "axios";

export const updateMaxPrice = val => {
  return {
    type: actionTypes.UPDATE_MAX_PRICE,
    val: val
  };
};

export const updateFilters = val => {
  return {
    type: actionTypes.UPDATE_FILTERS_ARRAY,
    val: val
  };
};

export const switchAddDialog = () => {
  return {
    type: actionTypes.SWITCH_ADD_DIALOG
  };
};

export const authFailed = () => {
  return {
    type: actionTypes.AUTH_FAILED
  };
};

export const authSucceed = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCEEDED,
    token: token,
    userId: userId
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_STARTED
  };
};

export const auth = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: username,
      password: password,
      returnSecureToken: true
    };
    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB6UPVGsrEcmIspix2UM89PdDA7gsowrAw";
    axios
      .post(url, authData)
      .then(response => {
        dispatch(authSucceed(response.data.idToken, response.data.localId));
      })
      .catch(error => {
        dispatch(authFailed());
      });
  };
};
