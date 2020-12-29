import { Button, Container, FormControl, FormHelperText, Grid, IconButton, InputLabel, makeStyles, MenuItem, Select, TextField } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useEffect, useState } from "react";

const useStyles = makeStyles({
    signup_form: {
        marginTop: "10%",
        maxWidth: "500px",
        width: "90%",
        padding: "6px 24px 24px 24px",
    },
    signup_btn: {
        margin: "48px 0px 0px 0px",
        padding: "12px",
    },
    toggle_pwd_btn: {
        padding: "0px 14px 6px 6px",
    }
})




const SignupForm = (props) => {
    const classes = useStyles();
    const [showPassword,togglePassword] = useState(false);

    const initialFormState = {
        firstName: "",
        lastName: "",
        gender: "",
        dob: new Date(2000,0,1),
        email: "",
        password: ""
    }

    const [formState, setFormState] = useState(initialFormState);

    const initialErrorState = {
        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        email: "",
        password: ""
    }

    const [errorState, setErrorState] = useState(initialErrorState);

    const handleInput = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        })
    }

    const handleDate = (date) => {
        setFormState({
            ...formState,
            dob: date
        })
    }

    const handleSubmit = (event) => {
        props.onSignup(formState);
        event.preventDefault();
    }

    useEffect(()=>{
        validateDate();
    },[formState.dob]);

    const validateDate = () => {
        if(formState.dob instanceof Date && !isNaN(formState.dob)){
            let ageInYear = (new Date()).getFullYear()-formState.dob.getFullYear();
            if(ageInYear<10){
                setErrorState({
                    ...errorState,
                    dob: "Too young to be here"
                })
            }else{
                setErrorState({
                    ...errorState,
                    dob: ""
                })
            }
        }else{
            setErrorState({
                ...errorState,
                dob: "Invalid Date"
            })
        }    
    }

    const validate = (event) => {
        switch(event.target.name){
            case "firstName":
                if(! /^[a-zA-Z]{1,30}$/.test(formState.firstName)){
                    setErrorState({
                        ...errorState,
                        firstName: "Invalid First Name"
                    })
                }else{
                    setErrorState({
                        ...errorState,
                        firstName: ""
                    })
                }
                break;

            case "lastName":
                if(! /^[a-zA-Z]{1,30}$/.test(formState.lastName)){
                    setErrorState({
                        ...errorState,
                        lastName: "Invalid Last Name"
                    })
                }else{
                    setErrorState({
                        ...errorState,
                        lastName: ""
                    })
                }
                break;

            case "gender":
                if(["Male","Female","Not Sure"].indexOf(formState.gender)===-1){
                    setErrorState({
                        ...errorState,
                        gender: "Invalid gender"
                    })
                }else{
                    setErrorState({
                        ...errorState,
                        gender: ""
                    })
                }
                break;

            case "email":
                if(! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(formState.email)){
                    setErrorState({
                        ...errorState,
                        email: "Invalid Email Address"
                    })
                }else{
                    setErrorState({
                        ...errorState,
                        email: ""
                    })
                }
                break;
            
            case "password":
                if(formState.password.length<6){
                    setErrorState({
                        ...errorState,
                        password: "Weak password"
                    })
                }else{
                    setErrorState({
                        ...errorState,
                        password: ""
                    })
                }
                break;
        }
    }

    return (
            <Container className={classes.signup_form}>
                <form onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                name="firstName"
                                label="First Name"
                                margin="normal"
                                fullWidth
                                value={formState.firstName}
                                onChange={handleInput}
                                onBlur={validate}
                                error={errorState.firstName!==""}
                                helperText={errorState.firstName!=="" ? errorState.firstName : null}
                                required
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                name="lastName"
                                label="Last Name"
                                margin="normal"
                                fullWidth
                                value={formState.lastName}
                                onChange={handleInput}
                                onBlur={validate}
                                error={errorState.lastName!==""}
                                helperText={errorState.lastName!=="" ? errorState.lastName : null}
                                required
                            />
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item sm={5} xs={12}>
                            <FormControl margin="normal" fullWidth error={errorState.gender!==""}>
                                <InputLabel>Gender</InputLabel>
                                <Select
                                    name="gender"
                                    value={formState.gender}
                                    onChange={handleInput}
                                    onBlur={validate}
                                    error={errorState.gender!==""}
                                    required
                                >
                                    <MenuItem value={"Male"}>Male</MenuItem>
                                    <MenuItem value={"Female"}>Female</MenuItem>
                                    <MenuItem value={"Not Sure"}>Not Sure</MenuItem>
                                </Select>
                                <FormHelperText>{errorState.gender!=="" ? errorState.gender : null}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item sm={1} xs={false}></Grid>
                        <Grid item sm={6} xs={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    name="dob"
                                    //disableToolbar
                                    //variant="inline"
                                    margin="normal"
                                    format="MM/dd/yyyy"
                                    label="Date Of Birth"
                                    fullWidth
                                    value={formState.dob}
                                    onChange={handleDate}
                                    error={errorState.dob!==""}
                                    helperText={errorState.dob!=="" ? errorState.dob : null}
                                    required
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item sm={12} xs={12}>
                            <TextField
                                name="email"
                                label="Email"
                                margin="normal"
                                fullWidth
                                value={formState.email}
                                onChange={handleInput}
                                onBlur={validate}
                                error={errorState.email!==""}
                                helperText={errorState.email!=="" ? errorState.email : null}
                                required
                            />
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item sm={12} xs={12}>
                            <TextField
                                name="password"
                                type={showPassword? "text":"password"}
                                label="Password"
                                margin="normal"
                                fullWidth
                                value={formState.password}
                                onChange={handleInput}
                                onBlur={validate}
                                error={errorState.password!==""}
                                helperText={errorState.password!=="" ? errorState.password : null}
                                required
                                InputProps={{
                                    endAdornment: (
                                        <IconButton aria-label="settings" onClick={()=>togglePassword(!showPassword)} className={classes.toggle_pwd_btn}>
                                            { showPassword ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                                        </IconButton>
                                    )
                                }}
                            />

                        </Grid>
                    </Grid>


                    <Grid container>
                        <Grid item sm={3} xs={false}></Grid>
                        <Grid item sm={6} xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth className={classes.signup_btn}>Sign up</Button>
                        </Grid>
                        <Grid item sm={3} xs={false}></Grid>
                    </Grid>
                </form>

            </Container>
    )
}


export default SignupForm;