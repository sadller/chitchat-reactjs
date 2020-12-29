import { makeStyles } from "@material-ui/core"
import LeftPanelHeader from "./LeftPanelHeader";


const useStyles = makeStyles({
    "left-panel": {
        padding: "8px",
        borderRadius: "16px",
    }
})

const LeftPanel = (props) => {
    const classes = useStyles();

    return (
        <div className={classes["left-panel"]}>
            <LeftPanelHeader />
            Left Panel
        </div>
        
    )
}


export default LeftPanel;