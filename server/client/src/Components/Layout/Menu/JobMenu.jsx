import React from 'react';
// import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotInterested from '@mui/icons-material/NotInterested';
import ErrorIcon from '@mui/icons-material/Error';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { fetchSuccess } from '../../../Redux/Search/actions';



const StyledMenu = ((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    {...props}
  />
));



export default function JobMenu({job,handelSave,removeFromSaved}) {

const {jobkey,companyName,location,jobTitle} = job
let jobs = useSelector(state=>state.search.searched)
const {saved_jobs} = useSelector(state=>state.login.loggedUser)
const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeFromList = ({jobkey,location,companyName,jobTitle})=>{
    const newJobs = jobs.filter((job)=>job.jobkey !== jobkey)
    dispatch(fetchSuccess(newJobs))
  }

  return (
    <div style={{position:'absolute',top:"0",right:'0'}}>
        
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
          size="large">
        <MoreVertIcon />
      </IconButton>
     
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        {

        saved_jobs[jobkey] ?
          <MenuItem   onClick={()=>{
              handleClose();
              removeFromSaved({jobkey})
          }}>

            <ListItemIcon style={{display:'flex',justifyContent:'center'}} > 
              <FavoriteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Saved" />
          </MenuItem> 
        
        :

          <MenuItem   onClick={()=>{
            handleClose();
            handelSave({jobkey,location,companyName,jobTitle})
        }}>

          <ListItemIcon style={{display:'flex',justifyContent:'center'}} > 
            <FavoriteBorderIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Save Job" />
        </MenuItem>
        }
{/* 
        <MenuItem onClick={()=>{
                handleClose();
                removeFromList({jobkey,location,companyName,jobTitle})
            }}  >
          <ListItemIcon style={{display:'flex',justifyContent:'center'}}>
            <NotInterested fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Not Interseted" />
        </MenuItem> */}
        {/* <MenuItem style={{backgroundColor: 'white',color:"black"}}>
          <ListItemIcon style={{display:'flex',justifyContent:'center'}}>
            <ErrorIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Is there a problem with the job" />
        </MenuItem> */}
      </StyledMenu>
       
    </div>
  );
}