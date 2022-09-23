import {  Grid, Typography } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import Input from './Input';


function InputGrid({label,helperText,classes,setValue,value,options,setError}) {
    return (
        <Grid item lg={5} md={5} sm={5} xs={12}>
            <Typography variant='h5'>
                {label}
            </Typography>
            <FormHelperText className={classes.removeMargin}>{helperText}</FormHelperText>
            <Input  setValue={setValue} value={value} classes={classes} options={options} setError={setError} />            
        </Grid>
    );
}

export default InputGrid;