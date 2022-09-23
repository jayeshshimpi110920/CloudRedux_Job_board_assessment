// // import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { FormControl, InputAdornment, OutlinedInput, Select, TextareaAutosize, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
// import JobDescription from './../Layout/JobDescription';
import { makePostJobRequest } from '../../Redux/PostJob/action';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken'
import { useEffect } from 'react';
import { logout } from "../../Redux/Login/actions.js";

export default function PostJOB () {
   
const history = useHistory()
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

    const [companyName,setCompanyName] = useState(''); 
    const [jobTitle,setJobTitle] = useState(''); 
    const [location,setLocation] = useState(''); 
    const [companyUrl,setCompanyUrl] = useState(''); 
    const [jobType,setJobType] = useState('Full-Time'); 
    const [occupation,setOccupation] = useState('Software');

    const [education,setEducation] = useState("12th Pass");

    const [startSalary,setStartSalary] = useState(''); 
    const [endSalary,setEndSalary] = useState('') ;
    const [salaryType,setSalaryType] = useState('Per year') ;
    const [jobDescription,setJobDescription] = useState('')
    const [snippet,setSnippet] = useState('')

    // const [snackBarOpen,setSnackBarOpen] = useState(false)

    const dispatch = useDispatch()

    const handelPost = (e)=>{
        e.preventDefault();

        dispatch(makePostJobRequest({
            companyName,
            jobTitle,
            location,
            companyUrl,
            jobType,
            occupation,
            education,
            startSalary,
            endSalary,
            salaryType,
            jobDescription,
            snippet:snippet,
            date:new Date().getTime()
        }))
    }

    //     // setCompanyName(''); 
    //     // setJobTitle(''); 
    //     // setLocation(''); 
    //     // setCompanyUrl(''); 
    //     // setJobType('Full-Time'); 
    //     // setOccupation('Software');

    //     // setEducation("12th Pass");

    //     // setStartSalary(''); 
    //     // setEndSalary('') ;
    //     // setSalaryType('Per year') ;
    //     // setJobDescription('')
    //     // setSnippet('')


        // setSnackBarOpen(true)


  return (
    <>
    <div style={{width:"100%" , height:"80px"}}></div>
    <div style={{fontFamily:"Manrope, sans-serif", fontWeight:"bold", marginBottom:"30px"}}>
            <Typography variant='h6' style={{padding:"20px", fontSize:"20px", textAlign:"center"}}>
                Hire Candidate from here (Job post)
            </Typography>

            <form onSubmit={handelPost} className="root" style={{width:'80%' , marginLeft:'auto',marginRight:'auto', display:"flex", flexDirection:"column",gap:"7px"}}>

                <Grid item lg={12} md={12} sm={12} xs={12} >
                    <label >
                        Company name for this job
                    </label>
                    <OutlinedInput
                    style={{width:'100%' , border:"1px solid grey"}}
                    className="input"
                    defaultValue={companyName}
                    required
                    onChange={(e)=>{setCompanyName(e.target.value)}}
                    />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} >
                    <label >
                        Job Title
                    </label>
                    <OutlinedInput
                    style={{width:'100%',  border:"1px solid grey"}}
                    className="input"
                    defaultValue = {jobTitle}
                    required
                    onChange={(e)=>{setJobTitle(e.target.value)}}
                    />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} >
                    <label >
                        Location
                    </label>
                    <OutlinedInput
                    style={{width:'100%',  border:"1px solid grey"}}
                    className="input"
                    defaultValue={location}
                    required
                    onChange={(e)=>{setLocation(e.target.value)}}
                    />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} >
                    <label >
                        Company website
                    </label>
                    <OutlinedInput
                    style={{width:'100%', border:"1px solid grey"}}
                    className="input"
                    required
                    defaultValue={companyUrl}
                    onChange={(e)=>{setCompanyUrl(e.target.value)}}
                    />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} >
                    <label >
                        Job Summary
                    </label>

                    <TextareaAutosize value={snippet} onChange={(e)=>setSnippet(e.target.value)} aria-label="minimum height" minRows={6} style={{width:"99.5%",fontSize:'20px'}}  placeholder="" />

                </Grid>




            <Grid spacing={2} item container lg={12} md={12} sm={12} xs={12}>
                <Grid item lg={4} md={4} sm={4} xs={4}>
                    <FormControl variant="outlined" className="select_job_type">
                        <label>
                            Job Type
                        </label>
                        <Select style={{ border:"1px solid grey"}} defaultValue={jobType} native={true} onChange={(e)=>setJobType(e.target.value)}>
                            <option value={'Full-Time'}>
                                Full_Time
                            </option>
                            <option value={'Part-Time'}>
                                Part_time
                            </option>
                            <option value={'Contract'}>
                                Contract
                            </option>
                            <option value={'Fresher'}>
                                Fresher
                            </option>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={4}>
                    <FormControl  variant="outlined" className="select_job_type">
                        <label>
                            Occupation
                        </label>
                        <Select
                        style={{ border:"1px solid grey"}}
                        native={true}
                        defaultValue={occupation}
                        onChange={e => setOccupation (e.target.value)}

                        >

                        <option value={'Software'}>Software</option>
                        <option value={'Software'}>NON-IT</option>
                        <option value={'Government'}>Government</option>
                        <option value={'Account'}>Account</option>
                        <option value={'Software'}>Other</option>
                        <option value={'Executive and personal assitansts'}>Executive and personal assitansts</option>

                        </Select>
                    </FormControl>

                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={4}>
                    <FormControl variant="outlined" className="select_job_type">
                        <label style={{fontSize:"10px", marginTop:"4px"}}>
                            Education Level
                        </label>
                        <Select
                        style={{ border:"1px solid grey"}}
                        defaultValue={education}
                        native={true}
                        onChange={(e)=>{setEducation(e.target.value)}}
                        >
                            <option value={'12th pass'}>12th pass</option>
                            <option value={'Diploma'}>Diploma</option>
                            <option value={"Bachelor's degree"}>Bachelor's degree</option>
                            <option value={"Master's degree"}>Master's degree</option>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid item container spacing={1} lg={12} md={12} sm={12} xs={12}>
                <Grid item container lg={12} md={12} sm={12} xs={12}>
                    <label>Salary</label>
                </Grid>

                <Grid item lg={4} md={4} sm={4} xs={4}>
                    <OutlinedInput
                    startAdornment={<InputAdornment position="start"> Rs </InputAdornment>}
                    style={{width:'100%',  border:"1px solid grey"}}
                    className="input"
                    value={startSalary}
                    required
                    onChange={(e)=>setStartSalary(e.target.value)}
                    /> 
                </Grid>
                <Grid item lg={1} md={1} sm={1} xs={1}>
                    <Typography variant='h5'>
                        to
                    </Typography>
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={3}>
                    <OutlinedInput
                    style={{width:'100%',  border:"1px solid grey"}}
                    className="input"
                    value={endSalary}
                    onChange={(e)=>setEndSalary(e.target.value)}
                    required
                    />
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={4}>
                    <FormControl variant="outlined" className="select_job_type">
                        <Select
                            defaultValue={salaryType}
                            native={true}
                            onChange={(e)=>setSalaryType(e.target.value)}
                        >   

                        <option value={'Per Hour'}>Per Hour</option>
                        <option value={'Per Day'}>Per month</option>
                        <option value={'Per Month'}>Per day</option>
                        <option value={'Per year'}>Per year</option>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <label>
                Description
            </label>
            <ReactQuill theme="snow"  defaultValue={jobDescription} onChange={setJobDescription}>
            </ReactQuill>
            <Button variant="contained" color='primary' type='submit'>
                Submit
            </Button>
            </form>
    </div>
    </>
    
  )
}

// export default PostJOB;