import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { makeLoginRequest } from "../../Redux/Login/actions";
// import MyAppbar from "../Layout/appbar/MyAppbar";
import styles from "./Login.module.css";
import MyAppbar from '../Layout/appbar/MyAppbar';
// import {motion} from "framer-motion";
import {AnimatePresence, motion} from 'framer-motion/dist/framer-motion'

export function Login() {
  const { isAuth, isLoading } = useSelector((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(makeLoginRequest({ email, password }));
    history.push("/viewjobs");
  };

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} >
    <MyAppbar/>
      <div className={styles.box}>
        <div className={styles.login_container}>
          <div className={styles.login_form_container}>
            <div className={styles.left}>
              <form className={styles.form_container} onSubmit={handleSubmit}>
                <p className={styles.text}>Login to Your Account</p>
                <input
                  type="email"
                  name="email"
                  className={styles.input}
                  value={email}
                  onChange={onEmailChange}
                  placeholder="Email"
                  required
                ></input>
                <input
                  type="password"
                  name="password"
                  className={styles.input}
                  value={password}
                  onChange={onPasswordChange}
                  placeholder="Password"
                  required
                  minlength="6"
                ></input>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {isLoading ? <CircularProgress disableShrink /> : <></>}
                </div>
                <Button
                  type="submit"
                  className={styles.green_btn}
                  variant="contained"
                  disabled={isLoading}
                >
                  Sign In
                </Button>
              </form>
            </div>
            <div className={styles.right}>
              <div className={styles.rightone}>
                <h2>New Here ?</h2>
              </div>
              <Link to="/register">
                <button
                  onClick={() => history.push("/register")}
                  className={styles.white_btn}
                >
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  ) ;
}
