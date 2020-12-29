import { Backdrop, Fade, LinearProgress, makeStyles, Modal, Typography } from "@material-ui/core";
import NewPostForm from "./NewPostForm";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

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
    const [uploadProgress, setUploadProgress] = useState(0);

    const submitPost = async (post_data) => {
        try {
            let formData = new FormData();
            post_data.files.forEach(file => {
                formData.append("images", file, uuidv4()+"."+/(?:\.([^.]+))?$/.exec(file.name)[1]);
            })
            formData.append("text", post_data.text);
            const url = `${process.env.REACT_APP_SERVER_HOST}/posts/`;
            const headers = {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
            const config = {
                onUploadProgress: progressEvent => {
                    setUploadProgress(progressEvent.loaded / progressEvent.total * 100);
                }
            }
            const resp = await axios.post(url, formData,{headers}, config);
            console.log(resp.data);
            props.onClose();
            history.go(0);
        } catch (err) {
            console.log(err);
            history.push("/login");
        }
    }

    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
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
                    <NewPostForm closeModal={props.onClose} submitPost={submitPost} />
                    
                    { uploadProgress>0 ? <LinearProgress variant="determinate" value={uploadProgress} /> : null}
                </div>
            </Fade>

        </Modal>
    )
}

export default NewPost;