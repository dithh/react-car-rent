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

export const checkTimeOut = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
      alert("Your session expired");
    }, expirationTime * 1000);
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.LOGOUT
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        let timeout = (expirationDate.getTime() - new Date().getTime()) / 1000;
        dispatch(authSucceed(token, expirationDate));
        dispatch(
          checkTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000)
        );
      } else {
        dispatch(logout());
      }
    }
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
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSucceed(response.data.idToken, response.data.localId));
        dispatch(checkTimeOut(response.data.expiresIn));
      })
      .catch(error => {
        dispatch(authFailed());
      });
  };
};
