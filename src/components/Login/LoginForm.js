import { Button, Grid, Container, IconButton, makeStyles, TextField } from "@material-ui/core";
import { useState } from "react";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';


const useStyles = makeStyles({
    form: {
        maxWidth: "400px",
        marginTop: "15%",
        padding: "6px 24px 24px 24px",
    },
    text_field: {
        margin: "18px 0px 12px 0px",
    },
    login_button: {
        margin: "32px 0px 24px 0px",
        padding: "12px",
    }
})

const LoginForm = (props) => {
    const classes = useStyles();

    const initialFormState = {
        username: "",
        password: ""
    }

    const initialErrorState = {
        username: "",
        password: ""
    }

    const [formState,setFormState] = useState(initialFormState);
    const [errorState, setErrorState] = useState(initialErrorState);
    const [showPassword,togglePassword] = useState(false);

    const handleInput = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        props.onLogin(formState);
        event.preventDefault();
    }


    const validate = (event) => {
        switch(event.target.name){
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

    return(
        <Container className={classes.form}>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <Grid container>
                    <TextField 
                        label="Username"
                        name="username"
                        value={formState.username}
                        onChange={handleInput}
                        onBlur={validate}
                        error={errorState.username!==""}
                        helperText={errorState.username!=="" ? errorState.username : null}
                        required
                        fullWidth
                        className={classes.text_field}
                    />
                </Grid>
                <Grid container>
                    <TextField 
                        type={showPassword? "text":"password"}
                        label="Password"
                        name="password"
                        value={formState.password}
                        onChange={handleInput}
                        onBlur={validate}
                        error={errorState.password!==""}
                        helperText={errorState.password!=="" ? errorState.password : null}
                        required
                        fullWidth
                        className={classes.text_field}
                        InputProps={{
                            endAdornment: (
                                <IconButton aria-label="settings" onClick={()=>togglePassword(!showPassword)} >
                                    { showPassword ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                                </IconButton>
                            )
                        }}
                    />
                </Grid>
                <Grid container>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.login_button}
                        disabled={props.loading}
                    >
                        Login
                    </Button>
                </Grid>
            </form>
        </Container>
    )

}

export default LoginForm;