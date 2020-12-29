import { makeStyles } from "@material-ui/core"
import RightPanelHeader from "./RightPanelHeader";


const useStyles = makeStyles({
    "right-panel": {
        padding: "8px",
        borderRadius: "16px",
    }
})

const RightPanel = (props) => {
    const classes = useStyles();

    return (
        <div className={classes["right-panel"]}>
            <RightPanelHeader />
            Right Panel
        </div>
        
    )
}


export default RightPanel;