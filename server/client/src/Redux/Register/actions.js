import axios from "axios";
import { v4 as uuid } from "uuid";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS
} from "./actionTypes";

const registerRequest = () => {
  return {
    type: REGISTER_REQUEST,
  };
};

const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS,
  };
};

// const registerFailure = (errorMsg) => {
//   return {
//     type: REGISTER_FAILURE,
//     payload: errorMsg,
//   };
// };

export const makeRegisterRequest = ({ name, email, password }) => (dispatch) => {
  dispatch(registerRequest());
  dispatch(registerNewUser({ name, email, password }));

};



const registerNewUser = ({ name, email, password }) => (dispatch) => {


  axios
    .post("/register", {
      name,
      email,
      password,
      user_id: uuid(),
      saved_jobs: {},
      applied_job: {},
      my_reviews: {},
    })
    .then((res) => {
      if(res.data.message==="ALREADY_REGISTER"){
        alert("Already Register into Our System")
      }
      else{
        alert("Register sucessfully  :) ");
        dispatch(registerSuccess())
      }
    });
};


