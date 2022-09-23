import { Box, Button, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { motion } from "framer-motion/dist/framer-motion";
import jwt from "jsonwebtoken";
import { useEffect, useReducer, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { makeApplyRequest } from "../../Redux/JobApply/actions";
import { loginSuccess, logout } from "../../Redux/Login/actions.js";
import styles from "./Register.module.css";

function AppliedJobs(props) {
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(["jayjwt"]);
  async function populateQuote() {
    const req = await fetch("/jwt", {
      method: "GET",
      headers: {
        "x-access-token": cookies.jayjwt,
      },
    });

    if (req.status === 201) {
      axios
        .get("/jwt", {
          method: "GET",
          headers: {
            "x-access-token": cookies.jayjwt,
          },
        })
        .then((res) => dispatch(loginSuccess(res.data.user)));
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
  const jobKeys = Object.keys(saved_jobs).reverse();
  const applied = Object.keys(applied_job).reverse();
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [jobId, setJobId] = useState("");
  const handleClose = () => {
    setOpen(false);
    setJobId("");
  };
  const handleOpen = (id) => {
    setJobId(id);
    setOpen(true);
  };
  const mystate = useSelector((state) => state.login.loggedUser);
  const handleCancel = (key) => {
    console.log(applied_job);
    delete applied_job[key];
    dispatch(
      makeApplyRequest({ user_id: mystate.user_id, saved_jobs, applied_job })
    );
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
              activeStyle={{
                color: "#127c71",
                textDecoration: "underline",
              }}
              style={{
                fontSize: "25px",
                marginRight: "30px",
              }}
            >
              <Button>Saved {jobKeys.length}</Button>
            </NavLink>
            <NavLink
              to="/appliedjobs"
              activeStyle={{
                color: "#127c71",
                // textDecoration: "underline",
              }}
              style={{
                fontSize: "25px",
                marginRight: "30px",
              }}
            >
              <Button variant="contained">Applied {applied.length}</Button>
            </NavLink>
          </ul>
          <Box>
            {applied.map((key) => {
              return (
                <>
                  <Box
                    style={{
                      display: "flex",
                      border: "1px solid rgb(230, 230, 230",
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
                        {applied_job[key].jobTitle}
                      </Typography>
                      <Box
                        style={{
                          marginBottom: "15px",
                          fontWeight: "600",
                          color: "grey",
                        }}
                      >
                        {applied_job[key].companyName} |{" "}
                        {applied_job[key].location}
                      </Box>
                      <Box
                        style={{
                          marginBottom: "30px",
                          fontSize: "14px",
                          fontWeight: "400",
                          color: "grey",
                        }}
                      >
                        Applied
                        {/* { timeDifference(applied_job[key].dateSaved)} */}
                      </Box>
                    </Box>
                    <Box style={{ display: "flex" }}>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleOpen(key)}
                        style={{
                          height: "40px",
                          width: "100px",
                        }}
                      >
                        Cancel {jobId ? null : null} {ignored ? null : null}
                      </Button>
                    </Box>
                  </Box>
                  <Dialog
                    open={open}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle id="alert-dialog-slide-title">
                      {"Are you sure you want to cancel the application?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => handleCancel(key)} color="primary">
                        Yes
                      </Button>
                      <Button onClick={handleClose} color="primary">
                        No
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              );
            })}
          </Box>
        </Box>
      </div>
    </motion.div>
  );
}

export default AppliedJobs;
