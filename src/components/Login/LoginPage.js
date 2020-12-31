import { CircularProgress, makeStyles, Paper } from "@material-ui/core";
import Header from "../Shared/Header/Header";
import LoginForm from "./LoginForm";
import axios from "axios";
import { useState } from "react";
import Popup from "../Shared/Popup/Popup";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    login_page: {
        height: "100%",
        width: "100%",
    },
    "loading-spinner": {
        width: "100%",
        display: "flex",
        justifyContent: "center"
    }
})


const LoginPage = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    
    const header_optns = {
        title: "ChitChat",
        buttons: [
            {
                key: "button1",
                name: "Sign-up",
                path: "/signup"
            }
        ]
    }

    const [modal, setModal] = useState({
        open: false,
        header: '',
        message: ''
    });

    const login = async (formData) => {
        setLoading(true);
        const url = `${process.env.REACT_APP_SERVER_HOST}/login`;
        try {
            const resp = await axios.post(url, formData);
            if (resp.status === 200) {
                localStorage.setItem("token", resp.data.token);
                setModal({
                    open: true,
                    header: resp.status,
                    message: resp.data.message
                })
                setLoading(false);
                history.push("/dashboard");
            }
        } catch (err) {
            setLoading(false);
            setModal({
                open: true,
                header: "Error",
                message: (err.response===undefined)? "Some error occurred" : err.response.data.message
            })
        }
    }

    const loadingSpinner = (loading) ? (<div className={classes["loading-spinner"]}>
        <CircularProgress color="secondary" />
    </div>) : null;
    

    return (
        <div className={classes.login_page}>
            <Header options={header_optns} />

            <LoginForm onLogin={login} loading={loading} />

            {loadingSpinner}

            <Popup 
                onClose={()=>setModal({open:false, header: '', message: ''})}
                {...modal}
            />
        </div>
    )
}


export default LoginPage;