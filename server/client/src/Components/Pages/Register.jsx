import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { makeRegisterRequest } from "../../Redux/Register/actions";
import MyAppbar from "../Layout/appbar/MyAppbar";
import styles from "./Register.module.css";
// import {motion} from "framer-motion";
import { AnimatePresence, motion } from "framer-motion/dist/framer-motion";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  textField: {
    border: "1px solid #b3b3b3",
  },
}));
export function Register() {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Must be 8 Characters Long")
        .required("Password is required"),
    }),
    onSubmit: (e) => {
      const myname = e.fullName;
      const email = e.email;
      const password = e.password;
      console.log(myname, email, password);
      dispatch(makeRegisterRequest({ myname, email, password }));
      history.push("/login");
      handleSubmit();
    },
  });
  // const isAuth = useSelector((state) => state.login.isAuth);

  const history = useHistory();

  const dispatch = useDispatch();

  // const onNameChange = (e) => {
  //   setName(e.target.value);
  // };

  // const onEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };

  // const onPasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  const handleSubmit = (e) => {
    // e.preventDefault();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MyAppbar />
      <div className={styles.mybox}>
        <div className={styles.signup_container}>
          <div className={styles.signup_form_container}>
            <div className={styles.right}>
              <form
                className={styles.form_container}
                onSubmit={formik.handleSubmit}
              >
                <h1>Create Account</h1>
                <TextField
                  type="text"
                  style={{ marginTop: "5px" }}
                  variant="filled"
                  label="Name"
                  className={[classes.textField, styles.input]}
                  // placeholder="Name"
                  name="fullName"
                  onChange={formik.handleChange}
                  value={formik.values.fullName}
                  error={
                    formik.touched.fullName && Boolean(formik.errors.fullName)
                  }
                  helperText={formik.touched.fullName && formik.errors.fullName}
                />
                <TextField
                  type="text"
                  variant="filled"
                  label="Email"
                  style={{ marginTop: "5px" }}
                  className={[classes.textField, styles.input]}
                  // placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  type="password"
                  variant="filled"
                  label="Password "
                  style={{ marginTop: "5px" }}
                  className={[classes.textField, styles.input]}
                  // placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
                <button type="submit" className={styles.green_btn}>
                  Sign Up
                </button>
              </form>
            </div>
            <div className={styles.left}>
              <h1>Already an User?</h1>
              <Link to="/login">
                <button type="button" className={styles.white_btn}>
                  Sign in
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
