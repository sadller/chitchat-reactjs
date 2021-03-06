import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, makeStyles, Typography } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Carousel from "react-material-ui-carousel";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { useState } from "react";

const useStyles = makeStyles({
    card: {
        marginTop: "80px",
        padding: "0px",
        borderRadius: "2px",
        border: "2px solid grey",
        backgroundColor: "white",
        boxShadow: "none",
        textAlign: "justify",
    },
    avatar: {
        backgroundColor: "#008080"
    },
    "post-media": {

    },
    "post-image": {
        width: "100%",
        objectFit: "contain",
        minHeight: "200px",
        maxHeight: "400px"
    }
})

const Post = (props) => {
    const classes = useStyles();
    const { post } = props;
    const history = useHistory();
    const [message, setMessage] = useState({show: false, severity: "info", content: ""})

    const convertToDate = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    }

    const deletePost = async() => {
        try {
            const url = `${process.env.REACT_APP_SERVER_HOST}/posts/${post._id}`;
            const headers = {
                "authorization": "Bearer " + localStorage.getItem("token")
            }
            const resp = await axios.delete(url, { headers });
            if (resp.status === 200) {
                console.log(resp.data);
                history.go(0);
            }
        } catch (err) {
            setMessage({
                show: true,
                severity: "error",
                content: (err.response===undefined) ? "Some error occurred" : err.response.data.message
            })
        }
    }

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={<Avatar aria-label="post1" className={classes["avatar"]} >{post.user[0].toUpperCase()}</Avatar>}
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={post.user}
                subheader={convertToDate(post.timestamp)}
            />
            <CardMedia className={classes["post-media"]}>
                <Carousel
                    animation="slide"
                >
                    {
                        post.images.map((image, i) => {
                            return <img src={image.url} key={i} alt={image.url} className={classes["post-image"]} />
                        })
                    }
                </Carousel>
            </CardMedia>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.text}
                </Typography>
                { message.show ? <Alert severity={message.severity}> {message.content} </Alert> : null}
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" disabled>
                    <FavoriteIcon  />
                </IconButton>
                <IconButton aria-label="share" disabled>
                    <ShareIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={()=>deletePost()} >
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Post;