import { makeStyles, Paper } from "@material-ui/core"


const useStyles = makeStyles({
    paper: {
        padding: "6px",
    }
})

const RightPanelHeader = (props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            Right Panel Header
        </Paper>
        
    )
}


export default RightPanelHeader;