import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion/dist/framer-motion";
import jwt from "jsonwebtoken";
import { useEffect, useReducer, useState } from "react";
import { useCookies } from "react-cookie";
import { NavLink, useHistory } from "react-router-dom";
import { makeApplyRequest } from "../../Redux/JobApply/actions";
import { loginSuccess, logout } from "../../Redux/Login/actions.js";
import { makeSaveJobRequest } from "../../Redux/SaveJob/actions";
import { ApplyModal } from "../Layout/JobApplyModal/ApplyModal";
import styles from "./Register.module.css";
import { useDispatch, useSelector } from "react-redux";
import { convertLength } from "@mui/material/styles/cssUtils";
import axios from "axios";

function SavedJobs(props) {
  const history = useHistory();

  const [cookies, setCookie, removeCookie] = useCookies(["jayjwt"]);

  async function populateQuote() {
    const req = await fetch("/jwt", {
      method: "GET",
      headers: {
        "x-access-token": cookies.jayjwt,
      },
    });
    // console.log(req);
    if (req.status === 201) {
      axios.get("/jwt", {
        method: "GET",
        headers: {
          "x-access-token": cookies.jayjwt,
        },
      }).then(res=>dispatch(loginSuccess(res.data.user)));
      return;
    } else {
      removeCookie("jayjwt");
      history.push("/login");
    }
  }

  useEffect(() => {
    const token = cookies.jayjwt;
    console.log(token);

    if (token !== undefined) {
      const user = jwt.decode(token);
      if (!user) {
        removeCookie("jayjwt");
        history.push("/login");
      } else {
        populateQuote();
      }
    } else {
      dispatch(logout());
      history.push("/login");
    }
  }, []);

  const { saved_jobs, applied_job, id } = useSelector(
    (state) => state.login.loggedUser
  );
  const mystate = useSelector((state) => state.login.loggedUser);
  const jobKeys = Object.keys(saved_jobs).reverse();
  const applied = Object.keys(applied_job).reverse();
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [jobId, setJobId] = useState("");
  const removeFromSaved = ({ jobkey }) => {
    console.log(mystate.user_id);
    const user_id = mystate.user_id;
    delete saved_jobs[jobkey];
    dispatch(makeSaveJobRequest({ user_id, saved_jobs }));
    forceUpdate();
  };
  const handleClose = () => {
    setOpen(false);
    setJobId("");
  };
  const handleOpen = (id) => {
    setJobId(id);
    setOpen(true);
  };
  const handleApply = () => {
    const user_id = mystate.user_id;
    applied_job[jobId] = { ...saved_jobs[jobId] };
    dispatch(makeApplyRequest({ user_id: user_id, saved_jobs, applied_job }));
    setOpen(false);
    forceUpdate();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.savedjobconatiner}>
        <Box>
          <Typography
            variant={"h5"}
            style={{ fontSize: "40px", marginBottom: "20px" }}
          >
            My Jobs
          </Typography>
          <ul style={{ display: "flex", marginBottom: "20px" }}>
            <NavLink
              to="/savedjobs"
              activeStyle={{ color: "#127c71" }}
              style={{ fontSize: "25px", marginRight: "30px" }}
            >
              <Button variant="contained">Saved {jobKeys.length}</Button>
            </NavLink>
            <NavLink
              to="/appliedjobs"
              style={{
                fontSize: "25px",
              }}
            >
              <Button>Applied {applied.length}</Button>
            </NavLink>
          </ul>
          {ignored ? null : null}
          <Box>
            {jobKeys.map((key) => {
              return (
                <Box
                  style={{
                    display: "flex",
                    border: "1px solid #e6e6e6",
                    // borderRadius: "10px",
                    padding: "20px",
                    marginBottom: "20px",
                  }}
                  key={key}
                >
                  <Box style={{ width: "500px" }}>
                    <Typography
                      variant="h5"
                      style={{ fontSize: "18px", marginBottom: "15px" }}
                    >
                      {saved_jobs[key].jobTitle}
                    </Typography>
                    <Box
                      style={{
                        marginBottom: "15px",
                        fontWeight: "600",
                        color: "grey",
                      }}
                    >
                      {saved_jobs[key].companyName} | {saved_jobs[key].location}
                    </Box>
                    <Box
                      style={{
                        marginBottom: "30px",
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "grey",
                      }}
                    >
                      Saved
                    </Box>
                  </Box>
                  <Box style={{ display: "flex" }}>
                    <Button
                      className="applyButton"
                      style={{
                        width: "100px",
                        height: "40px",
                        border: "1px solid",
                      }}
                      onClick={() => handleOpen(key)}
                      disabled={applied_job[key] ? true : false}
                    >
                      {applied_job[key] ? "Applied" : "Apply"}
                    </Button>
                  </Box>
                  <Box
                    onClick={() => {
                      removeFromSaved({ jobkey: key });
                    }}
                    style={{
                      cursor: "pointer",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginLeft:"10px"
                    }}
                  >
                    <Button
                      style={{ minWidth: "32px", height:"40px" }}
                      variant="contained"
                      color="error"
                    >
                      X
                    </Button>
                  </Box>
                </Box>
              );
            })}
          </Box>
          <ApplyModal
            open={open}
            handleClose={() => handleClose()}
            jobId={jobId}
            handleApply={() => handleApply()}
          />
        </Box>
      </div>
    </motion.div>
  );
}

export default SavedJobs;
