import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import Post from "../Post/Post";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles({
    posts: {
        margin: "4px 6px 4px 6px",
        padding: "0px",
        borderRadius: "0px",
        height: "98%",
    },
    "loading-spinner": {
        width: "100%",
        display: "flex",
        justifyContent: "center"
    }
})

const Timeline = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [posts, setPosts] = useState([]);
    const [postsPending, setPostsPending] = useState(true);
    // limit, skip for pagination
    const [skip, setSkip] = useState(0);
    const [message, setMessage] = useState({show: false, severity: "info", content: ""})


    const loadTimeline = async () => {
        try {
            const url = `${process.env.REACT_APP_SERVER_HOST}/posts`;
            const headers = {
                "authorization": "Bearer " + localStorage.getItem("token")
            }
            const queryParams = `?limit=5&skip=${skip}`;
            const resp = await axios.get(url + queryParams, { headers });
            if (resp.status === 200) {
                const newPosts = resp.data;
                if(newPosts.length>0){
                    setPosts(posts.concat(newPosts));
                    setSkip(skip + 5);
                    if(newPosts.length<5) setPostsPending(false);
                }else{
                    setPostsPending(false);
                }
            }
        } catch (err) {
            setPostsPending(false);
            setMessage({
                show: true,
                severity: "error",
                content: (err.response===undefined) ? "Some error occurred" : err.response.data.message
            })
            if (err.response!=undefined && err.response.status === 403) {
                history.push("/login");
            }
        }
    }



    useEffect(() => {
        loadTimeline();
    }, []);


    useBottomScrollListener(loadTimeline);


    const loadingSpinner = (postsPending) ? (<div className={classes["loading-spinner"]}>
        <CircularProgress color="secondary" />
    </div>) : null;

    return (
        <div className={classes.posts}>
            
            {posts.map(post => {
                return <Post post={post} key={post._id} />
            })}

            { message.show ? <Alert severity={message.severity}> {message.content} </Alert> : null}

            {loadingSpinner}

        </div>
    )
}


export default Timeline;