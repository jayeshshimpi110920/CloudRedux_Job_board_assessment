import { Typography } from "@mui/material";
import { useReducer } from "react";
import { Link } from "react-router-dom";
import SearchForm from "../Layout/Forms/SearchForm/SearchForm";
// import RecentSearch from '../Layout/RecentSearch';
import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeSaveJobRequest } from "../../Redux/SaveJob/actions";
import { getSearchData } from "../../Redux/Search/actions";
import JobDescription from "../Layout/JobDescription";
import JobMenu from "../Layout/Menu/JobMenu";
import "./css/Home.style.css";
import data from "./db.json";
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';
import { useHistory } from 'react-router-dom'
import { logout } from "../../Redux/Login/actions.js";
import { borderBottom } from "@mui/system";

function Home(props) {

  const [cookies, setCookie, removeCookie]= useCookies(['jayjwt']);
  const history=useHistory();

  async function populateQuote() {
  const req = await fetch('/jwt', {
          method:'GET',
    headers: {
      'x-access-token': cookies.jayjwt,
    }
  })
  
  if(req.status === 201){
      // alert("fine");
      return;
  }
  else{
      removeCookie('jayjwt');
      history.push('/login')
  }
}

  // Mynewpagetest
  useEffect(() => {
      const token =cookies.jayjwt;
  
  if (token !==undefined) {
    const user = jwt.decode(token)
    if (!user) {
              removeCookie('jayjwt');
              history.push('/login')
    } else {
      populateQuote()
    }
  }
      else{
          dispatch(logout());
          history.push('/login');
      }
}, [])



  const query = new URLSearchParams(props.location.search);

  let job = query.get("q") || "";
  let location = query.get("location") || "";
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  let jobs = data.jobData;
  // let totalCount = useSelector(state=>state.search.totalCount)
  const loggedUser = useSelector((state) => state.login.loggedUser);
  // let isLoading = useSelector(state=>state.search.isLoading)
  // let p = useSelector(state=>state.search.page)
  const pageNo = query.get("page");
  let [page, setPage] = useState(Number(pageNo));
  let [jobData, setJobData] = useState(null);
  const dispatch = useDispatch();
  // const history = useHistory()

  useEffect(() => {
    dispatch(getSearchData(job, location, page));
    forceUpdate();
  }, [job, location, page]);

  const getJobDescription = (job) => {
    setJobData(job);
  };
  const mystate = useSelector((state) => state.login.loggedUser);

  const handelSave = ({ jobkey, location, companyName, jobTitle }) => {
    const { id, saved_jobs } = loggedUser;
    saved_jobs[jobkey] = {
      jobkey,
      location,
      companyName,
      jobTitle,
      dateSaved: new Date().getTime(),
    };

    dispatch(makeSaveJobRequest({ user_id: mystate.user_id, saved_jobs }));
  };

  const removeFromSaved = ({ jobkey }) => {
    const { id, saved_jobs } = loggedUser;
    delete saved_jobs[jobkey];
    dispatch(makeSaveJobRequest({ user_id: mystate.user_id, saved_jobs }));
  };

  const contain = {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  };


  return (
    <div className="container" style={contain}>
      <SearchForm />
      <div className="linkContainer">
        <Link className="link" to="/postjob" style={{borderBottom:"3px solid rgb(18, 124, 113)"}}>
          {`Are you an Employer?  `}
        </Link>
        <Link to="/postjob" style={{borderBottom:"3px solid rgb(18, 124, 113)"}}>Hire From Here</Link>
        
      </div>

      <div style={{ padding: "20px", fontWeight: "bolder" }}>
        Top jobs For you
      </div>
      <Box style={{ display: "flex", gap:"4px"}}>
        <Grid className="jobContainer" classes="fhhh" container>
          {jobs.map((job, index) => (
            <Grid
              className="card"
              item
              key={job.jobkey}
              lg={12}
              md={12}
              sm={12}
              xs={12}
            >
              <Box onClick={() => getJobDescription(job)}>
                <Typography className="job_title">{job.jobTitle}</Typography>
                <Typography className="job_subTitle">
                  {job.companyName}
                </Typography>
                <Typography className="job_subTitle">{job.location}</Typography>
                <Typography className="job_subTitle">
                  ₹ {Number(job.startSalary).toLocaleString("en-IN")} - ₹{" "}
                  {Number(job.endSalary).toLocaleString("en-IN")}
                </Typography>
              </Box>
              <JobMenu
                job={job}
                handelSave={handelSave}
                removeFromSaved={removeFromSaved}
              />
            </Grid>
          ))}
        </Grid>
        {jobData ? (
          <JobDescription
            className="chhh"
            jobData={jobData}
            summary={job.snippet}
          />
        ) : (
          <></>
        )}
      </Box>
    </div>
  );
}

export default Home;
