import {  makeStyles } from "@material-ui/core";
import DashboardHeader from "./DashboardHeader";
import { BrowserRouter, Route } from "react-router-dom";
import Timeline from "../Timeline/Timeline";


const useStyles = makeStyles({
    "dashboard-content": {
        width: "90%",
        maxWidth: '800px',
        margin: "auto",
    }
})


const Dashboard = (props) =>  {
    const classes = useStyles();

    return (
        <div>
            <DashboardHeader />
            <div className={classes["dashboard-content"]}>
                <BrowserRouter>
                    <Route exact path="/dashboard/" component={Timeline} />
                    <Route exact path="/dashboard/timeline" component={Timeline} />
                </BrowserRouter>
            </div>
        </div>
    )
}


export default Dashboard;