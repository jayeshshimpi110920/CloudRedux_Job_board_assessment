import React from "react";
import { Route, Switch } from "react-router-dom";
import { CompanyReviews } from "../Components/Pages/CompanyReviews";
import AppliedJobs from "../Components/Pages/AppliedJobs";
import DisplayJobs from "../Components/Pages/DisplayJobs";
import Home from "../Components/Pages/Home";
import { Login } from "../Components/Pages/Login";
// import PostJob from "../Components/Pages/PostJob";
import { Register } from "../Components/Pages/Register";
import { Review } from "../Components/Pages/Review";
import SavedJobs from "../Components/Pages/SavedJobs";
import PrivateRoute from "./PrivateRoute";
// import LandingPage from "../Components/Pages/LandingPage.jsx";
import Homepage from "../Components/Layout/homepage/Homepage";
import MyAppbar from "../Components/Layout/appbar/MyAppbar";
import PostJOB from "../Components/Pages/PostJOB";
// import {AnimatePresence} from "framer-motion";
import {AnimatePresence, motion} from 'framer-motion/dist/framer-motion';

function Routes(props) {
  return (
    <div>
      <AnimatePresence exitBeforeEnter> 
      <Switch>
        <PrivateRoute exact path="/viewjobs" Component={Home} />
        <PrivateRoute exact path="/postjob" Component={PostJOB}/>
        <PrivateRoute exact path="/companies" Component={CompanyReviews} />
        <PrivateRoute exact path="/savedJobs" Component={SavedJobs} />
        <PrivateRoute exact path="/appliedJobs" Component={AppliedJobs} />
        <PrivateRoute path="/jobs" Component={DisplayJobs} />
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <MyAppbar/>
          <Homepage />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <PrivateRoute exact path="/" Component={Home} />
        <PrivateRoute path="/jobs" Component={DisplayJobs} />
        <PrivateRoute path="/reviews" exact Component={Review} />
      </Switch>
      </AnimatePresence>
    </div>
  );
}

export default Routes;

