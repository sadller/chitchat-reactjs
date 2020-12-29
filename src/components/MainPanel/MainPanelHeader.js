import { makeStyles, Paper } from "@material-ui/core"


const useStyles = makeStyles({
    paper: {
        padding: "6px",
    }
})

const MainPanelHeader = (props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            Main Panel Header
        </Paper>
        
    )
}


export default MainPanelHeader;