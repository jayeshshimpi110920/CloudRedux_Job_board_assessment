import {  Box, Button, Grid, TextField} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import InputGrid from './InputGrid';
import { getSearchData, setCurrentPage } from '../../../../Redux/Search/actions';
import { loadData, saveData } from '../../../../Utils/localStorage';
import { useHistory } from 'react-router-dom';
import "./jobsearchform.style.css"


function SearchForm(props) {
    
    const dispatch = useDispatch()

    const [job,setJob] = useState('');
    const [location,setLocation] = useState('');
    const jobOptions = ['Java Developer','Javascript Developer','React Developer','Government','Account']
    const locationOptions = ['Bangalore','Mumbai','Delhi','Kolkata','Chennai', 'Jalgaon'];
    const history = useHistory()
    const [error,setError] = useState(false);

    

    const handleSearch=e=>{
        e.preventDefault();

        //if both are null the return error
        if(job === "" && location === ""){
            setError(true);
            return
        }


        //default value of number of page 1;
        dispatch(setCurrentPage(1))
        dispatch(getSearchData(job === ""?"":job,location=== ""?"" : location))
        
        let data = loadData("recent") || []
        let str = job !== "" && location !== "" ? {category:"both" , query: `${job} - ${location}`} : job === "" && location !== "" ? {category:"location", query:`${location}`} : {category:"job",query:`${job}`}

        if(data.length === 1){
            data.reverse()
            if(data.some(item=>item.category===str.category && item.query === str.query)){
                data = data.filter(item=>item.category !== str.category || item.query !== str.query)
                data.push(str)
            }
            else{
                data.shift()
                data.push(str)
            }
            
        }
        else {
            if(data.some(item=>item.category===str.category && item.query===str.query)){
                data = data.filter(item=>item.category !== str.category || item.query !== str.query)
                data.push(str)
            }
            else{
                
                data.push(str)
            }
        }

        saveData("recent",data.reverse())
        history.push(`/jobs?q=${job}&location=${location}&page=1`)

    }

    // const handelSubmit = (e)=>{
    //     e.preventDefault();
    //     history.push(`/jobs/q=${job}&l=${location}`)
    // }


    return (
        (<>
        <div style={{width:"100%" , height:"90px"}}></div>
            { error ? <Box>Query is Empty</Box> : <></> }
            <form  onSubmit={handleSearch} className="searchForm" style={{width:"60%", marginLeft:"auto", marginRight:"auto"}}>
                <Grid container spacing={1}>  
                    <InputGrid setValue={setJob} value={job} label={'What?'} 
                    helperText={'Job, Job Position'} classes="classes"
                    options={job !== "" ?jobOptions:null}
                    setError = {setError}
                    />

                    <InputGrid setError = {setError} setValue={setLocation} value={location} label={'Where'}
                    helperText='City, state, or pin code' classes="classes"
                    options={locationOptions} />

                    <Grid item lg={2} md={2} sm={2} xs={12} className="btn_Container">
                        <Button color={'primary'} variant='contained' type='submit' className="findJob" >
                            Find Jobs
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>)
    );
}

export default SearchForm;