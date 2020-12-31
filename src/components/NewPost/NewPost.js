import { Backdrop, CircularProgress, Fade, makeStyles, Modal, Typography } from "@material-ui/core";
import NewPostForm from "./NewPostForm";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: 'white',
        width: "600px",
        minWidth: '200px',
        textAlign: 'center',
        padding: '20px'
    },
})

const NewPost = (props) => {

    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({show: false, severity: "info", content: ""})

    const submitPost = async (post_data) => {
        try {
            setLoading(true)
            let formData = new FormData();
            post_data.files.forEach(file => {
                formData.append("images", file);
            })
            formData.append("text", post_data.text);
            const url = `${process.env.REACT_APP_SERVER_HOST}/posts/`;

            const config = {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                // onUploadProgress: progressEvent => {
                //     setUploadProgress(progressEvent.loaded / progressEvent.total * 100);
                // }
            }
            const resp = await axios.post(url, formData, config);
            console.log(resp.data);
            setLoading(false);
            closeModal();
            history.go(0);
        } catch (err) {
            setLoading(false);
            setMessage({
                show: true,
                severity: "error",
                content: (err.response===undefined) ? "Some error occurred" : err.response.data.message
            });
            if (err.response!=undefined && err.response.status === 403) {
                history.push("/login");
            }
        }
    }

    const closeModal = () => {
        props.onClose();
        setMessage({
            show: false,
            severity: "info",
            content: ""
        })
    }

    return (
        <Modal
            open={props.open}
            onClose={closeModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            className={classes.modal}
        >
            <Fade in={props.open}>
                <div className={classes.paper}>
                    <Typography variant="h6">
                        New Post
                    </Typography>

                    { message.show ? <Alert severity={message.severity}> {message.content} </Alert> : null}
                    
                    <NewPostForm closeModal={props.onClose} submitPost={submitPost} loading={loading} />

                    {loading ? <CircularProgress variant="indeterminate" /> : null}
                </div>
            </Fade>

        </Modal>
    )
}

export default NewPost;