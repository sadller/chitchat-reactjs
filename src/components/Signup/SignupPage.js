import { CircularProgress, makeStyles } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../Shared/Header/Header";
import Popup from "../Shared/Popup/Popup";
import SignupForm from "./SignupForm";

const useStyles = makeStyles({
    signup_page: {
        height: "100%",
        width: "100%",
    },
    "loading-spinner": {
        width: "100%",
        display: "flex",
        justifyContent: "center"
    }
})




const SignupPage = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const header_optns = {
        title: "ChitChat",
        buttons: [
            {
                key: "button1",
                name: "Login",
                path: "/login"
            }
        ]
    }

    const [modal, setModal] = useState({
        open: false,
        header: '',
        message: ''
    });

    const signup = async (formData) => {
        setLoading(true);
        const url = `${process.env.REACT_APP_SERVER_HOST}/signup`;
        try {
            const resp = await axios.post(url, formData);
            if (resp.status === 201) {
                localStorage.setItem("token", resp.data.token);
                setModal({
                    open: true,
                    header: resp.status,
                    message: resp.data.message
                })
            }
            setLoading(false);
            history.push("/dashboard");
        } catch (err) {
            setLoading(false);
            setModal({
                open: true,
                header: err.name,
                message: (err.response === undefined) ? "Some error occurred" : err.response.data.message
            })
        }
    }


    const loadingSpinner = (loading) ? (<div className={classes["loading-spinner"]}>
        <CircularProgress color="secondary" />
    </div>) : null;


    return (
        <div className={classes.signup_page}>
            <Header options={header_optns} />

            <SignupForm onSignup={signup} loading={loading} />

            {loadingSpinner}

            <Popup
                onClose={() => setModal({ open: false, header: '', message: '' })}
                {...modal}
            />
        </div>
    )
}


export default SignupPage;