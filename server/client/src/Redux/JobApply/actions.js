import axios from "axios";
import {
  APPLY_JOB_FAILURE,
  //   APPLY_JOB_REQUEST,
  APPLY_JOB_SUCCESS,
} from "./actionTypes";



const applyJobSuccess = () => {
  return {
    type: APPLY_JOB_SUCCESS,
  };
};

const applyJobFailure = () => {
  return {
    type: APPLY_JOB_FAILURE,
  };
};

export const makeApplyRequest = ({ user_id, saved_jobs, applied_job }) => (dispatch) => {
  // dispatch(applyJobRequest())

  // console.log( user_id);
  // console.log( saved_jobs);
  // console.log(applied_job);

  axios
    .patch(`/users/applied_jobs`, {
      saved_jobs,
      applied_job,
      user_id
    })
    .then((res) => {
      dispatch(applyJobSuccess());
    })
    .catch((err) => {
      dispatch(applyJobFailure());
    });
};
