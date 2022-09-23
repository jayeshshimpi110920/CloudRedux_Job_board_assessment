import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import { Grid, Typography } from '@mui/material'

export function ReviewBox({ rating, job_position, date, title, description }) {
    return (
        <Grid item container spacing={4}>
            <Grid item container spacing={2}>
                <Grid item>
                    <AccountCircleIcon fontSize = "large" />
                </Grid>
                <Grid item>
                    <Typography variant = "body2" style = {{fontWeight: "600"}}>{job_position}</Typography>
                    <Typography variant = "h6">
                        {rating}
                        <StarIcon fontSize="small" style = {{color: "#127C71", paddingLeft:"5px"}} />
                        <Typography variant = "caption" > on {date}</Typography>
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container spacing={3}>
                <Typography variant="h6" style ={{marginLeft:"20px"}}>
                    {title}
                </Typography>
                <Typography variant="subtitle1" style ={{marginLeft:"20px"}}>
                    {description}
                </Typography>
            </Grid>
        </Grid>
    )
}
