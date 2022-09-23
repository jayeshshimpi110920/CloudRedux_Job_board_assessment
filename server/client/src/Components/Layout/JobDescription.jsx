import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { Button } from "@mui/material";
import Section from "./Section";
import { useSelector, useDispatch } from "react-redux";
import { makeApplyRequest } from "../../Redux/JobApply/actions";
import { ApplyModal } from "./JobApplyModal/ApplyModal";

const container = {
  position: "sticky",
  top: "90px",
  marginLeft: "20px",
  marginRight: "20px",
  alignSelf: "flex-start",
  border: "1px solid #e6e6e6",
  padding: "15px",
  flex: "1",
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
};

function JobDescription({ jobData }) {
  const {
    companyName,
    location,
    snippet,
    jobTitle,
    jobDescription,
    startSalary,
    endSalary,
    jobkey,
  } = jobData;
  const { saved_jobs, applied_job, id } = useSelector(
    (state) => state.login.loggedUser
  );
  const [open, setOpen] = useState(false);
  const [jobId, setJobId] = useState("");
  // const [ignored, forceUpdate] =useReducer(x => x + 1, 0);

  const mystate = useSelector((state) => state.login.loggedUser);

  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
    setJobId("");
  };

  const handleOpen = (id) => {
    setJobId(id);
    setOpen(true);
  };

  const handleApply = () => {
    applied_job[jobId] = {
      jobkey,
      location,
      companyName,
      jobTitle,
      dateSaved: new Date(),
    };
    dispatch(
      makeApplyRequest({ user_id: mystate.user_id, saved_jobs, applied_job })
    );
    setOpen(false);
    // forceUpdate()
  };

  return (
    <div className="container" style={container}>
      <Typography variant={"h5"} style={{ marginBottom: "10px" }}>
        {jobTitle}
      </Typography>
      <Box style={{ marginBottom: "10px" }}>
        {companyName}, {location}
      </Box>

      <Box style={{ marginBottom: "10px" }}>
        ₹ {Number(startSalary).toLocaleString("en-IN")} - ₹{" "}
        {Number(endSalary).toLocaleString("en-IN")}
      </Box>

      <Button
        variant="contained"
        // className="link"
        // style={link}
        onClick={() => handleOpen(jobkey)}
        disabled={applied_job[jobkey] ? true : false}
      >
        {applied_job[jobkey] ? "Applied" : "Apply Now"}
      </Button>
      <Section jobDescription={jobDescription} summary={snippet} />
      <ApplyModal
        open={open}
        handleClose={() => handleClose()}
        jobId={jobId}
        handleApply={() => handleApply()}
      />
    </div>
  );
}

export default JobDescription;
