import { Button, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles(theme => ({
    homepage: {
        padding: "16px",
        color: "white",
        '& > *': {
            margin: theme.spacing(1),
          },
    },
    
}))


const HomePage = (props) =>  {
    const history = useHistory();
    const classes = useStyles();

    return (
        <div className={classes.homepage}>
            <h2>Home</h2>
            <Button variant="contained" color="secondary" onClick={()=>history.push("/login")}>
                Login
            </Button>
            <Button variant="contained" color="primary" onClick={()=>history.push("/dashboard")}>
                Dashboard
            </Button>
            <Button variant="contained" color="primary" onClick={()=>history.push("/posts")}>
                Posts
            </Button>
            <Button variant="contained" color="primary" onClick={()=>history.push("/signup")}>
                Sign-up
            </Button>
        </div>
    )
}


export default HomePage;