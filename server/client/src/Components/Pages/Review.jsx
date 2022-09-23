import StarIcon from "@mui/icons-material/Star";
import { Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getCompanyReviews } from "../../Redux/CompanyReviews/action";
import Footer from "../Layout/footer/Footer";
import { ReviewBox } from "../Layout/Review/ReviewBox";
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken'
import { useHistory} from 'react-router-dom';
import { logout } from "../../Redux/Login/actions.js";

import styles from "./Register.module.css";
const imgCont = {
  padding: "5px",
  borderRadius: "5px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
};


export function Review(props) {


  
const history = useHistory()
//jwt
const [cookies, setCookie, removeCookie]= useCookies(['jayjwt']);

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
    console.log(token);

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
//jwt-end







  const companyDetails = useSelector((state) => state.companies.currentCompany);
  const [reviews, setReviews] = useState([]);
  const query = new URLSearchParams(props.location.search);
  const id = query.get("id");
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.login);

  
  useEffect(() => {
    dispatch(getCompanyReviews(id));

    axios
      .get(`https://job-api-jayesh-deploy.herokuapp.com/reviews?company_id=${id}`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => console.log("Error getting reviews" + err));
  }, []);

  return (
    companyDetails ? (
      <div>
        <Container className={styles.reviewcontainer}>
          <Grid
            container
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            <Grid container item lg={6} md={7} sm={8}>
              <Grid item className="imgCont" style={imgCont}>
                <img
                  src={companyDetails.logo}
                  alt={companyDetails.company}
                  width="100px"
                />
              </Grid>
              <Grid item style={{ paddingTop: "40px", paddingLeft: "20px" }}>
                <Typography variant="h5">{companyDetails.company}</Typography>
                <Typography variant="h5">
                  {companyDetails.ratings}
                  <StarIcon
                    style={{ color: "#127C71", paddingRight: "7px" }}
                  />
                  <Typography variant="caption">
                    {reviews.length} Reviews
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ marginTop: "20px", marginBottom: "20px" }}>
            <Typography variant="h4">
              <b>About the company</b>
            </Typography>
          </Grid>
          <Grid container style={{ justifyContent: "center"}}>
            <Typography
              variant="body2"
              style={{ color: "#767676", textAlign: "left" }}
            >
              {companyDetails.description}
            </Typography>
          </Grid>
          <Grid item style={{ marginTop: "30px", marginBottom: "50px" }}>
            <Typography variant="h4">
              <b>Reviews</b>
            </Typography>
          </Grid>
          <Grid container spacing={10}>
            {reviews.map((item) => {
              return (
                <ReviewBox
                  key={item.id}
                  rating={item.rating}
                  job_position={item.job_position}
                  date={item.date}
                  title={item.title}
                  description={item.description}
                />
              );
            })}
          </Grid>
          <Grid
            container
            spacing={1}
            style={{
              fontSize: "14px",
              backgroundColor: "white",
              padding: "15px 10px",
              margin: "50px -20px 0",
            }}
          ></Grid>
        </Container>
        <Footer></Footer>
      </div>
    ) : (
      <></>
    )
  );
}
