import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import Header from "../Shared/Header/Header";
import Popup from "../Shared/Popup/Popup";
import SignupForm from "./SignupForm";

const useStyles = makeStyles({
    signup_page: {
        height: "100%",
        width: "100%",
    }
})




const SignupPage = (props) => {
    const classes = useStyles();

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

    const signup = async(formData) => {
        const url = `${process.env.REACT_APP_SERVER_HOST}/signup`;
        try{
            const resp = await axios.post(url,formData);
            if (resp.status === 201) {
                localStorage.setItem("token", resp.data.token);
                setModal({
                    open: true,
                    header: resp.status,
                    message: resp.data.message
                })
            }
        }catch(err) {
            setModal({
                open: true,
                header: err.name,
                message: err.message
            })
        }
    }

    return (
        <div className={classes.signup_page}>
            <Header options={header_optns} />

            <SignupForm onSignup={signup} />
            <Popup 
                onClose={()=>setModal({open:false, header: '', message: ''})}
                {...modal}
            />
        </div>
    )
}


export default SignupPage;