import { makeStyles, Paper } from "@material-ui/core"


const useStyles = makeStyles({
    paper: {
        padding: "6px",
    }
})

const LeftPanelHeader = (props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            Left Panel Header
        </Paper>
        
    )
}


export default LeftPanelHeader;