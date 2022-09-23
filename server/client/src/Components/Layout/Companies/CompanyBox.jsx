import React from "react";
import { Grid, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export function CompanyBox({ logo, rating, name, handleClick, id }) {
  return (
    <Grid
      item
      container
      spacing={0}
      md={3}
      sm={6}
      xs={12}
      style={{
        display: "flex",
        border: "1px solid #C8C8C8",
        padding: "15px",
        borderRadius: "5px",
        margin:"5px",
      }}
    >
      <Grid item>
        <img
          src={logo}
          alt={name}
          width="50px"
          style={{ marginLeft: "10px" }}
        />
      </Grid>

      <Grid item container>
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <Typography
            style={{ cursor: "pointer" }}
            onClick={() => handleClick(id)}
            variant="h6"
          >
            {name}
          </Typography>
        </Grid>
        <Grid
          item
          container
          lg={12}
          md={12}
          sm={12}
          xs={12}
          style={{ marginTop: "15px", display: "flex", alignItems: "center" }}
        >
          <Grid item lg={6} md={6} sm={6} xs={6}>
            {rating}
            <StarIcon style={{ color: "#127C71" , paddingTop:"7px"}} />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            Reviews
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
