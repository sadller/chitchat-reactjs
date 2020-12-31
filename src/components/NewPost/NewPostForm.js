import { Button, Divider, makeStyles } from '@material-ui/core';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { useEffect, useState } from 'react';


const useStyles = makeStyles(theme => ({
    root: {
        maxHeight: "500px !important",
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    "editor-window": {
        minWidth: "300px",
        maxWidth: "700px",
        minHeight: "100px",
        maxHeight: "300px !important",
        overflow: "auto"
    },
    "choose-files-btn": {
        cursor: "pointer",
    },
    "upload-img-div": {
        margin: "0px",
        padding: "0px",
    },
    "upload-img": {
        height: "70px",
        width: "70px",
        border: "2px solid #ddd",
        borderRadius: "2px",
    },
    "error-message": {
        color: "red",
        fontSize: "small"
    }
}))

const NewPostForm = (props) => {

    const classes = useStyles();
    const [postText, setPostText] = useState(EditorState.createEmpty());
    let textInput = null;

    useEffect(() => {
        textInput.focus();
    })

    const [files, setFiles] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    const handleChange = (event) => {
        setFiles([...event.target.files]);
    }

    const displayImages = () => {
        const filesUrls = files.map(file => URL.createObjectURL(file));
        setImageUrls(filesUrls);
    }

    const removeInvalidFiles = () => {
        files.forEach(file => {
            if(!file.type.includes("image/")){
                const updatedFiles = files.filter(f => f.name!==file.name);
                setFiles(updatedFiles);
            }
        })
    }

    useEffect(()=>{
        removeInvalidFiles();
        displayImages();
    },[files]);

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setPostText(newState);
            return 'handled';
        }
        return 'not-handled';
    }


    const handleSubmit = () => {
        const post_data = {
            text: postText.getCurrentContent().getPlainText(),
            files: files
        }
        props.submitPost(post_data);
    }  

    return (
        <div className={classes.root}>
            <div>
                <Button variant="text" color="primary" className={classes["choose-files-btn"]}>
                    <input type="file" multiple={true} onChange={handleChange} className={classes["choose-files-btn"]} />
                </Button>
            </div>
            <div className={classes["upload-img-div"]}>
                {
                    imageUrls ? (
                        imageUrls.map((file, index) => {
                            return <img src={file} key={index} alt={file} className={classes["upload-img"]} />
                        })
                    ) : null
                }
            </div>
            <Divider />
            <div className={classes["editor-window"]}>
                <Editor
                    editorState={postText}
                    handleKeyCommand={handleKeyCommand}
                    onChange={setPostText}
                    ref={(input) => { textInput = input; }}
                />
            </div>
            <Button variant="outlined" color="default" onClick={props.closeModal}> Cancel</Button>
            <Button variant="contained" color="primary" onClick={() => handleSubmit()} disabled={props.loading} >Post</Button>
        </div>
    )
}

export default NewPostForm;