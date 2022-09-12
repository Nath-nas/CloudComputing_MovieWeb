import React, { useEffect } from "react";
import { SignIn } from "./SignIn";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const LogIn = () => {

    const {getSession} = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        getSession().then(res => {
            navigate('/home')
        })
    }, [])
    

    return (
        <div class="loginBox">
            
            <br></br>
            <SignIn />
        </div>
    );
};

export default LogIn;
