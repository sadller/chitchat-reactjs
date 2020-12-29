import { makeStyles } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import HomePage from "./components/Home/HomePage";
import LoginPage from "./components/Login/LoginPage";
import SignupPage from "./components/Signup/SignupPage";


const useStyles = makeStyles({
    app: {
        height: "100%",
        width: "100%",
        //overflowX: "hidden",
    },
    
})

function App() {
    const classes = useStyles();
    
    return (
        <div className={classes.app}>
            <BrowserRouter>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/signup" component={SignupPage} />
                <Route exact path="/dashboard" component={Dashboard} />
            </BrowserRouter>
        </div>
    );
}

export default App;
