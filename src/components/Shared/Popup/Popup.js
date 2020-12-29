import { Backdrop, Fade, makeStyles, Modal } from "@material-ui/core";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: 'white',
        minWidth: '200px',
        textAlign: 'center',
        padding: '20px'
        
      },
})

const Popup = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(props.open);

    const handleOpen = () => {
        setOpen(props.open);
    }

    const handleClose = () => {
        setOpen(false);
        props.onClose(false);
    };

    useEffect(()=>{
        handleOpen();
    },[props.open]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">{props.header}</h2>
                    <p id="transition-modal-description">{props.message}</p>
                </div>
            </Fade>

        </Modal>
    )
}

export default Popup;