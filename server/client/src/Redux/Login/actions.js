import axios from "axios";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT
} from "./actionTypes";
import Cookies from 'js-cookie';

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = (currentUser) => {
  return {
    type: LOGIN_SUCCESS,
    payload: currentUser,
  };
};

const loginFailure = (errorMsg) => {
  alert(errorMsg);
  return {
    type: LOGIN_FAILURE,
    payload: errorMsg,
  };
};

export const logout = () => {
  localStorage.removeItem('persist');
  return {
    type: LOGOUT,
  };
};

export const makeLoginRequest = ({ email, password }) => (dispatch) => {
  dispatch(loginRequest())

  axios
    .post("/login", { "email": email, "password": password })
    .then((res) => {
      
      if (res.data) {
        Cookies.set('jayjwt',res.data.token,{ expires: 1 });
        dispatch(loginSuccess(res.data.user)); //fix here
        window.location.href = "/"
      }
      else {
        dispatch(loginFailure("Invalid Credentials"))
        return;
      }
    })
    .catch((err) => dispatch(loginFailure("Invalid Credentials")));
};




