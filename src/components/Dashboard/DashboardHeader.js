import { AppBar, Toolbar, Button, Typography, makeStyles } from "@material-ui/core";
import { useState } from "react";
import NewPost from "../NewPost/NewPost";

const useStyles = makeStyles({
    title: {
        flexGrow: "1",
    },
    btn: {
        color: "white",
        textTransform: "none",
    }
})

const DashboardHeader = (props) => {
    const classes = useStyles();
    const [modalOpen, setModalOpen] = useState(false)


    return (
        <>
            <AppBar position="sticky">
                <Toolbar >
                    <Typography variant="h6" className={classes.title}>
                        Dashboard
                </Typography>
                    <Button className={classes.btn} onClick={() => setModalOpen(true)}>  +Post </Button>
                </Toolbar>
            </AppBar>
            <NewPost 
                open={modalOpen}
                onClose={()=>setModalOpen(false)}
            />
        </>
    )
}

export default DashboardHeader;