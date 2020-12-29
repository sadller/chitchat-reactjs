import { AppBar, Toolbar, Button, Typography, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    title: {
        flexGrow: "1",
    },
    btn: {
        color: "white",
        textTransform: "none",
    }
})

const Header = (props) => {
    const {title,buttons} = props.options;
    const classes = useStyles();
    const history = useHistory();

    return (
        <AppBar position="static">
            <Toolbar >
                <Typography variant="h6" className={classes.title}>
                    {title}
                </Typography>
                {
                    buttons.map(button => {
                        return <Button className={classes.btn} onClick={()=>history.push(button.path)} key={button.key} > {button.name} </Button>
                    })
                }
            </Toolbar>
        </AppBar>
    )
}

export default Header;