import axios from "axios";

export const FETCH_SUCCESS = "FETCH_SUCCESS"
export const FETCH_LOADING = "FETCH_LOADING"
export const FETCH_ERROR = "FETCH_ERROR"
export const FETCH_JOBS_ID_SUCCESS = "FETCH_JOBS_ID_SUCCESS"
export const COUNT_TOTAL_RESULT = "COUNT_TOTAL_RESULT"
export const SET_PAGE = "SET_PAGE"

// https://job-api-jayesh-deploy.herokuapp.com/


const base_url = "https://job-api-jayesh-deploy.herokuapp.com";
export const fetchSuccess = (payload) => {
  return {
    type: FETCH_SUCCESS,
    payload,
  };
};

const fetchloading = () => {
  return {
    type: FETCH_LOADING,
  };
};

const fetchError = () => {
  return {
    type: FETCH_ERROR,
  };
};


//
export const setCurrentPage = payload => {
  return {
    type: SET_PAGE,
    payload
  }
}



export const setCount = (payload) => {
  return {
    type: COUNT_TOTAL_RESULT,
    payload,
  };
};

export const dispatchCount = (payload) => (dispatch) => {
  const { job, location, start, jobType } = payload;
  // console.log(job,location,start)

  var config = {
    method: "GET",
    url: `${base_url}/jobs`,
    params: {
      q: job,
      city_like: location,
      jobType_like: jobType,
      _start: start,
    },
  };

  axios(config).then((res) => {
    // console.log("data",res.data)
    console.log("here me"+res.data.length);
    dispatch(setCount(res.data.length));
  });
};

export const getSearchData = (job = "", location = "", page = "1") => (dispatch) => {
  dispatch(fetchloading());

  let url = `${base_url}/jobs?_page=${page}&_limit=5`;

  if (location !== "" && job !== "") {
    url = `${base_url}/jobs?location_like=${location}&jobTitle_like=${job}&_page=${page}&_limit=5`;
  } else if (location !== "") {
    url = `${base_url}/jobs?location_like=${location}&_page=${page}&_limit=5`;
  } else if (job !== "") {
    url = `${base_url}/jobs?jobTitle_like=${job}&_page=${page}&_limit=5`;
  } else return;

  var config = {
    method: "GET",
    url: url,
  };

  axios(config)
    .then((res) => {
      dispatch(fetchSuccess(res.data));
    })
    .then(() => {
      // let url = `${base_url}/jobs`;

      if (location !== "" && job !== "") {
        url = `${base_url}/jobs?location_like=${location}&jobTitle_like=${job}`;
      } else if (location !== "") {
        url = `${base_url}/jobs?location_like=${location}`;
      } else if (job !== "") {
        url = `${base_url}/jobs?jobTitle_like=${job}`;
      }
      axios({
        method: "GET",
        url: url,
      }).then((res) => {
        dispatch(setCount(res.data.length));
      });
    })
    .catch((err) => {
      console.log("error");
      dispatch(fetchError());
    });
};

