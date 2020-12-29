import { makeStyles } from "@material-ui/core"
import MainPanelHeader from "./MainPanelHeader";
import Posts from "../Posts/Posts";


const useStyles = makeStyles({
    "main-panel": {
        padding: "8px",
        height: "100%",
        borderRadius: "16px",
    }
})

const MainPanel = (props) => {
    const classes = useStyles();

    return (
        <div className={classes["main-panel"]}>
            <MainPanelHeader />
            <Posts />
        </div>
        
    )
}


export default MainPanel;