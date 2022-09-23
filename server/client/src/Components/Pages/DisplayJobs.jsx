import React, { useEffect, useState, useReducer } from "react";
import { styled } from "@mui/material/styles";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
// import classNames from 'classnames'
import SearchForm from "../Layout/Forms/SearchForm/SearchForm";
// import FillterButton from '../Layout/FilterJobsButton/FillterButton';
import {
  getSearchData,
  fetchSuccess,
  setCurrentPage,
} from "../../Redux/Search/actions";
import JobDescription from "../Layout/JobDescription";
// import styled from 'styled-components'
// import {timeDifference} from '../../Utils/timeDifference'
import JobMenu from "../Layout/Menu/JobMenu";
import { makeSaveJobRequest } from "../../Redux/SaveJob/actions";
import "./css/displayjob.style.css";
import CircularProgress from "@mui/material/CircularProgress";
// import { axios } from 'axios';
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";

function DisplayJobs(props) {
  const query = new URLSearchParams(props.location.search);
  let job = query.get("q") || "";
  let location = query.get("location") || "";

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  let jobs = useSelector((state) => state.search.searched);
  let totalCount = useSelector((state) => state.search.totalCount);
  const loggedUser = useSelector((state) => state.login.loggedUser);
  let isLoading = useSelector((state) => state.search.isLoading);
  let p = useSelector((state) => state.search.page);

  const pageNo = query.get("page");
  let [page, setPage] = useState(Number(pageNo));

  let [jobData, setJobData] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handlePageChange = (event, page) => {
    setPage(page);
    dispatch(setCurrentPage(page));
    history.push(`/jobs?q=${job}&location=${location}&page=${page}`);
  };

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="job_section">
        <Box style={{ transform: "scale(0.8) translateX(-12%)" }}>
          <SearchForm />
        </Box>
        {isLoading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : jobs.length ? (
          <>
            <Box></Box>
            <Box className="greyText">jobs in {location}</Box>
            {/* {ignored ? null : null} */}
            <Box className="sort_container"></Box>
            <Box style={{ display: "flex"}}>
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
                      <Typography className="job_title">
                        {job.jobTitle}
                      </Typography>
                      <Typography className="job_subTitle">
                        {job.companyName}
                      </Typography>
                      <Typography className="job_subTitle">
                        {job.location}
                      </Typography>
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

            <Pagination
              onChange={handlePageChange}
              count={
                totalCount % 5 === 0
                  ? Math.floor(totalCount / 5)
                  : Math.floor(totalCount / 5) + 1
              }
              variant="outlined"
              page={p}
              shape="rounded"
            />
          </>
        ) : (
          <Box>No results found</Box>
        )}
      </div>
    </motion.div>
  );
}

export default DisplayJobs;
